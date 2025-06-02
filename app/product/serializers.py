from rest_framework import serializers
from .models import Product, Specs, Description, Category, Type, ProductModel


class SpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specs
        fields = ['key', 'value']


class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = ['image', 'title', 'text']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'image']


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['name', 'image']


class ProductModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductModel
        fields = ['name', 'image']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    type = TypeSerializer(read_only=True)
    product_model = ProductModelSerializer(read_only=True)
    specs = SpecsSerializer(many=True, read_only=True)
    descriptions = DescriptionSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['name', 'category', 'type', 'product_model', 'image', 'slug', 'specs', 'descriptions']
