import json
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # Desabilita a verificação CSRF para esta view
def criar_usuario(request):
    if request.method == 'POST':
        try:
            # Tenta carregar os dados JSON
            data = json.loads(request.body.decode('utf-8'))

            username = data.get('username')  # username
            email = data.get('email')  # E-mail
            password = data.get('password')  # password

            # Verifica se todos os campos foram preenchidos
            if not username or not email or not password:
                return JsonResponse({'erro': 'Todos os campos são obrigatórios'}, status=400)

            # Criar o usuário com as informações fornecidas
            usuario = User.objects.create_user(
                username=username,  # O username é obrigatório
                email=email,
                password=password,
            )

            # Gerar o JWT para o novo usuário
            refresh = RefreshToken.for_user(usuario)

            return JsonResponse({
                'mensagem': 'Usuário criado com sucesso',
                'access_token': str(refresh.access_token),  # Token de acesso
                'refresh_token': str(refresh),  # Token de refresh (útil para renovar o access_token)
            }, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({'erro': 'Dados JSON inválidos'}, status=400)

        except Exception as e:
            return JsonResponse({'erro': str(e)}, status=500)
