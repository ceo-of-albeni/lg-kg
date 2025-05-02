from .models import ContactMessage
from rest_framework import viewsets
from .serializers import ContactMessageSerializer


class ContactViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer