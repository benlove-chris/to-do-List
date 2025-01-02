from rest_framework import serializers
from .models import Tarefa
from django.contrib.auth.models import User

class TarefaSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Relacionamento com o modelo User
    
    class Meta:
        model = Tarefa
        fields = ['id', 'titulo', 'descricao', 'status', 'usuario', 'd_criacao', 'd_atualizacao']
