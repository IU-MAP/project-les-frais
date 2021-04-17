from django.utils.decorators import method_decorator
from backend.core.models import Transaction
from django.shortcuts import render
from django.views.decorators.cache import cache_page
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView

from .models import Currency, Transaction, Category
from .serializers import TransactionSerializer, CurrencySerializer, CategorySerializer
from .permissions import IsTheOwnerOf
# Create your views here.

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects
    serializer_class = TransactionSerializer    
    permission_classes = [IsAuthenticated, IsTheOwnerOf]
    
    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        #if (object)
        serializer.save(owner=self.request.user)
    

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated, IsTheOwnerOf]
    
    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CurrencyView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CurrencySerializer
    queryset = Currency.objects

    @method_decorator(cache_page(60*60*2))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
