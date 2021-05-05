from io import BytesIO
import xlrd
import openpyxl
import django_filters.rest_framework as filters

from .constants import DEFAULT_CURRENCY
from .models import Category, Currency, Transaction


class CategoryFilter(filters.FilterSet):
    class Meta:
        model = Category
        fields = ('id', 'created_at', 'slug', 'name', 'color')
        fields = {
            'created_at': ['lt', 'gt', 'exact'],
            'name': ['exact', 'contains'],
        }


class TransactionFilter(filters.FilterSet):
    class Meta:
        model = Transaction
        fields = {
            'created_at': ['lt', 'gt', 'exact'],
            'type': ['exact'],
            'date': ['lt', 'gt', 'exact'],
            'title': ['exact', 'contains'],
            'description': ['exact', 'contains'],
            'price': ['lt', 'gt', 'exact'],
            'isTemplate': ['exact'],
            'currency': ['exact'],
            'category': ['exact'],
        }


def parce_excel(file, filename):
    if (filename.endswith('xlsx')):
        wb = openpyxl.load_workbook(filename=BytesIO(file.read()))
        sheet_names = wb.sheetnames
        return [tuple(wb[sheet].values) for sheet in sheet_names]
    elif (filename.endswith('xls')):
        wb = xlrd.open_workbook(file_contents=file.read())
        res = {}
        for sheet_name in wb.sheet_names():
            sheet = wb.sheet_by_name(sheet_name)
            res[sheet_name] = [sheet.row_values(i) for i in range(sheet.nrows)]
        return res
    else:
        raise ValueError('this file type is not supported')
