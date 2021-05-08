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

    def get_data(self):
        sheet_names = self.wb.sheetnames
        return {sheet: [list(e) for e in self.wb[sheet].values] for sheet in sheet_names}

    def get_merged(self):
        res = {}
        for sheet_name in self.wb.sheetnames:
            sheet = self.wb[sheet_name]
            bounds = [range.bounds for range in sheet.merged_cell_ranges]
            res[sheet_name] = [(b-1, a-1, d-1, c-1) for a, b, c, d in bounds]
        return res


class xlrd_parcer():
    """
        xls parcer using xlrd library
    """

    def __init__(self, data) -> None:
        self.wb = xlrd.open_workbook(file_contents=data, formatting_info=True)

    def get_data(self):
        res = {}
        for sheet_name in self.wb.sheet_names():
            sheet = self.wb.sheet_by_name(sheet_name)
            # https://xlrd.readthedocs.io/en/latest/api.html#xlrd.sheet.Cell
            res[sheet_name] = [[e.value if e.ctype !=
                               6 else None for e in sheet.row(i)] for i in range(sheet.nrows)]
        return res

    def get_merged(self):
        res = {}
        for sheet_name in self.wb.sheet_names():
            sheet = self.wb.sheet_by_name(sheet_name)
            res[sheet_name] = [(rlo, rhi-1, clo , chi-1 )
                               for rlo, rhi, clo, chi in sheet.merged_cells]
        return res


def parce_excel(file, filename, fill):
    # choose parcer depending on file extention
    if (filename.endswith('xlsx')):
        parcer = openpyxl_parcer(file.read())
    elif (filename.endswith('xls')):
        parcer = xlrd_parcer(file.read())
    else:
        raise ValueError('this file type is not supported')

    data = parcer.get_data()
    merged_cells = parcer.get_merged()

    if (fill == 'empty'):
        for sheet in data:
            for row in data[sheet]:
                for i, _ in enumerate(row):
                    row[i] = row[i] if row[i] is not None else ''
    elif (fill == 'copy'):
        for sheet in merged_cells:
            for x1, y1, x2, y2 in merged_cells[sheet]:
                for i in range(x1, x2+1):
                    for j in range(y1, y2+1):
                        data[sheet][i][j] = data[sheet][x1][y1]
    else:
        assert fill == 'null', f"Uncknown fill value: '{fill}'"

    return {'data': data, 'merged_cells': merged_cells}
