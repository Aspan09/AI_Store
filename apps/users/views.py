from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView
from .forms import CustomUserCreationForm, LoginForm
from django.contrib.auth import logout, authenticate, login
from .models import CustomUser, Product, Categories, City, Cart, Brand, ScopeApplication
from .forms import ProductForm
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages


def index(request):
    cities = City.objects.all()
    categories = Categories.objects.all()
    products = Product.objects.all()
    return render(request, 'main.html', {'cities': cities, 'categories': categories, 'products': products})


def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()

            # Аутентифицируем и логиним пользователя после регистрации
            user = authenticate(email=user.email, password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect('home')  # Перенаправление на главную страницу после успешной регистрации
        else:
            messages.error(request, "Исправьте ошибки в форме.")
    else:
        form = CustomUserCreationForm()

    return render(request, 'registry.html', {'form': form})


def login_view(request):
    context = {}
    if request.POST:
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        print(user)

        user = CustomUser.objects.get(email=email)
        print("check_password", user.check_password(password))
        print("password", password)
        if user.check_password(password):
            login(request, user)
            return redirect("home")

        print("user: ", user)
    else:
        form = LoginForm()
        context["login"] = form

    return render(request, 'login.html', context)


def logout_view(request):
    logout(request)
    return redirect('home')


class ProductListView(ListView):
    model = Product
    template_name = 'products.html'
    context_object_name = 'products'

    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.GET.get('search_query')
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['search_form'] = ProductForm(self.request.GET)
        return context


def get_products_by_category(request, category_id):
    products = Product.objects.filter(category_id=category_id).values('id', 'name', 'description', 'image', 'price')
    return JsonResponse(list(products), safe=False)


@csrf_exempt
def add_to_cart(request, product_id):
    # Проверяем, является ли пользователь аутентифицированным
    if not request.user.is_authenticated:
        # Если пользователь не аутентифицирован, возвращаем ошибку
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    # Получаем продукт по его идентификатору
    product = Product.objects.get(pk=product_id)

    # Проверяем, есть ли продукт в корзине
    cart_item, created = Cart.objects.get_or_create(user=request.user, product=product)

    # Если продукт уже был в корзине, увеличиваем его количество
    if not created:
        cart_item.quantity += 1
        cart_item.save()

    return JsonResponse({'message': 'Product added to cart successfully'})


@login_required(redirect_field_name='next', login_url='/login')
def remove_from_cart(request, cart_id):
    cart = get_object_or_404(Cart, pk=cart_id)
    cart.delete()
    return JsonResponse({'message': 'Product removed from cart successfully'})


@login_required(redirect_field_name='next', login_url='/login')
def view_cart(request):
    # Получаем все товары, добавленные в корзину текущим пользователем
    categories = Categories.objects.all()
    cities = City.objects.all()
    cart_items = Cart.objects.filter(user=request.user)
    # Вычисляем общую стоимость всех товаров в корзине
    final_price = sum(item.product.price * item.quantity for item in cart_items)
    print(f"Initial Total Price: {final_price}")  # Отладочный вывод

    return render(request, 'cart.html', {'cart_items': cart_items, 'final_price': final_price,
                                         'categories': categories, 'cities': cities})


def view_descr(request, product_id):
    categories = Categories.objects.all()
    products = Product.objects.all()
    cities = City.objects.all()
    product = get_object_or_404(Product, pk=product_id)
    return render(request, 'descr.html', {'categories': categories, 'product': product,
                                          'products': products, 'cities': cities})


def category_view(request, category_slug):
    category = get_object_or_404(Categories, slug=category_slug)
    products = Product.objects.filter(category=category)

    # Получение параметров сортировки
    sort_by = request.GET.get('sort_by')
    if sort_by == 'price':
        products = products.order_by('price')
    elif sort_by == 'name':
        products = products.order_by('name')

    # Фильтрация по диапазону цен
    price_from = request.GET.get('price_from')
    price_to = request.GET.get('price_to')
    if price_from and price_to:
        products = products.filter(price__gte=price_from, price__lte=price_to)

    categories = Categories.objects.all()  # Для меню категорий
    cities = City.objects.all()

    return render(request, 'filter.html', {
        'category': category,
        'products': products,
        'categories': categories,
        'cities': cities,
        'sort_by': sort_by,
        'price_from': price_from,
        'price_to': price_to,
    })


def about_us(request):
    categories = Categories.objects.all()
    products = Product.objects.all()
    cities = City.objects.all()
    return render(request, 'about-us.html', {categories: 'categories', products: 'products', 'cities': cities})

