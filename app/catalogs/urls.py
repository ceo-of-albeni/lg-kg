from django.urls import path, include
from rest_framework import routers

from catalogs.views import CatalogViewSet

router = routers.DefaultRouter()
router.register(r'catalogs', CatalogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]