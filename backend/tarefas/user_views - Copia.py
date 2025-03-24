from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.models import User
import json

@csrf_exempt  # Desativa a proteção CSRF somente para esta view
def criar_usuario(request):
    if request.method == 'POST':
        try:
            # Parseando o JSON enviado na requisição
            data = json.loads(request.body)
            nome = data.get('nome')  # Nome do usuário
            email = data.get('email')  # E-mail
            senha = data.get('senha')  # Senha

            # Verificando se todos os campos estão preenchidos
            if not nome or not email or not senha:
                return JsonResponse({'erro': 'Todos os campos são obrigatórios'}, status=400)

            # Criando o usuário
            usuario = User.objects.create_user(
                username=nome,
                email=email,
                password=senha
            )
            return JsonResponse({'mensagem': 'Usuário criado com sucesso'}, status=201)

        except Exception as e:
            return JsonResponse({'erro': f'Erro ao criar usuário: {str(e)}'}, status=500)

    return JsonResponse({'erro': 'Método não permitido'}, status=405)
