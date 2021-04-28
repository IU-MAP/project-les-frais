from backend.core.models import Transaction
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, status, viewsets
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Category, Currency, Transaction
from .permissions import IsTheOwnerOf
from .serializers import (CategorySerializer, CurrencySerializer,
                          ShortTransactionSerializer, TransactionSerializer)
from .service import CategoryFilter, TransactionFilter
from rest_framework_bulk import ListBulkCreateUpdateDestroyAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework_bulk import mixins as bulk_mixins
from rest_framework.decorators import action
from rest_framework import exceptions
# Create your views here.
'''
class TransactionViewSet(bulk_mixins.BulkCreateModelMixin,
                        bulk_mixins.BulkUpdateModelMixin,
                        bulk_mixins.BulkDestroyModelMixin,
                        viewsets.ModelViewSet):
    """
    View set for ``Transaction``

    Function:
        ``list`` 
        ``retrive``
        ``update`` 
        ``partial_update``
        ``create`` 
        ``destoy``
    """

    queryset = Transaction.objects

    filter_backends = [DjangoFilterBackend] 
    filterset_class = TransactionFilter

    permission_classes = [IsAuthenticated, IsTheOwnerOf]

    @action(detail = False,  methods = ['delete'], name='')
    def bulk_destroy(self, request, *args, **kwargs):
        return super().bulk_destroy(request, *args, **kwargs)
    
    @action(detail = False,  methods = ['put'])
    def bulk_update(self, request, *args, **kwargs):
        return super().bulk_update(request, *args, **kwargs)    

    @action(detail = False,  methods = ['patch'])
    def partial_bulk_update(self, request, *args, **kwargs):
        return super().partial_bulk_update(request, *args, **kwargs)

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TransactionSerializer
        else:
            return ShortTransactionSerializer

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner = self.request.user)
'''

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


from rest_framework import views
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.response import Response

from .service import parce_excel


class ParceExcelView(views.APIView):
    """
        Accepts xls or xlsx file in a body in binary format
        return json representation
    """

    parser_classes = [FileUploadParser]

    def put(self, request, filename, format=None):
        file_obj = request.data['file']
        try:
            parced = parce_excel(file = file_obj, filename=filename)
            return Response(status=200, data=parced)
        except Exception as e:
            return Response(status=500, data={'detail': str(e)})
