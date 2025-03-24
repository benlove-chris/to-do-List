from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny

# Configuração da documentação Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="API Documentação",
        default_version='v1',
        description="Documentação da API",
    ),
    public=True,
    permission_classes=(AllowAny,),
)

# Rotas principais do projeto
urlpatterns = [
    path('', include('tarefas.urls')),
    path('admin/', admin.site.urls),  # Rota do admin do Django
    path('api/', include('tarefas.urls')),  # Inclui as rotas do app `tarefas`
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),  # Documentação Swagger
]
