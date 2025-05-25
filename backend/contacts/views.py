from .models import ContactMessage
from rest_framework import viewsets, mixins
from .serializers import ContactMessageSerializer


class ContactViewSet(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
