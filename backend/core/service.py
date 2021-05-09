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


class openpyxl_parcer():
    """
        xlss parcer using openpyxl library
    """

    def __init__(self, data) -> None:
        # data_only = calculate all formulas
        self.wb = openpyxl.load_workbook(
            filename=BytesIO(data), data_only=True)

    def get_sheet_names(self):
        return self.wb.sheetnames

    def get_data(self, sheet_name):
        return [list(e) for e in self.wb[sheet_name].values]

    def get_merged(self, sheet_name=None):
        sheet = self.wb[sheet_name]
        bounds = [range.bounds for range in sheet.merged_cell_ranges]
        return [(b-1, a-1, d-1, c-1) for a, b, c, d in bounds]


class xlrd_parcer():
    """
        xls parcer using xlrd library
    """

    def __init__(self, data) -> None:
        self.wb = xlrd.open_workbook(file_contents=data, formatting_info=True)

    def get_sheet_names(self):
        return self.wb.sheet_names()

    def get_data(self, sheet_name):
        sheet = self.wb.sheet_by_name(sheet_name)
        # https://xlrd.readthedocs.io/en/latest/api.html#xlrd.sheet.Cell
        return [[e.value if e.ctype != 6 else None for e in sheet.row(i)] for i in range(sheet.nrows)]

    def get_merged(self, sheet_name):
        sheet = self.wb.sheet_by_name(sheet_name)
        return [(rlo, rhi-1, clo, chi-1) for rlo, rhi, clo, chi in sheet.merged_cells]


def parce_excel(file, filename, fill):
    # choose parcer depending on file extention
    if (filename.endswith('xlsx')):
        parcer = openpyxl_parcer(file.read())
    elif (filename.endswith('xls')):
        parcer = xlrd_parcer(file.read())
    else:
        raise ValueError('this file type is not supported')

    # Parce excel and create result object
    res = {}
    for sheet_name in parcer.get_sheet_names():
        res[sheet_name] = {}
        res[sheet_name]['data'] = parcer.get_data(sheet_name)
        try:
            res[sheet_name]['headers'] = res[sheet_name]['data'].pop(0)
        except IndexError:
            res[sheet_name]['headers'] = []
        
        res[sheet_name]['merged_cells'] = parcer.get_merged(sheet_name)


    # Remove empty trailing rows and coluns
    for sheet_name in parcer.get_sheet_names():
        try:
            data = res[sheet_name]['data']
            # delete trailing empty rows
            while (not any(data[-1])):
                del data[-1]
            
            # delete trailing columns
            while (not any(row[-1] for row in data)):
                for row in data:
                    del row[-1]
        except IndexError:
            # only if arrays are empty
            pass
    
    
    # if res[sheet_name]['data'] == []:
    #     res[sheet_name]['data'] = [[]]

    # Apply filling
    if (fill == 'empty'):
        for sheet in res:
            for row in res[sheet]['data']:
                for i, _ in enumerate(row):
                    row[i] = row[i] if row[i] is not None else ''
    elif (fill == 'copy'):
        for sheet in res:
            for x1, y1, x2, y2 in res[sheet]['merged_cells']:
                for i in range(x1, x2+1):
                    for j in range(y1, y2+1):
                        res[sheet]['data'][i][j] = res[sheet]['data'][x1][y1]
    else:
        assert fill == 'null', f"Uncknown fill value: '{fill}'"

    return {'sheets': res}
