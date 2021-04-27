from django.conf.urls import url
from django.urls import include, path
from rest_framework import routers

from . import views

transactions = routers.SimpleRouter()
transactions.register('', views.TransactionViewSet)

categories = routers.SimpleRouter()
categories.register('', views.CategoryViewSet)

urlpatterns = [
    path('transactions/', include(transactions.urls)),
    path('categories/', include(categories.urls)),
    path('currencies/', views.CurrencyView.as_view()),
    url(r'^parce_excel/(?P<filename>[^/]+)$',  views.ParceExcelView.as_view()),
]