from django.urls import path, include
from rest_framework import routers

from . import views
app_name = 'account'

# from api.webpage import views

urlpatterns = [
    path('login', views.UserLoginView.as_view(), name='login'),
    path('signup', views.UserSignupView.as_view(), name='signup'),
    path('register', views.UserRegisterView.as_view(), name='register'),
]
