"""
URL configuration for lg_backend_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from dj_rest_auth.views import LogoutView, PasswordChangeView
from accounts.views import LoginView, CustomRegisterView

from django.contrib import admin
from django.urls import path, include

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .token_views import (
    DecoratedTokenObtainPairView,
    DecoratedTokenRefreshView,
)
from accounts.views import ManualRegisterView

schema_view = get_schema_view(
   openapi.Info(
      title="LG Backend API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


class LogoutPostOnlyView(LogoutView):
    http_method_names = ['post']  # disables GET


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('product.urls')),
    path('', include('order.urls')),
    path('', include('cases.urls')),
    path('', include('accounts.urls')),
    path('', include('catalogs.urls')),
    path('', include('contacts.urls')),
    path('', include('news.urls')),
    path('', include('accounts.urls')),

    # Dj-rest-auth
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', CustomRegisterView.as_view(), name='custom_register'),
    path('accounts/', include('allauth.urls')),
    # path('auth/login', LoginView.as_view(), name='login'),
    # path('auth/logout', LogoutPostOnlyView.as_view(), name='logout'),
    # path('auth/password/change/', PasswordChangeView.as_view(), name='password_change'),

    # path('auth/register/', RegisterView.as_view(), name='register'),

    # SimpleJWT
    path('token/', DecoratedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', DecoratedTokenRefreshView.as_view(), name='token_refresh'),

    # Smart Selects
    path('chaining/', include('smart_selects.urls')),

    # Swagger
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # Django Schema Viewer
    path('schema-viewer/', include('schema_viewer.urls')),
]
