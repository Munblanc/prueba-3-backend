from rest_framework import serializers
from .models import Usuario,Auto
from django.contrib.auth.models import User

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        
class AutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auto
        fields = '__all__'  

class UserSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = '__all__'         