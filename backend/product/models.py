from django.db import models
from smart_selects.db_fields import ChainedForeignKey


class Category(models.Model):
    name = models.CharField(max_length=400)
    image = models.ImageField(upload_to='images/', blank=True)

    def __str__(self):
        return self.name


class Type(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='types')
    name = models.CharField(max_length=400)
    image = models.ImageField(upload_to='images/', blank=True)

    def __str__(self):
        return self.name


class ProductModel(models.Model):
    type = models.ForeignKey(Type, on_delete=models.CASCADE, related_name='product_models')
    name = models.CharField(max_length=400)
    image = models.ImageField(upload_to='images/', blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    type = ChainedForeignKey(
        Type,
        chained_field='category',
        chained_model_field='category',
        show_all=False,
        auto_choose=True,
        sort=True,
        on_delete=models.CASCADE
    )
    product_model = ChainedForeignKey(
        ProductModel,
        chained_field='type',
        chained_model_field='type',
        show_all=False,
        auto_choose=True,
        sort=True,
        on_delete=models.CASCADE)
    name = models.CharField(max_length=400)
    image = models.ImageField(upload_to='images/', blank=True)
    slug = models.SlugField(unique=True)


class Specs(models.Model):
    product = models.ForeignKey(Product, related_name='specs', on_delete=models.CASCADE)
    key = models.CharField("Specs Name", max_length=100)
    value = models.CharField("Specs Value", max_length=255)

    def __str__(self):
        return f"{self.key}: {self.value}"


class Description(models.Model):
    product = models.ForeignKey(Product, related_name='descriptions', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/', blank=True)
    title = models.CharField(max_length=400)
    text = models.TextField()