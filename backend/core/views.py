import re
from backend.core.models import Transaction
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from rest_framework import exceptions, mixins, status, views, viewsets
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_bulk import ListBulkCreateUpdateDestroyAPIView
from rest_framework_bulk import mixins as bulk_mixins

from .models import Category, Currency, Transaction
from .permissions import IsTheOwnerOf
from .serializers import (CategorySerializer, CurrencySerializer,
                          ExcelParcerSerializer, ShortTransactionSerializer,
                          TransactionSerializer)
from .service import CategoryFilter, TransactionFilter, parce_excel
from .constants import EXCEL_PARCER_SCHEMA

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

    @swagger_auto_schema(responses=EXCEL_PARCER_SCHEMA)
    def put(self, request, filename, format=None):
        file_obj = request.data['file']
        try:
            parced = parce_excel(file=file_obj, filename=filename)
            return Response(status=200, data=parced)
        except Exception as e:
            # TODO: check if this is legal to send str(e)
            return Response(status=500, data={'detail': str(e)})
