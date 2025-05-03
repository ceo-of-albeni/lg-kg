# orders/permissions.py

from rest_framework import permissions


class IsOwnerOrReadOnlyCreate(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user and request.user.is_authenticated
        if view.action == 'create':
            return True
        return False

    def has_object_permission(self, request, view, obj):
        return request.method in ['GET'] and obj.user == request.user
