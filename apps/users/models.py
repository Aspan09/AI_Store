from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.utils import timezone
import secrets
import string
from django.conf import settings


class CustomUserManager(BaseUserManager):

    def create_user(self, email, password=None):
        if not email:
            raise ValueError('The Email field must be set')

        user = self.model(email=self.normalize_email(email))

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class City(models.Model):
    name = models.CharField(verbose_name='Название города', max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Город'
        verbose_name_plural = 'Города'


class CustomUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    phone_number = models.CharField(verbose_name="Номер телефона", max_length=100)
    user_name = models.CharField(verbose_name='Имя пользователя', max_length=255)
    city = models.ForeignKey(City, on_delete=models.CASCADE, verbose_name="Город", related_name="users", null=True)

    online = models.BooleanField(default=False)
    created_at = models.DateTimeField(verbose_name="Дата создания аккаунта", auto_now_add=True)

    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class Categories(models.Model):
    name = models.CharField(verbose_name='Название категории', max_length=255)
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'category'
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class ScopeApplication(models.Model):
    name_scope = models.CharField(verbose_name='Область применения', max_length=150, blank=True, null=True)

    def __str__(self):
        return self.name_scope

    class Meta:
        verbose_name = 'Область применения'
        verbose_name_plural = 'Областя применения'


class Brand(models.Model):
    name_brand = models.CharField(verbose_name='Бренд', max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name_brand

    class Meta:
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренды'


class Product(models.Model):

    name = models.CharField(max_length=150, unique=True, verbose_name='Название')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    description = models.TextField(blank=True, null=True, verbose_name='Описание')
    image = models.ImageField(upload_to='goods_images', blank=True, null=True, verbose_name='Изображение')
    price = models.DecimalField(default=0.00, max_digits=7, decimal_places=2, verbose_name='Цена')
    discount = models.DecimalField(default=0.00, max_digits=4, decimal_places=2, verbose_name='Скидка в %')
    quantity = models.PositiveIntegerField(default=0, verbose_name='Количество')
    category = models.ForeignKey(to=Categories, on_delete=models.CASCADE, verbose_name='Категория')
    brand = models.ForeignKey(to=Brand, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Бренд',)
    scope_of_application = models.ForeignKey(to=ScopeApplication, on_delete=models.CASCADE,
                                             verbose_name='Область применения', blank=True, null=True)
    video_url = models.CharField(verbose_name='Видео url с youtube', max_length=300, blank=True, null=True)

    class Meta:
        db_table = 'product'
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'
        ordering = ("id",)

    def __str__(self):
        return f'{self.name} Количество - {self.quantity}'

    def get_absolute_url(self):
        return reverse("catalog:product", kwargs={"product_slug": self.slug})

    def display_id(self):
        return f"{self.id:05}"

    def sell_price(self):
        if self.discount:
            return round(self.price - self.price * self.discount / 100, 2)

        return self.price


class Cart(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'Пользователь: {self.user}, Продукт: {self.product}, Количество: {self.quantity}'

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'

