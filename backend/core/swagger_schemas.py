import os

from drf_yasg import openapi

from .serializers import ExcelParcerSerializer
from .service import parce_excel

EXCEL_PARCER_SCHEMA_RESPONCE_EXAMPLE_ = None


def excel_parcer_schema_responce_example():
    global EXCEL_PARCER_SCHEMA_RESPONCE_EXAMPLE_
    if (not EXCEL_PARCER_SCHEMA_RESPONCE_EXAMPLE_):
        path = os.path.join('backend', 'core', 'test_files', 'test.xls')
        with open(path, 'rb') as f:
            EXCEL_PARCER_SCHEMA_RESPONCE_EXAMPLE_ = parce_excel(
                f, 'test.xls', 'null')
    return EXCEL_PARCER_SCHEMA_RESPONCE_EXAMPLE_


EXCEL_PARCER_SCHEMA = {
    "200": openapi.Response(
        description='Excel parcer for xls and xlsx (click Example Value on the next line)',
        schema=ExcelParcerSerializer,
        examples={
            "application/json": excel_parcer_schema_responce_example()
        }
    )
}

EXCEL_PARCER_PARAMETERS = [
    openapi.Parameter('fill', openapi.IN_QUERY,
                      description='''merged cells filling, must be either:
        "null" __to fill empty cells with nulls value; default
        "empty" to fill empty cells with empty strings
        "copy"  _to copy content of merged cell in all subcells''',
                      type=openapi.TYPE_STRING,
                      reqired=False)
]


def generate_swagger_parameters(l):
    return [openapi.Parameter(name, openapi.IN_QUERY,
                              type=openapi.TYPE_STRING,
                              reqired=False) for name in l]
