from django.shortcuts import render, redirect
from django.views.generic import ListView
from .forms import CustomUserCreationForm, LoginForm
from django.contrib.auth import logout, authenticate, login
from .models import CustomUser, Product, Categories, City
from .forms import ProductForm


def index(request):
    cities = City.objects.all()
    categories = Categories.objects.all()
    products = Product.objects.all()
    return render(request, 'main.html', {'cities': cities, 'categories': categories, 'products': products})


def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)  # Сохраняем пользователя, но не коммитим в базу данных пока
            user.set_password(request.POST['password'])  # Устанавливаем зашифрованный пароль
            user.save()  # Теперь сохраняем пользователя с зашифрованным паролем
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate(request, email=email, password=password)
            print("user: ", user)
            if user is not None:
                login(request, user)
                return redirect("home")
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
        # if user is not None:
        #     login(request, user)
        #     return redirect("home")
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

