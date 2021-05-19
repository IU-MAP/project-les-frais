from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.authentication import (SessionAuthentication,
                                           TokenAuthentication)
from rest_framework.generics import DestroyAPIView
from rest_framework.viewsets import ModelViewSet

# Create your views here.


class DeleteAccount(DestroyAPIView):

    def get_object(self):
        return User.objects.get(id = self.request.user.id)
