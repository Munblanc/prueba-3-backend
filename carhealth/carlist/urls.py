from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r'Users',UserViewset)

router.register(r'Subscripcion',SubscriptionViewset)

router.register(r'Auto',AutoViewset)

router.register(r'Chequeo',ChequeoViewset)


urlpatterns = [
    path('',include(router.urls))
    
]