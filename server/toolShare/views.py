import json
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from .models import *
from django.db.models import Max, Min
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
from datetime import date
from datetime import datetime
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect


def index(request):
    if request.user.is_authenticated:
        user = customUser.objects.filter(user=request.user).first().type
    return JsonResponse(
        {
            "categories": [category.category for category in Category.objects.all()],
            "maxnoofdays": ["0-5", "5-10", "10-15", "15-20"],
        },
        status=200,
    )


def get_all_ids(request):
    items = [str(item.item_id) for item in Item.objects.all()]
    return JsonResponse(items, safe=False)


def get_main_page_items(request):
    itemobjects = Item.objects.filter(availability=True).order_by("-max_no_of_days")[:3]
    items = [item.serialize() for item in itemobjects]
    return JsonResponse(items, safe=False)


def check_wishlist_view(request, item_id):
    if request.user.is_authenticated:
        wishlistitem = wishList.objects.filter(
            item=Item.objects.filter(item_id=item_id).first(),
            user=customUser.objects.filter(user=request.user).first(),
        ).first()
        if wishlistitem is None:
            return JsonResponse({"message": False}, status=200)
        return JsonResponse({"message": True}, status=200)
    return JsonResponse({}, status=400)


def get_csrf(request):
    response = JsonResponse({"Info": "Success- set csrf cookies"})
    if "CSRF_COOKIE" in request.META:
        response["X-CSRFToken"] = request.META["CSRF_COOKIE"]
    else:
        response["X-CSRFToken"] = get_token(request)
    return response


@csrf_exempt
def additemtowishlist(request, item_id):
    if request.user.is_authenticated:
        if request.method == "POST":
            wishlistitem = wishList.objects.filter(
                item=Item.objects.filter(item_id=item_id).first(),
                user=customUser.objects.filter(user=request.user).first(),
            ).first()
            if wishlistitem is None:
                wishList.objects.create(
                    item=Item.objects.filter(item_id=item_id).first(),
                    user=customUser.objects.filter(user=request.user).first(),
                )
                return JsonResponse({"message": "success"}, status=200)
            else:
                wishlistitem = wishList.objects.filter(
                    item=Item.objects.filter(item_id=item_id).first(),
                    user=customUser.objects.filter(user=request.user).first(),
                ).first()
                wishlistitem.delete()
                return JsonResponse({"message": "removed"}, status=200)
    return JsonResponse({"message": "please login"}, status=400)


@csrf_exempt
def add_item_view(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            data = json.loads(request.body)
            item_name = data.get("item_name")
            category = Category.objects.filter(category=data.get("category")).first()
            max_no_of_days = data.get("noofdays")
            description = data.get("item_description")
            imageUrl = data.get("img")
            Item.objects.create(
                item_name=item_name,
                category=category,
                seller=customUser.objects.filter(user=request.user).first(),
                max_no_of_days=max_no_of_days,
                description=description,
                img=imageUrl,
            )
            return JsonResponse(
                {
                    "message": "Item has been added",
                    "heading": "Success",
                },
                status=200,
            )


@csrf_protect
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"Status": "1", "usertype": customUser.objects.filter(user=user).first().type.type},
                                status=200)
        else:
            return JsonResponse({"Status": "0"}, status=400)


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


@csrf_protect
def register_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        password = data.get("password")
        confirmation = data.get("confirm_password")
        if "@" in data.get("email") and ".com" in data.get("email"):
            if password != confirmation:
                return JsonResponse({"status": "2"}, status=400)
            try:
                user = User.objects.create_user(
                    username=data.get("username"),
                    first_name=data.get("first_name"),
                    last_name=data.get("last_name"),
                    password=data.get("password"),
                    email=data.get("email"),
                )
                user.save()
                customUser(
                    user=user,
                    address=data.get("address"),
                    type=Trader.objects.filter(type=data.get("type")).first(),
                ).save()
            except IntegrityError as e:
                return JsonResponse({"status": "3"}, status=400)
            login(request, user)
            return JsonResponse({"status": "0"}, status=200)
        else:
            return JsonResponse({"status": "1"}, status=400)


def get_onsale_items(request):
    if request.method == "GET" and request.user.is_authenticated:
        onsale = Item.objects.filter(seller=customUser.objects.filter(user=request.user).first())
        items = []
        todayDate = date.today()
        for item in onsale:
            temp = item.serialize()
            temp["max_no_of_days"] = temp["max_no_of_days"] - (temp["createdTime"].date() - todayDate).days
            temp[
                "date"
            ] = f'{temp["createdTime"].strftime("%Y:%m:%d")} at {temp["createdTime"].strftime("%H:%M:%S %p")}'

            items.append(temp)
        return JsonResponse(

            items, safe=False
        )
    return JsonResponse(
        {},
        status=400
    )


def check_authentication_status(request):
    print(request, request.user)
    if request.user.is_authenticated:
        return JsonResponse(
            {"status": request.user.is_authenticated,
             "usertype": customUser.objects.filter(user=request.user).first().type.type,
             "username": request.user.username}, safe=False)
    else:
        return JsonResponse({"status": request.user.is_authenticated})


def getItems(request, id="", category="", itemDataFrom=""):
    items = []
    itemObjects = Item.objects.filter(availability=True)
    if id:
        itemObjects = itemObjects.filter(item_id=id)
    # if itemDataFrom == "onsale":
    #     itemObjects = Item.objects.filter(
    #         seller=customUser.objects.filter(user=request.user).first()
    #     )
    # elif itemDataFrom == "wishlist":
    #     itemObjects = wishList.objects.filter(
    #         user=customUser.objects.filter(user=request.user).first()
    #     )
    #     itemIds = []
    #     for temp in itemObjects:
    #         itemIds.append(temp.item.item_id)
    #     itemObjects = Item.objects.filter(item_id__in=itemIds, availability=True).all()
    # elif itemDataFrom != "none":
    #     itemObjects = Item.objects.filter(item_name__contains=itemDataFrom).all()
    #
    if category:
        itemObjects = itemObjects.filter(
            category=Category.objects.filter(category=category).first()
        ).all()

    for item in itemObjects:
        temp = item.serialize()
        temp[
            "createdTime"
        ] = f'{temp["createdTime"].strftime("%Y:%m:%d")} at {temp["createdTime"].strftime("%H:%M:%S %p")}'
        items.append(temp)
    return JsonResponse(items, safe=False)


@csrf_exempt
def order_item_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Please login"}, status=400)
    if request.method == "PUT":
        data = json.loads(request.body)
        item_id = data.get("item_id")
        item = Item.objects.filter(item_id=item_id).first()
        no_of_days = int(data.get("no_of_days"))
        order_id = hash(
            str(item_id) + str(no_of_days) + str(
                customUser.objects.filter(user=request.user).first().user.first_name) + str(item.seller)
        )
        Order.objects.create(
            order_id=order_id,
            item=item,
            seller=item.seller,
            buyer=customUser.objects.filter(user=request.user).first(),
            no_of_days=no_of_days,
        )
        currentItem = Item.objects.filter(item_id=item_id).first()
        currentItem.availability = False
        currentItem.save()
        return JsonResponse({"message": "Thank you for your purchase"}, status=200)


def get_wishlist_items(request):
    if request.user.is_authenticated:
        items = wishList.objects.filter(user=customUser.objects.filter(user=request.user).first()).all()
        required = []
        for item in items:
            temp = item.item.serialize()
            temp[
                "createdTime"
            ] = f'{temp["createdTime"].strftime("%Y:%m:%d")} at {temp["createdTime"].strftime("%H:%M:%S %p")}'
            required.append(temp)
        return JsonResponse(required, safe=False)
    return JsonResponse({}, safe=False)


def get_sold_items(request):
    if request.user.is_authenticated:
        items = []
        itemObjects = Item.objects.filter(seller=customUser.objects.filter(user=request.user).first())

        for item in itemObjects:
            temp = item.serialize()
            temp[
                "createdTime"
            ] = f'{temp["createdTime"].strftime("%Y:%m:%d")} at {temp["createdTime"].strftime("%H:%M:%S %p")}'
            orders = Order.objects.filter(item=item).first()
            temp["buyer"] = orders.buyer.user.first_name + orders.buyer.user.last_name
            temp["buyer_address"] = orders.buyer.address
            items.append(temp)
        return JsonResponse(items, safe=False)
    return JsonResponse({}, safe=False)


def delete_item_view(request, id):
    item = Item.objects.filter(item_id=id)
    item.delete()
    return JsonResponse({"Success": "Done"}, status=200)


def get_past_orders(request):
    if request.user.is_authenticated:
        orders = Order.objects.filter(
            buyer=customUser.objects.filter(user=request.user).first()
        )
        items = []
        todayDate = date.today()
        for item in orders:
            temp = item.serialize()
            temp["no_of_days"] = temp["no_of_days"] - (temp["date"].date() - todayDate).days
            temp[
                "date"
            ] = f'{temp["date"].strftime("%Y:%m:%d")} at {temp["date"].strftime("%H:%M:%S %p")}'

            items.append(temp)

        return JsonResponse(
            items,
            safe=False,
        )
    return JsonResponse(
        {}, status=400
    )


def item_ordered_check(request):
    if request.method == "POST" and request.user.is_authenticated:
        body = json.loads(request.body)
        item_id = body.get("id")
        orders = Order.objects.filter(
            buyer=customUser.objects.filter(user=request.user).first(),
            item=Item.objects.filter(item_id=item_id).first()
        ).first()
        print(orders)
        if orders is not None:
            return JsonResponse(
                {"message": "present"}, status=200
            )
        else:
            return JsonResponse(
                {"message": "not present"},
                status=200,
            )
    return JsonResponse({"message": "please login in"})


def viewItem(request, item_id):
    return JsonResponse(
        {"item": Item.objects.filter(item_id=5).first().serialize()}, status=200
    )
