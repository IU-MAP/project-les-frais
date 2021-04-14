from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from rest_framework import serializers

from rest_framework.authentication import TokenAuthentication, SessionAuthentication
# Create your views here.




'''
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAuthenticated
class IsTheUserOfUser(BasePermission):
    """
        Allow access to workout only to a owner of this workout
    """

    def has_object_permission(self, request, view, user):
        return bool(request.user.id == user.id)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsTheUserOfUser]
'''

