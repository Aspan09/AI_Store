from django.contrib import admin
from .models import CustomUser, City, Product, Categories


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'phone_number', 'user_name', 'city', 'online', 'created_at', 'is_staff')
    search_fields = ('email', 'phone_number', 'user_name')
    list_filter = ('city', 'online', 'created_at', 'is_staff')


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(City)
admin.site.register(Product)
admin.site.register(Categories)

