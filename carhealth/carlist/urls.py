from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewset,AutoViewset,UserViewset

router = DefaultRouter()
router.register(r'Usuario',UsuarioViewset)

router.register(r'Auto',AutoViewset)

router.register(r'Users',UserViewset)

urlpatterns = [
    path('',include(router.urls))
]