from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import News
from .serializers import NewsSerializer


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing news.
    """
    queryset = News.objects.all()
    serializer_class = NewsSerializer


