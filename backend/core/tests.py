import json
from django.contrib.auth.models import User
from django.urls import reverse
import os
import io

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from .models import Category
from .models import Currency
from .models import Transaction


class CategoryAPIViewTestCase(APITestCase):
    url = "/api/v1/categories/"

    def setUp(self):
        self.username = "john@snow.com"
        self.email = "john@snow.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create_user(
            self.username, self.email, self.password)
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_user_category_creating(self):
        response = self.client.post(
            self.url, {"name": "transport", "color": "red"})
        self.assertEqual(201, response.status_code)

    def test_user_category_get(self):
        new_user = User.objects.create_user(
            "new@user.com", "new@user.com", "newpass")
        Category.objects.create(owner=new_user, name="cookies", color="brown")
        Category.objects.create(owner=new_user, name="tea", color="white")

        Category.objects.create(owner=self.user, name="transport", color="red")
        response = self.client.get(self.url)
        self.assertTrue(len(json.loads(response.content)) ==
                        Category.objects.filter(owner=self.user).count())


class TransactionAPIViewTestCase(APITestCase):
    url = "/api/v1/transactions/"

    def setUp(self):
        self.username = "john"
        self.email = "john@snow.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create_user(
            self.username, self.email, self.password)
        self.currency = Currency.objects.get(slug="rur")
        self.category1 = Category.objects.create(
            owner=self.user, name="cookies", color="brown")
        self.category2 = Category.objects.create(
            owner=self.user, name="tea", color="white")
        self.transaction1 = Transaction.objects.create(type="ls",
                                                       date="2021-04-20",
                                                       owner=self.user,
                                                       title="string",
                                                       description="string",
                                                       price=100,
                                                       isTemplate=False,
                                                       currency=self.currency,
                                                       category=self.category1)
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_transactions_create(self):
        response = self.client.post(self.url, {
            "type": "loss",
            "date": "2021-04-20",
            "title": "string",
            "description": "string",
            "price": 100,
            "currency": self.currency.id,
            "category": self.category1.id
        })
        self.assertEqual(201, response.status_code)

        response = self.client.post(self.url, {
            "type": "loss",
            "date": "2021-04-20",
            "title": "string",
            "description": "string",
            "price": 200,
            "currency": self.currency.id,
            "category": self.category2.id
        })
        self.assertEqual(201, response.status_code)

    def test_transactions_update(self):
        transaction_url = f"{self.url}{self.transaction1.id}/"
        response = self.client.patch(transaction_url, {"title": "new title"})
        self.assertEqual(200, response.status_code)

        self.assertEqual(Transaction.objects.get(
            id=self.transaction1.id).title, "new title")

        response = self.client.put(transaction_url, {
            "type": "loss",
            "date": "2021-04-20",
            "title": "string",
            "description": "string",
            "price": 100,
            "currency": self.currency.id,
            "category": self.category1.id
        })
        self.assertEqual(200, response.status_code)

        self.assertEqual(Transaction.objects.get(
            id=self.transaction1.id).title, "string")

    def test_transactions_update_authorization(self):
        """
            Test to verify that put call with different user token
        """

        new_user = User.objects.create_user(
            "newuser", "new@user.com", "newpass")
        new_token = Token.objects.create(user=new_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + new_token.key)

        transaction_url = f"{self.url}{self.transaction1.id}/"
        # HTTP DEL
        response = self.client.delete(transaction_url)
        self.assertEqual(404, response.status_code)

    def test_transactions_delete(self):
        transaction_url = f"{self.url}{self.transaction1.id}/"
        response = self.client.delete(transaction_url)
        self.assertEqual(204, response.status_code)

    def test_transactions_bulk_create(self):
        response = self.client.post(self.url, json.dumps([{
            "type": "loss",
            "date": "2021-04-20",
            "title": "string",
            "description": "string",
            "price": 100,
            "isTemplate": False,
            "currency": self.currency.id,
            "category": self.category1.id
        },
            {
            "type": "loss",
            "date": "2021-04-20",
            "title": "string",
            "description": "string",
            "price": 200,
            "isTemplate": False,
            "currency": self.currency.id,
            "category": self.category2.id
        }
        ]), content_type='application/json')
        self.assertEqual(201, response.status_code)



class ExcelParcerAPIViewTestCase(APITestCase):
    url = "/api/v1/parce_excel/"

    def setUp(self):
        self.username = "john@snow.com"
        self.email = "john@snow.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create_user(
            self.username, self.email, self.password)
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_xlsx_file(self):
        path = os.path.join('backend', 'core', 'test_files', 'test.xlsx')
        with open(path, 'rb') as f:
            response = self.client.put(f'{self.url}fileaneme.xlsx', {'datafile': f}, format='multipart')
            self.assertEqual(200, response.status_code)


    def test_xls_file(self):
        path = os.path.join('backend', 'core', 'test_files', 'test.xls')
        with open(path, 'rb') as f:
            response = self.client.put(f'{self.url}fileaneme.xls', {'datafile': f}, format='multipart')
            self.assertEqual(200, response.status_code)
