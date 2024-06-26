# Generated by Django 5.0.6 on 2024-06-16 22:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('Usuario', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('telefono', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Auto',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('Marca', models.CharField(max_length=100)),
                ('Modelo', models.CharField(max_length=100)),
                ('Color', models.CharField(max_length=100)),
                ('Placa', models.CharField(max_length=100)),
                ('anio', models.DateField(max_length=100)),
                ('Combustible', models.CharField(max_length=100)),
                ('Aceite', models.CharField(max_length=100)),
                ('Kilometraje', models.CharField(max_length=100)),
                ('Usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Usuarios', to='carlist.usuario')),
            ],
        ),
    ]
