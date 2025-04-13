from django.shortcuts import render
from rest_framework import viewsets

from product.models import Product
from product.serializers import ProductSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
