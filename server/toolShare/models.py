from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    def __str__(self):
        return self.username


class Trader(models.Model):
    type = models.CharField(max_length=10, default="Buyer")

    def __str__(self):
        return f"{self.type}"


class customUser(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    type = models.ForeignKey(to=Trader, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username}"

    def serialize(self):
        return {
            "user": self.user.username,
            "address": self.address,
            "type": self.type.type,
        }


class Category(models.Model):
    category = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.category}"

    def serialize(self):
        return {"category": self.category}


class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    item_name = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    availability = models.BooleanField(default=True)
    category = models.ForeignKey(
        to=Category, on_delete=models.CASCADE, related_name="itemCategory"
    )
    seller = models.ForeignKey(
        to=customUser, on_delete=models.CASCADE, related_name="seller"
    )
    max_no_of_days = models.IntegerField()
    createdTime = models.DateTimeField(auto_now_add=True)
    image_url = models.CharField(max_length=500, default="")

    def __str__(self):
        return f"{self.item_name} : {self.description}:{self.item_id}"

    def serialize(self):
        return {
            "id": self.item_id,
            "item_name": self.item_name,
            "description": self.description,
            "seller": self.seller.user.first_name + self.seller.user.last_name,
            "seller_username": self.seller.user.username,
            "category": self.category.category,
            "address": self.seller.address,
            "max_no_of_days": self.max_no_of_days,
            "createdTime": self.createdTime,
            "image": self.image_url,
        }


# class Image(models.Model):
#     img = models.ImageField(upload_to="images/")
#     item = models.ForeignKey(Item, on_delete=models.CASCADE)


class Order(models.Model):
    order_id = models.CharField(max_length=100, primary_key=True)
    item = models.ForeignKey(
        to=Item, on_delete=models.CASCADE, related_name="itemOrder"
    )
    seller = models.ForeignKey(
        to=customUser, on_delete=models.CASCADE, related_name="sellerOrder"
    )
    ord_date = models.DateTimeField(auto_now_add=True)
    buyer = models.ForeignKey(
        to=customUser, on_delete=models.CASCADE, default=None, related_name="buyerOrder"
    )
    no_of_days = models.IntegerField()

    def serialize(self):
        return {
            "order_id": self.order_id,
            "date": self.ord_date,
            "seller_name": self.seller.user.first_name + self.seller.user.last_name,
            "buyer_name": self.buyer.user.first_name + self.buyer.user.last_name,
            "item": self.item.item_name,
            "no_of_days": self.no_of_days,
        }


class wishList(models.Model):
    item = models.ForeignKey(to=Item, on_delete=models.CASCADE, related_name="item")
    user = models.ForeignKey(
        to=customUser, on_delete=models.CASCADE, related_name="userWishlist"
    )

    def __str__(self):
        return f"{self.item}-{self.user}"
