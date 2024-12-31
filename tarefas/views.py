from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

# Create your views here.
from rest_framework import viewsets
from .models import Tarefa
from .serializers import TarefaSerializer

class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all().order_by('-d_criacao')
    serializer_class = TarefaSerializer
    permission_classes = [IsAuthenticated]