from rest_framework import viewsets
from django.contrib.auth.models import User
from.models import Auto,Usuario
from.serializers import AutoSerializer,UsuarioSerializer, UserSerializer

# Create your views here.
class AutoViewset(viewsets.ModelViewSet):
    queryset=Auto.objects.all()
    serializer_class = AutoSerializer  

class UserViewset(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class = UserSerializer

class UsuarioViewset(viewsets.ModelViewSet):
    queryset=Usuario.objects.all()
    serializer_class = UsuarioSerializer    