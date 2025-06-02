from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['user', 'status']

    def validate(self, data):
        request = self.context['request']
        if not request.user.is_authenticated:
            for field in ['name', 'phone', 'email']:
                if not data.get(field):
                    raise serializers.ValidationError({field: 'This field is required for anonymous users.'})
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        if user.is_authenticated:
            validated_data['user'] = user
        return super().create(validated_data)
