from django.urls import include, path
from rest_framework import routers

from .views import DeleteAccount

urlpatterns = [
    path('rest-auth/delete-user/', DeleteAccount.as_view()),
]