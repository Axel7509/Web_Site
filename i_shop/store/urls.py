from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views

from . import views
from .forms import LoginForm

urlpatterns = [

    path('', views.store, name="store"),
    path('cart/', views.cart, name="cart"),
    path('sort_store/', views.sort_store, name="sort_store"),
    path('checkout/', views.checkout, name="checkout"),
    path('signup/', views.signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='store/login.html', authentication_form=LoginForm),
         name='login'),
    path('contact/', views.contact, name="contact"),
    path('exit/', auth_views.LogoutView.as_view(next_page=''), name='exit'),

    path('update_item/', views.updateItem, name="update_item"),
    path('process_order/', views.processOrder, name="process_order")
]
