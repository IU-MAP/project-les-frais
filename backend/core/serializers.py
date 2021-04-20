from django.db.models import fields
from rest_framework import serializers

from .models import Transaction, Currency, Category


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

class TransactionSerializer(serializers.ModelSerializer):
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


    currency = CurrencySerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    
    type = MyChoiseField(enum_ = Transaction.Type)

    def save(self, **kwargs):
        """
        Check that start is before finish.
        """

        if self.validated_data['category'].owner.id != kwargs['owner'].id:
            raise serializers.ValidationError("You are not the owner of the category!")
        return super().save(**kwargs)

    class Meta:
        model = Transaction
        fields = ('id', 'created_at', 'type', 'date', 'title', 'description', 'price', 'isTemplate', 'currency', 'category')





class ShortTransactionSerializer(serializers.ModelSerializer):
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

        if self.validated_data['category'].owner.id != kwargs['owner'].id:
            raise serializers.ValidationError("You are not the owner of the category!")
        return super().save(**kwargs)

    class Meta:
        model = Transaction
        fields = ('id', 'created_at', 'type', 'date', 'title', 'description', 'price', 'isTemplate', 'currency', 'category')