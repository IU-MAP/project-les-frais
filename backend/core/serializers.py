from django.db.models import fields
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Transaction, Currency, Category
from rest_framework_bulk import (
    BulkListSerializer,
    BulkSerializerMixin)

class MyChoiseField(serializers.Field):
    """
    Custom Choise field, provides representation instead of id
    """

    def __init__(self, enum_, **kwargs):
        self.enum_ = enum_
        super().__init__(**kwargs)

    def to_representation(self, value):
        return self.enum_(value).name

    def to_internal_value(self, data):
        try:
            return self.enum_[str(data).lower()]
        except KeyError:
            raise serializers.ValidationError(
                f'Unknown status: {data}, must be one of {self.enum_.names}')

class CategorySerializer(serializers.ModelSerializer):
    """
    Model serializer for Category
    
    Fields:
    ``id``
    ``created_at``
    ``slug``
    ``name``
    ``color``

    """
    class Meta:
        model = Category
        fields = ('id', 'created_at', 'name', 'color')

class CurrencySerializer(serializers.ModelSerializer):
    """
    Model serializer for Currency
    
    Fields:
    ``id`` 
    ``created_at`` 
    ``slug``
    ``name`` 
    ``color``
    """

    
    class Meta:
        model = Currency
        fields = ('id', 'created_at', 'slug', 'name', 'label')

class TransactionSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    """
    Model serializer for Transactions
    
    Fields:
    ``id``
    ``created_at`` 
    ``type`` 
    ``date`` 
    ``title``
    ``description``
    ``price`` 
    ``isTemplate`` 
    ``currency`` -- nested
    ``category`` -- nested
    """


    currency = CurrencySerializer()
    category = CategorySerializer()
    
    type = MyChoiseField(enum_ = Transaction.Type)
    def save():
        raise ValidationError("you are using read-only serializer, please contact Andrey")

    class Meta:
        model = Transaction
        fields = ('id', 'created_at', 'type', 'date', 'title', 'description', 'price', 'isTemplate', 'currency', 'category')
        list_serializer_class = BulkListSerializer

class ShortTransactionSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    """
    Model serializer for Transactions
    
    Fields:
    ``id``
    ``created_at`` 
    ``type`` 
    ``date`` 
    ``title``
    ``description``
    ``price`` 
    ``isTemplate`` 
    ``currency`` -- pk
    ``category`` -- pk
    """

    
    type = MyChoiseField(enum_ = Transaction.Type)

    def save(self, **kwargs):
        """
        Check that start is before finish.
        """

        if ('categoty' in self.validated_data and
                self.validated_data['category'].owner.id != kwargs['owner'].id):
            raise serializers.ValidationError("You are not the owner of the category!")
        return super().save(**kwargs)

    def validate(self, attrs):
        if (not attrs['isTemplate']):
            required = {'date', 'description', 'price', 'currency', 'category'}
            message = 'this field is required if isTemplate is false'
            error = {f: message  for f in required if attrs[f] is None}
            if (error):
                raise ValidationError(error)
        return super().validate(attrs)
    
    class Meta:
        model = Transaction
        fields = ('id', 'created_at', 'type', 'date', 'title', 'description', 'price', 'isTemplate', 'currency', 'category')
        list_serializer_class = BulkListSerializer