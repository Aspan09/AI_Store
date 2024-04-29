from django.urls import path
from .views import (index, register, login_view, logout_view, ProductListView)


urlpatterns = [
    path('', index, name="home"),
    path('register/', register, name="register"),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('products/', ProductListView.as_view(), name='product_list'),
]


