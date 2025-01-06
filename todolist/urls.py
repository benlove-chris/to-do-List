from django.contrib import admin
from rest_framework.authtoken import views
from django.urls import path, include
"""
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tarefas.urls')),  # Inclui as rotas da API
    path('api/token/', views.obtain_auth_token, name='api_token_auth'),
    
]
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Rota para o admin do Django
    path('api/', include('tarefas.urls')),  # Inclui as URLs do app `tarefas`
]
