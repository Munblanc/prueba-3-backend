from rest_framework import serializers
from.models import Auto, User,Subscription,Chequeo
from django.contrib.auth.models import *

        
class AutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auto
        fields = '__all__'  

class UserSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ['id', 'username','password', 'email']  

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

class ChequeoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chequeo
        fields = '__all__'