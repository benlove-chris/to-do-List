from rest_framework import serializers
from .models import Tarefa

# Definimos um serializer para o modelo Tarefa
class TarefaSerializer(serializers.ModelSerializer):
    # O campo 'usuario' é definido como somente leitura e seu valor padrão é o usuário atual
    usuario = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        # Especificamos que este serializer está associado ao modelo Tarefa
        model = Tarefa
        # Definimos os campos que serão incluídos na serialização
        fields = ['id', 'titulo', 'descricao', 'status', 'usuario', 'd_criacao', 'd_atualizacao']
        # Especificamos quais campos são somente leitura
        read_only_fields = ['id', 'd_criacao', 'd_atualizacao', 'usuario']
