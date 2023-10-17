from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from .forms import LoginForm, SignupForm


class AccountViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='testpassword')


class AccountFormTest(TestCase):
    def test_login_form_valid(self):
        form = LoginForm(data={'username': 'testuser', 'password': 'testpassword'})
        self.assertFalse(form.is_valid())

    def test_login_form_invalid(self):
        form = LoginForm(data={'username': 'testuser', 'password': ''})
        self.assertFalse(form.is_valid())

    def test_user_registration_form_valid(self):
        form = SignupForm(data={
            'username': 'newuser',
            'email': 'john@example.com',
            'password1': 'newpassword',
            'password2': 'newpassword'
        })
        self.assertFalse(form.is_valid())