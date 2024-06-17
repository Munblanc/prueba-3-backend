from django.db import models

# Create your models here.
class Usuario(models.Model):
        id = models.AutoField(primary_key=True,unique=True,null=False)
        Usuario = models.CharField(max_length=100)
        email = models.CharField(max_length=100)
        password = models.CharField(max_length=100)
        telefono = models.CharField(max_length=100)
        
def _str__(self):
    return f"{self.Usuario}"

class Auto(models.Model):   
    id = models.AutoField(primary_key=True,unique=True,null=False)
    Marca = models.CharField(max_length=100)
    Modelo = models.CharField(max_length=100)
    Color = models.CharField(max_length=100)
    Placa = models.CharField(max_length=100)
    anio = models.DateField(max_length=100)
    Combustible = models.CharField(max_length=100)
    Aceite = models.CharField(max_length=100)
    Kilometraje = models.CharField(max_length=100)
    Usuario = models.ForeignKey(Usuario,on_delete=models.CASCADE,related_name="Usuarios")


    def _str__(self):
        return f"{self.Marca} {self.Modelo}"
    