from django.urls import path, include
from rest_framework import routers

from cases.views import CaseViewSet

router = routers.DefaultRouter()
router.register('cases', CaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]