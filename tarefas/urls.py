from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TarefaViewSet

# Definindo o roteador para a API
router = DefaultRouter()
router.register(r'tarefas', TarefaViewSet)  # O caminho para a API de tarefas será 'api/tasks/'

urlpatterns = router.urls
