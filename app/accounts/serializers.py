from rest_framework import serializers
from allauth.account.adapter import get_adapter
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from dj_rest_auth.serializers import LoginSerializer
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer as DefaultRegisterSerializer

from order.serializers import OrderSerializer

User = get_user_model()


class LoginSerializer(LoginSerializer):
    username = None  # remove username completely
    email = serializers.EmailField(required=True)

    def get_auth_user(self, username, email, password):
        return super().get_auth_user(username=None, email=email, password=password)

    def validate(self, attrs):
        attrs['username'] = None
        return super().validate(attrs)


class ManualRegisterSerializer(serializers.ModelSerializer):
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


class CustomRegisterSerializer(DefaultRegisterSerializer):
    username = None
    name = serializers.CharField()
    surname = serializers.CharField()
    phone = serializers.CharField()
    inn = serializers.CharField(required=False)
    bic = serializers.CharField(required=False)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError("A user is already registered with this e-mail address.")
        return email

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data.update({
            'name': self.validated_data.get('name', ''),
            'surname': self.validated_data.get('surname', ''),
            'phone': self.validated_data.get('phone', ''),
            'inn': self.validated_data.get('inn', ''),
            'bic': self.validated_data.get('bic', ''),
        })
        return data

    def save(self, request):
        user = super().save(request)
        user.name = self.cleaned_data.get('name')
        user.surname = self.cleaned_data.get('surname')
        user.phone = self.cleaned_data.get('phone')
        user.inn = self.cleaned_data.get('inn')
        user.bic = self.cleaned_data.get('bic')
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    order_list = OrderSerializer(many=True, read_only=True, source='orders')

    class Meta:
        model = User
        fields = ('id', 'name', 'surname', 'phone', 'email', 'password', 'inn', 'bic', 'order_list')