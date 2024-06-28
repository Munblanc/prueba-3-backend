from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()

    @property
    def is_active(self):
        return self.end_date > datetime.datetime.now()

    def __str__(self):
        return f"{self.Usuario}"

class Auto(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False)
    Marca = models.CharField(max_length=100)
    Modelo = models.CharField(max_length=100)
    Placa = models.CharField(max_length=100)
    Fecha_fabricacion = models.DateField(max_length=100)
    Combustible = models.CharField(max_length=100)
    #User = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Usuarios", default=1)  # Añade un valor por defecto de 1

class Chequeo(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False)
    Placa = models.ForeignKey(Auto, on_delete=models.CASCADE)
    Kilometraje = models.CharField(max_length=100)
    Color = models.CharField(max_length=100)
    Aceite = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.Marca} {self.Modelo}"