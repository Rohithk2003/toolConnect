from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.User)
admin.site.register(models.Trader)
admin.site.register(models.customUser)
admin.site.register(models.Item)
admin.site.register(models.Category)
admin.site.register(models.wishList)
admin.site.register(models.Order)
admin.site.register(models.Image)
