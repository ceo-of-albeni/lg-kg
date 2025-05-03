from django.shortcuts import render

from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import get_user_model
from dj_rest_auth.jwt_auth import set_jwt_cookies
from dj_rest_auth.views import LoginView as DjLoginView
from .serializers import LoginSerializer

User = get_user_model()


class LoginView(DjLoginView):
    serializer_class = LoginSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        self.tokens = {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data['tokens'] = self.tokens

        # Add token response body
        response.data['tokens'] = self.tokens

        # 🧁 Set tokens in cookies
        access = self.tokens['access']
        refresh = self.tokens['refresh']
        set_jwt_cookies(response, access, refresh)

        return response


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
