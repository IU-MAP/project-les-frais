DEFAULT_CURRENCY = [
    {"slug": "rur", "name": "ruble", "label": "₽"},
    {"slug": "usd", "name": "dollar", "label": "$"},
] 

DEFAULT_CATEGORUES = [ {'name': {'rus': 'Еда', 'eng': 'Food'}},
            {'name': {'rus': 'Одежда', 'eng': 'Cloths'}},
            {'name': {'rus': 'Подписки', 'eng': 'Subscriptions'}},
            {'name': {'rus': 'Услуги', 'eng': 'Services'}},
            {'name': {'rus': 'Здоровье', 'eng': 'Health'}},
            {'name': {'rus': 'Путешествия', 'eng': 'Travels'}},
            {'name': {'rus': 'Развлечения', 'eng': 'Entertainment'}},
            {'name': {'rus': 'Прочее', 'eng': 'Miscellaneous'}}]

from drf_yasg import openapi

EXCEL_PARCER_SCHEMA = {
    "200": openapi.Response(
        description='Excel parcer for xls and xlsx (click Example Value on the next line)',
        examples={
            "application/json": {
                    "data": {
                        "Лист1": [
                            [
                                "hello",
                                "this is merged cell",
                                None
                            ],
                            [
                                2.0,
                                None,
                                None
                            ]
                        ]
                    },
                "merged_cells": {
                        "Лист1": [
                            [
                                1,
                                0,
                                2,
                                1
                            ]
                        ]
                }
            }
        }
    )
}