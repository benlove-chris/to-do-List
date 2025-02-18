from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Tarefa
from .serializers import TarefaSerializer

# Custom Serializer and View for Token Authentication
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username_or_email = attrs.get("username")
        password = attrs.get("password")

        user = User.objects.filter(email=username_or_email).first() or User.objects.filter(username=username_or_email).first()
        if user and user.check_password(password):
            attrs["username"] = user.username
            return super().validate(attrs)
        else:
            raise serializers.ValidationError("No active account found with the given credentials")

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# ViewSet for Tarefa
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
