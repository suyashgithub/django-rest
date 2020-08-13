from django.db import models
from django.contrib.auth.models import User
#from shop.models.product import Product

class Shop(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, db_index=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=False, null=False )
    status = models.TextField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'shop'

