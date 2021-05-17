from random import randint

from django.contrib.auth.models import User
from django.db import models

from .constants import CATEGORY_COLORS_RANGE


class Currency(models.Model):
    """
    Currency model

    FK: None

    BackReference: ``Transaction``, ``Profile``
    """
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    slug = models.CharField(max_length=10)
    name = models.CharField(max_length=30)
    label = models.CharField(max_length=5)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = 'Currency'
        verbose_name_plural = 'Currencies'


class Category(models.Model):
    """
    Currency model

    FK: ``User``

    BackReference: ``Transaction``
    """
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=30)
    # stored in format #rrggbb
    color = models.SmallIntegerField(blank=True)
#    isShown = models.BooleanField()

    # we delete all transactions when user is deleted
    owner = models.ForeignKey(
        User, verbose_name='Owner',  related_name= "categories", on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if (self.color is None):
            self.color = randint(*CATEGORY_COLORS_RANGE)
        return super().save(*args, **kwargs)

    def filter_queryset(self, query):
        return query

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        unique_together = [['owner', 'name']]

class Transaction(models.Model):
    """
    Currency model

    FK: ``User``, ``currency``, ``categoty``

    BackReference:
    """

    created_at = models.DateTimeField(auto_now_add=True)

    class Type(models.TextChoices):
        gain = 'gn'
        loss = 'ls'

    type = models.CharField(max_length=2, choices=Type.choices)
    date = models.DateField(null=True, blank=True)
    # title is less than 30
    title = models.CharField(max_length=30)
    description = models.TextField(blank=True, null=True)
    # price is less than 10^7
    price = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)
    isTemplate = models.BooleanField()

    owner = models.ForeignKey(
        User, verbose_name='Owner', related_name= "transactions", on_delete=models.CASCADE)
    currency = models.ForeignKey(
        Currency, verbose_name='Currency', related_name= "transactions",  on_delete=models.CASCADE, null=True, blank=True)
    category = models.ForeignKey(
        Category, verbose_name='Category', related_name= "transactions",  on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Transaction'
        verbose_name_plural = 'Transactions'
        ordering = ['-date', 'id']
