from django.utils.decorators import method_decorator
from backend.core.models import Transaction
from django.shortcuts import render
from django.views.decorators.cache import cache_page
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend

from .models import Currency, Transaction, Category
from .serializers import TransactionSerializer, CurrencySerializer, CategorySerializer, ShortTransactionSerializer
from .permissions import IsTheOwnerOf
from .service import TransactionFilter, CategoryFilter

# Create your views here.

class TransactionViewSet(viewsets.ModelViewSet):
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
    
    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TransactionSerializer
        else:
            return ShortTransactionSerializer

    def perform_create(self, serializer):
        #if (object)
        serializer.save(owner=self.request.user)
    

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
