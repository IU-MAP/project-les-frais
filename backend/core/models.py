from django.contrib.auth.models import User
from django.db import models


class Currency(models.Model):
    created_at = models.DateTimeField(auto_now_add = True)
    slug = models.CharField(max_length = 10)
    name = models.CharField(max_length = 30)
    label = models.CharField(max_length = 5)
    
    class Meta:
        verbose_name = 'Currency'
        verbose_name_plural = 'Currencies'


class Transactions(models.Model):
    created_at = models.DateTimeField(auto_now_add = True)
    
    class Type(models.TextChoices):
        GAIN = 'Gn'
        LOSS = 'Ls'
    
    type = models.CharField(max_length = 2, choices = Type.choices)
    date = models.DateField()
    # title is less than 30
    title = models.CharField(max_length = 30)
    description = models.TextField()
    # price is less than 10^7
    price = models.DecimalField(max_digits = 9, decimal_places=2)
    isTemplate = models.BooleanField()

    owner = models.ForeignKey(User, verbose_name = 'Owner', on_delete=models.CASCADE)
    currency = models.ForeignKey(Currency, verbose_name = 'Currency',  on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Transaction'
        verbose_name_plural = 'Transactions'
    
class Category(models.Model):
    created_at = models.DateTimeField(auto_now_add = True)
    slug = models.CharField(max_length = 10)
    name = models.CharField(max_length = 30)
    # stored in format #rrggbb
    color = models.CharField(max_length = 7)
    isShown = models.BooleanField()

    # we delete all transaction when user is deleted
    owner = models.ForeignKey(User, verbose_name = 'Owner', on_delete=models.CASCADE)
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


