from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Case
from .serializers import CaseSerializer


class CaseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing case.
    """
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
