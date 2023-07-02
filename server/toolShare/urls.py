from django.urls import path, re_path
from . import views

urlpatterns = [
    path("api/pre_data", views.index, name="index"),
    path("api/login", views.login_view, name="login"),
    path("api/logout", views.logout_view, name="logout"),
    path("api/main_items", views.get_main_page_items, name="main_page_items"),
    path("api/register_user", views.register_view, name="register"),
    path("api/add_item", views.add_item_view, name="addItem"),
    path("api/itemAlreadyOrdered", views.item_ordered_check, name="itemOrdered"),
    path("api/order", views.order_item_view, name="orderItem"),
    path("api/get_csrf", views.get_csrf, name="get_csrf"),
    path("api/viewItem/<int:item_id>", views.viewItem, name="getItem"),
    path("api/viewPastOrders", views.get_past_orders, name="viewPastOrders"),
    path("api/getallids", views.get_all_ids, name="getids"),
    path(
        "api/presentinwishlist/<int:item_id>",
        views.check_wishlist_view,
        name="checkwishlist",
    ),
    path("api/loggedin", views.check_authentication_status, name="checkauthstatus"),
    path("api/addtowishlist/<int:item_id>", views.additemtowishlist, name="addtowishlist"),
    path("api/delete_item/<int:id>", views.delete_item_view, name="deleteItem"),
    path("api/onsaleitems", views.get_onsale_items),
    path("api/getwishilistitems", views.get_wishlist_items),
    path(
        "api/items",
        views.getItems,
        name="list_items",
    ),
    path("api/solditems", views.get_sold_items),
    path(
        "api/items/category=<str:category>",
        views.getItems,
        name="list_items",
    ), path(
        "api/items/itemid=<int:id>",
        views.getItems,
        name="list_items",
    ),
]
# "
