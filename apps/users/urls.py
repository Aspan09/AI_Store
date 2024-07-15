from django.urls import path
from .views import (index, register, login_view, logout_view,
                    ProductListView, get_products_by_category,
                    add_to_cart, remove_from_cart, view_cart, view_descr, category_view, about_us
                    )


urlpatterns = [
    path('', index, name="home"),
    path('register/', register, name="register"),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('products/', ProductListView.as_view(), name='product_list'),
    path('get_products/<int:category_id>/', get_products_by_category, name='get_products_by_category'),
    path('add_to_cart/<int:product_id>/', add_to_cart, name='add_to_cart'),
    path('remove/<int:cart_id>/', remove_from_cart, name='remove_from_cart'),
    path('cart/', view_cart, name='view_cart'),
    path('descr/<int:product_id>/', view_descr, name='view_descr'),
    path('category/<slug:category_slug>/', category_view, name='category_view'),
    path('about_us/', about_us, name='about_us')
]




