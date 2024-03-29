import json
import datetime
from django.shortcuts import render, redirect
from .models import *
from django.http import JsonResponse
import requests

from .forms import *


def store(request):
    if request.user.is_authenticated:
        user = User.objects.get(
            username=request.user
        )

        try:
            customer = user.customer

        except AttributeError:
            customer = Customer.objects.create(
                user=request.user,
                name=user.username,
                email=user.email
            )

        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']

    #products = Product.objects.filter(is_sold=False)
    products = Product.objects.all()
    categories = Category.objects.all()

    #print('products:', products)
    context = {'products': products,
               'cartItems': cartItems,
               'customer': customer,
               'categories': categories}

    #change to store/store.html after
    return render(request, 'store/store.html', context)


def cart(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items

    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']

    context = {'items': items,
               'order': order,
               'cartItems': cartItems,
               'customer': customer}
    return render(request, 'store/cart.html', context)


def checkout(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']

    context = {'items': items,
               'order': order,
               'cartItems': cartItems,
               'customer': customer}
    return render(request, 'store/checkout.html', context)


def updateItem(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']
    print('Action:', action)
    print('Product:', productId)

    customer = request.user.customer
    product = Product.objects.get(id=productId)
    order, created = Order.objects.get_or_create(customer=customer, complete=False)

    orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)

    if action == 'add':
        orderItem.quantity = (orderItem.quantity + 1)
    elif action == 'remove':
        orderItem.quantity = (orderItem.quantity - 1)

    orderItem.save()

    if orderItem.quantity <= 0:
        orderItem.delete()

    return JsonResponse('Item was added', safe=False)


def processOrder(request):
    data = json.loads(request.body)
    transaction_id = datetime.datetime.now().timestamp()

    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        total = float(data['form']['total'])
        order.transaction_id = transaction_id

        if total == order.get_cart_total:
            order.complete = True
        order.save()

        if order.shipping == True:
            ShippingAddress.objects.create(
                customer=customer,
                order=order,
                address=data['shipping']['address'],
                city=data['shipping']['city'],
                state=data['shipping']['state'],
                zipcode=data['shipping']['zipcode'],
            )
        else:
            ShippingAddress.objects.create(
                customer=customer,
                order=order,
                address=data['shipping']['address'],
                city=data['shipping']['city'],
                state=data['shipping']['state'],
            )
    else:
        print('User is not logged in')

    return JsonResponse('Payment complete!', safe=False)


def signup(request):
    form = SignupForm()
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()

            return redirect('/login/')
    else:
        form = SignupForm()

    context = {'form': form}
    return render(request, 'store/signup.html', context,)


def about_us(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']
    response = requests.get('https://official-joke-api.appspot.com/random_ten').json()

    context = {'items': items,
               'order': order,
               'cartItems': cartItems,
               'customer': customer,
               'response': response,
               }
    return render(request, 'store/about_us.html', context)


def sort_store(request):
    if request.user.is_authenticated:
        customer = request.user.customer

        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']

    categories = Category.objects.all()
    data = json.loads(request.body)
    cat_Id = data['filterId']
    print('category:', cat_Id)
    products = Product.objects.filter(category_id=cat_Id)
    print('products:', products)

    context = {'products': products,
               'cartItems': cartItems,
               'customer': customer,
               'categories': categories}

    #change to store/store.html after
    return render(request, 'store/store.html', context)


def news(request):


    news = News.objects.all()
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']

    context = {'items': items,
               'order': order,
               'cartItems': cartItems,
               'customer': customer,
               'news': news,
               }
    return render(request, 'store/news.html', context)


def terms(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']

    context = {'items': items,
               'order': order,
               'cartItems': cartItems,
               'customer': customer,
               }
    return render(request, 'store/terms.html', context)


def contacts(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']

    context = {'items': items,
               'order': order,
               'cartItems': cartItems,
               'customer': customer,
               }
    return render(request, 'store/contacts.html', context)


def vacancy(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']

    context = {'items': items,
               'order': order,
               'cartItems': cartItems,
               'customer': customer,
               }
    return render(request, 'store/vacancy.html', context)


def reviews(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']

    reviews = Review.objects.all()
    form = ReviewForm()

    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            new_review = Review(
                customer=request.user.customer,  # Get the username of the logged-in user
                rate=form.cleaned_data['rating'],
                comment=form.cleaned_data['text']
            )
            new_review.save()
            return redirect('reviews')

    context = {'items': items,
               'order': order,
               'cartItems': cartItems,
               'customer': customer,
               'form': form,
               'reviews': reviews,
               }
    return render(request, 'store/reviews.html', context)


def coupons(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']

    context = {'items': items,
               'order': order,
               'cartItems': cartItems,
               'customer': customer,
               }
    return render(request, 'store/coupons.html', context)


def tests(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        # Create empty cart for now for non-logged in user
        customer = Customer(
            name=''
        )
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
        cartItems = order['get_cart_items']

    context = {'items': items,
               'order': order,
               'cartItems': cartItems,
               'customer': customer,
               }
    return render(request, 'store/tests.html', context)