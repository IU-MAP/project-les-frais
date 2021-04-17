from django.contrib import admin
from .models import Category, Currency, Transactions
# Register your models here.

admin.register(Category)
admin.register(Currency)
admin.register(Transactions)
