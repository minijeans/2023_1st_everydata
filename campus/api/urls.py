from django.urls import path, include
from rest_framework import routers

# router = routers.DefaultRouter()
from .views import TodosAPIView

from . import views

app_name = 'api'

# from api.webpage import views

urlpatterns = [
    path('', views.index, name='index'),
    path('main', views.userInfo, name='main'),
    # path('signup/', views.signup, name='signup'),
    path('findpw', views.findpw, name='findpw'),
    # path('user', views.userInfo, name='userInfo'),
    path('logout', views.logout, name='logout'),
    
    path('manage', views.manageCredit, name='manageCredit'),
    path('mypage', views.mypage, name='mypage'),
    path('subject', views.recommendProcess, name='recommendProcess'),
    path('lecture', views.recommendResult, name='recommendResult'),
    path('scholarship', views.scholarship, name='scholarship'),
    path('searchtime', views.searchTime, name='searchTime'),
    path('updateuser', views.updateUser, name='updateUser'),


    path('todo/',TodosAPIView.as_view()),

    path('tika', views.tika, name='tika')
    path('recommendLecture', views.recommendLecture, name='reccommendLecture')
]
