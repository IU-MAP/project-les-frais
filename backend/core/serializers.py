from functools import partial
from os import name
from re import M
from django.db.models import fields
from openpyxl.workbook import child
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from xlrd import sheet
from django.core.exceptions import MultipleObjectsReturned, ObjectDoesNotExist

from .models import Transaction, Currency, Category
from rest_framework_bulk import (
    BulkListSerializer,
    BulkSerializerMixin)

import logging


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

class CategoryStatisticsSerializer(serializers.ModelSerializer):
    """
    Model serializer for Category

    Fields:
    ``id``
    ``created_at``
    ``slug``
    ``name``
    ``color``
    ``transactions_sum``
    """

    transactions_sum = serializers.IntegerField()
    
    class Meta:
        model = Category
        fields = ('id', 'created_at', 'name', 'color', 'transactions_sum')

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

    type = MyChoiseField(enum_=Transaction.Type)

    def save():
        raise ValidationError(
            "you are using read-only serializer")

    class Meta:
        model = Transaction
        fields = ('id', 'created_at', 'type', 'date', 'title',
                  'description', 'price', 'isTemplate', 'currency', 'category')
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

    type = MyChoiseField(enum_=Transaction.Type)

    def save(self, **kwargs):
        """
        Check that start is before finish.
        """
        # Would be good to move to models or signals
        if ('categoty' in self.validated_data and
                self.validated_data['category'].owner.id != kwargs['owner'].id):
            raise serializers.ValidationError(
                "You are not the owner of the category!")
        return super().save(**kwargs)

    def validate(self, attrs):
        # There is attributes that are requered only if isTemplate==False
        if (not self.partial and not attrs['isTemplate']):
            required = {'date', 'description', 'price', 'currency', 'category'}
            message = 'this field is required if isTemplate is false'
            error = {f: message for f in required if attrs[f] is None}
            if (error):
                raise ValidationError(error)
        return super().validate(attrs)

    class Meta:
        model = Transaction
        fields = ('id', 'created_at', 'type', 'date', 'title',
                  'description', 'price', 'isTemplate', 'currency', 'category')
        list_serializer_class = BulkListSerializer


class ExcelParcerSerializer(serializers.Serializer):
    """
        Used inly to generate swagger schema
    """
    class Sheet_Object(serializers.Serializer):
        data = serializers.ListField(
            child=serializers.ListField(
                child=serializers.CharField(allow_null=True, required=False),
                required=False,
                min_length = 0
            ),
             min_length = 0
        )

        headers = serializers.ListField(
            child=serializers.CharField(allow_null=True, required=False),
            min_length = 0
        )

        merged_cells = serializers.ListField(
            child=serializers.ListField(
                child=serializers.CharField(allow_null=True, required=False),
                required=False,
                min_length = 0
            ),
             min_length = 0
        )


    sheets = serializers.DictField(
        help_text='sheet name: sheet object',
        label='sheets',
        child=Sheet_Object(label = 'sheet object')
    )


class CategoryNestedSerializer(serializers.ModelSerializer):
    """
    Model serializer for Category

    Fields:
    ``id``
    ``created_at``
    ``slug``
    ``name``
    ``color``

    """
    id = serializers.IntegerField(required = False)
    name = serializers.CharField(required = False)
    color = serializers.IntegerField(required = False)

    class Meta:
        model = Category
        fields = ('id', 'created_at', 'name', 'color')

class TransactionSerializer2(BulkSerializerMixin, serializers.ModelSerializer):
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

    category = CategoryNestedSerializer()

    type = MyChoiseField(enum_=Transaction.Type)

    def get_category(self, validated_data,  **kwargs):
        if ('id' in validated_data['category']):
            try:
                # Do not create object if user specified id
                # will throw an error more or less than 1 category found
                cat = Category.objects.get(owner = kwargs['owner'], **validated_data['category'])
            except MultipleObjectsReturned:
                raise ValidationError({'category': 'multiple categories exist with this fields'})
            except ObjectDoesNotExist:
                raise ValidationError({'category': 'no categories exist with this fields'})
        else:
            try:
                # Get or create a category
                # will throw an error more or less than 1 category found
                cat, created = Category.objects.get_or_create(owner = kwargs['owner'], **validated_data['category'])
            except MultipleObjectsReturned:
                raise ValidationError({'category': 'multiple categories exist with this fields'})
        return cat

    def save(self,  **kwargs):
        super().save(category = self.get_category(self.validated_data, **kwargs), **kwargs)
    

    class Meta:
        model = Transaction
        fields = ('id', 'created_at', 'type', 'date', 'title',
                  'description', 'price', 'isTemplate', 'currency', 'category')
        list_serializer_class = BulkListSerializer