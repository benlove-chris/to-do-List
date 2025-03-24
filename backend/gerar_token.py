
# admin - a84521c9694c0ecfc85c8ec9d87507aeb0b2cc9f
#chris - 4c62da4b4d7a476d8e413bfec9be5491dec29df3

import os
import django
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

# Configura o Django para usar o arquivo settings.py correto
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todolist.settings')
django.setup()

def gerar_token():
    username = input("Digite o username do usuário: ")

    try:
        # Obtém o usuário pelo username
        user = User.objects.get(username=username)

        # Gera ou obtém o token do usuário
        token, created = Token.objects.get_or_create(user=user)

        # Exibe o token
        print(f"O token do usuário '{user.username}' é: {token.key}")
        if created:
            print("Um novo token foi gerado.")
        else:
            print("Este token já existia.")
    except User.DoesNotExist:
        print(f"Usuário com username '{username}' não encontrado.")

if __name__ == "__main__":
    gerar_token()
