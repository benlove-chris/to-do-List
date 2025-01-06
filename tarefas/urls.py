from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TarefaViewSet
from .user_views import criar_usuario

router = DefaultRouter()
router.register(r'tarefas', TarefaViewSet, basename='tarefa')

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', criar_usuario, name='signup'),
]

# Definindo o roteador para a API
# O caminho para a API de tarefas será 'api/tarefas/'