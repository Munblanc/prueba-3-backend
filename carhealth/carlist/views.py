from rest_framework import viewsets
from django.contrib.auth.models import User
from.models import Auto, User,Subscription,Chequeo
from.serializers import *
from datetime import datetime, timedelta

# Create your views here.
class AutoViewset(viewsets.ModelViewSet):
    queryset=Auto.objects.all()
    serializer_class = AutoSerializer  

class UserViewset(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class = UserSerializer

class SubscriptionViewset(viewsets.ModelViewSet):
    queryset=Subscription.objects.all()
    serializer_class = SubscriptionSerializer

class ChequeoViewset(viewsets.ModelViewSet):
    queryset=Chequeo.objects.all()
    serializer_class = ChequeoSerializer        