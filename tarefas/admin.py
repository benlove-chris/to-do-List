from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Tarefa

# Registra o modelo Tarefa no admin
admin.site.register(Tarefa)
