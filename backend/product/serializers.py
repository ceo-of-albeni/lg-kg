from rest_framework import serializers
from .models import Product, Specs, Description


class SpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specs
        fields = ['key', 'value']


class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = ['image', 'title', 'text']


class ProductSerializer(serializers.ModelSerializer):
    specs = SpecsSerializer(many=True, read_only=True)
    descriptions = DescriptionSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['name', 'category', 'type', 'product_model', 'image', 'slug', 'specs', 'descriptions']
