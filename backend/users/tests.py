from django.contrib.auth.models import User

from rest_framework.test import APITestCase


# Create your tests here.
class TestUserAuth(APITestCase):
    reg_url = "/rest-auth/registration/"
    login_url = "/rest-auth/login/"

    def setUp(self):
        self.user1 = {"email": "john@snow.com", "pass": "you_know_nothing"}
        self.user2 = {"email": "john1@snow.com", "pass": "you_know_nothing"}

    def register(self, user, pass1, pass2):
        return self.client.post(self.reg_url,
                                {"email": user, "username": user,
                                 "password1": pass1,
                                 "password2": pass2})

    def login(self, user, password):
        return self.client.post(self.login_url,
                                {"email": user,
                                 "username": user,
                                 "password": password})

    def test_user_registration(self):
        response = self.register(self.user1["email"], self.user1["pass"], self.user1["pass"])
        self.assertEqual(201, response.status_code)  # Successful registration
        User.objects.get(email=self.user1["email"])  # check that instance was created

        response = self.register(self.user1["email"], self.user1["pass"], self.user1["pass"])
        self.assertEqual(400, response.status_code)  # Same user registration must fail

        response = self.register(self.user1["email"], self.user1["pass"], self.user1["pass"] + "1")
        self.assertEqual(400, response.status_code)  # password mismatch

    def test_user_login(self):
        response = self.login(self.user1["email"], self.user1["pass"])
        self.assertEqual(400, response.status_code)  # Unknown user login

        response = self.register(self.user1["email"], self.user1["pass"], self.user1["pass"])
        self.assertEqual(201, response.status_code)  # New user creating

        response = self.login(self.user1["email"], self.user1["pass"])
        self.assertEqual(200, response.status_code)  # Correct login
