from django.db import models

# Create your models here.

class Tarefa(models.Model):
    titulo = models.CharField(max_length=255) #titulo da tarefa
    descricao = models.TextField(blank=True, null=True) #descrição da tarefa
    status = models.BooleanField(default=False) #status da tarefa - concluido ou não?
    d_criacao = models.DateTimeField(auto_now_add=True) #quando foi criado a tarefa
    d_atualizacao = models.DateTimeField(auto_now=True) #a ultima atualização dela

    def __str__(self):
        return self.title