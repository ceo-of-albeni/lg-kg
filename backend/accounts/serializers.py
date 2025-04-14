from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from dj_rest_auth.serializers import LoginSerializer
from rest_framework import serializers

User = get_user_model()


class LoginSerializer(LoginSerializer):
    username = None  # remove username completely
    email = serializers.EmailField(required=True)

    def get_auth_user(self, username, email, password):
        return super().get_auth_user(username=None, email=email, password=password)

    def validate(self, attrs):
        attrs['username'] = None
        return super().validate(attrs)


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = [
            'email', 'password', 'name', 'surname',
            'phone', 'inn', 'bic'
        ]

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            name=validated_data['name'],
            surname=validated_data['surname'],
            phone=validated_data['phone'],
            inn=validated_data.get('inn', ''),
            bic=validated_data.get('bic', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
