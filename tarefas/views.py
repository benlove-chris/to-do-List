"""
responsável por lidar com as requisições relacionadas às Tarefas e determinar como os 
dados são processados e retornados para o cliente (frontend ou API client).
"""

from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Tarefa
from .serializers import TarefaSerializer

# Create your views here.

class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all().order_by('-d_criacao')
    serializer_class = TarefaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna apenas as tarefas do usuário autenticado
        return self.queryset.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        # Define o usuário autenticado como dono da tarefa ao criá-la
        serializer.save(usuario=self.request.user)
    
    def perform_update(self, serializer):
        # Define o usuário autenticado como dono da tarefa ao editá-la
        serializer.save(usuario=self.request.user)
    
    
