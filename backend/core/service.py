import django_filters.rest_framework as filters
from .models import Transaction, Category  

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


def get_default_categories():
    return [{'name': {'rus': 'Еда', 'eng': 'Food'}},
            {'name': {'rus': 'Одежда', 'eng': 'Cloths'}},
            {'name': {'rus': 'Подписки', 'eng': 'Subscriptions'}},
            {'name': {'rus': 'Услуги', 'eng': 'Services'}},
            {'name': {'rus': 'Здоровье', 'eng': 'Health'}},
            {'name': {'rus': 'Путешествия', 'eng': 'Travels'}},
            {'name': {'rus': 'Развлечения', 'eng': 'Entertainment'}},
            {'name': {'rus': 'Прочее', 'eng': 'Miscellaneous'}}]


def get_default_currency():
    return [
    {"slug": "rur", "name": "ruble", "label": "₽"},
    {"slug": "usd", "name": "dollar", "label": "$"},
] 