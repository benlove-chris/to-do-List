from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import TarefaViewSet
from .user_views import criar_usuario

# Definindo o roteador para a API de tarefas
router = DefaultRouter()
router.register(r'tarefas', TarefaViewSet, basename='tarefa')

urlpatterns = [
    # Rota de autenticação JWT
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # Rota para criar usuário
    path('signup/', criar_usuario, name='signup'),

    # Rota para tarefas
    path('', include(router.urls)),  # Rotas de tarefas
]
