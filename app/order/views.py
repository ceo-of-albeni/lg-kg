# orders/views.py

from rest_framework import viewsets, mixins
from .models import Order
from .serializers import OrderSerializer
from .permissions import IsOwnerOrReadOnlyCreate


class OrderViewSet(mixins.CreateModelMixin,
                   mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   viewsets.GenericViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsOwnerOrReadOnlyCreate]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Order.objects.filter(user=self.request.user)
        return Order.objects.none()  # guests can't list
