import re

from backend.core.models import Transaction
from django.db.models import F, Q, Sum
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from rest_framework import exceptions, mixins, status, views, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_bulk import ListBulkCreateUpdateDestroyAPIView, ListBulkCreateDestroyAPIView
from rest_framework_bulk import mixins as bulk_mixins

from .models import Category, Currency, Transaction
from .permissions import IsTheOwnerOf
from .serializers import (CategorySerializer, CategoryStatisticsSerializer,
                          CurrencySerializer, ShortTransactionSerializer,
                          TransactionSerializer, TransactionSerializer2)
from .service import CategoryFilter, TransactionFilter, parce_excel
from .swagger_schemas import (EXCEL_PARCER_PARAMETERS, EXCEL_PARCER_SCHEMA,
                              generate_swagger_parameters)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    View set for ``Category``

    Function:
        ``list`` 
        ``retrive``
        ``update`` 
        ``partial_update``
        ``create`` 
        ``destoy``
    """

    queryset = Category.objects
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend]
    permission_classes = [IsAuthenticated, IsTheOwnerOf]

    filter_backends = [DjangoFilterBackend]
    filterset_class = CategoryFilter

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


CategoryStatisticView__filter_againts = [
    'date', 'date__lt', 'date__gt', 'type', 'price__gt', 'currency', 'title', 'title__contains']


class CategoryStatisticView(ListAPIView):
    """
    Function:
        ``list``
    """

    permission_classes = [IsAuthenticated]
    serializer_class = CategoryStatisticsSerializer
    queryset = Category.objects

    def get_queryset(self):
        filter_param = {}
        filter_againts = CategoryStatisticView__filter_againts
        unknown = set(self.request.query_params) - set(filter_againts)
        if (unknown):
            raise ValidationError(
                f"unknown query parameter(s):{self.request.query_params}, expected one of {filter_againts}")

        filter_param = {"transactions__" + k: v for k,
                        v in self.request.query_params.items()}
        filter_param['transactions__isTemplate'] = False
        return self.queryset.filter(owner=self.request.user).annotate(transactions_sum=Sum('transactions__price', filter=Q(**filter_param)))

    @swagger_auto_schema(manual_parameters=generate_swagger_parameters(CategoryStatisticView__filter_againts))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class CurrencyView(ListAPIView):
    """
    View for list of ``Currencies``

    Function:
        ``list`` -- cached for 2 hours
    """

    permission_classes = [IsAuthenticated]
    serializer_class = CurrencySerializer
    queryset = Currency.objects

    @method_decorator(cache_page(60*60*2))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class TransactionView(
        ListBulkCreateUpdateDestroyAPIView):
    """
    Global View for ``Transaction``

    functions:

    ``get`` -- returns list
    ``post`` -- accepts both single object or a list
    ``put``, ``patch`` -- accept list
    ``delete`` -- will delete all object matching filters (may delete all objects if no filters)
    """
    queryset = Transaction.objects

    filter_backends = [DjangoFilterBackend]
    filterset_class = TransactionFilter

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TransactionSerializer
        else:
            return ShortTransactionSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    @swagger_auto_schema(request_body=ShortTransactionSerializer(many=True))
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    @swagger_auto_schema(request_body=ShortTransactionSerializer(many=True))
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(request_body=ShortTransactionSerializer(many=True))
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class TransactionObjectView(RetrieveUpdateDestroyAPIView):
    """
    Object View for ``Transaction``

    functions:

    ``get``
    ``post``
    ``put``,
    ``patch`` 
    ``delete``
    """
    queryset = Transaction.objects

    filter_backends = [DjangoFilterBackend]
    filterset_class = TransactionFilter

    permission_classes = [IsAuthenticated, IsTheOwnerOf]

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TransactionSerializer
        else:
            return ShortTransactionSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    def permission_denied(self, request, message, code):
        try:
            return super().permission_denied(request, message=message, code=code)
        except exceptions.PermissionDenied as e:
            raise exceptions.NotFound


class ParceExcelView(views.APIView):
    """
        Accepts xls or xlsx file in a body in binary format
        return json representation

        - "data" is double list of string representation of excel table
        - All formulas are caclulated
        - Merged cells content moved to top left cell, others are set to null
        - "merged_cells" is a list of cells coordinates (c1, r1, c2, r2); columns and rows enumerated form 0
    """

    parser_classes = [FileUploadParser]

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses=EXCEL_PARCER_SCHEMA, manual_parameters=EXCEL_PARCER_PARAMETERS)
    def put(self, request, filename,  format=None):
        fill = self.request.query_params.get('fill', 'null')
        file_obj = request.data['file']
        try:
            parced = parce_excel(file=file_obj, filename=filename, fill=fill)
            return Response(status=200, data=parced)
        except Exception as e:
            # TODO: check if this is legal to send str(e)
            return Response(status=500, data={'detail': str(e)})

class TransactionView2(
        ListBulkCreateDestroyAPIView):
    """
    Global View for ``Transaction``

    functions:

    ``get`` -- returns list
    ``post`` -- accepts both single object or a list
    ``delete`` -- will delete all object matching filters (may delete all objects if no filters)
    """
    queryset = Transaction.objects

    filter_backends = [DjangoFilterBackend]
    filterset_class = TransactionFilter

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def get_serializer_class(self):
        return TransactionSerializer2

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @swagger_auto_schema(request_body=TransactionSerializer2(many=True))
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)