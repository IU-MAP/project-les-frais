import django_filters.rest_framework as filters
from .models import Transaction, Category, Currency 
from .constants import DEFAULT_CURRENCY

class CategoryFilter(filters.FilterSet):
    class Meta:
        model = Category
        fields = ('id', 'created_at', 'slug', 'name', 'color')
        fields = {
            'created_at': ['lt', 'gt', 'exact'],
            'name':['exact', 'contains'],
        }


class TransactionFilter(filters.FilterSet):
    class Meta:
        model = Transaction
        fields = {
            'created_at': ['lt', 'gt', 'exact'],
            'type': ['exact'],
            'date' : ['lt', 'gt', 'exact'],
            'title': ['exact', 'contains'],
            'description': ['exact', 'contains'],
            'price' : ['lt', 'gt', 'exact'],
            'isTemplate': ['exact'],
            'currency': ['exact'],
            'category': ['exact'],
        }



