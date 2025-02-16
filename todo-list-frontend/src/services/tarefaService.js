import api from './api';

export const getTarefas = async (token) => {
  //alert(token);
  try {
    const response = await api.get('tarefas/', {
      headers: { Authorization: `Bearer ${token}` },
      //headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5NjcyNzcyLCJpYXQiOjE3Mzk2NjkxNzIsImp0aSI6IjJmNzI5MjE3YzVhNDQ4MWNiM2I3YThjYzRiNzQwZTQ4IiwidXNlcl9pZCI6M30.gsoON6k0UHuq4AgF4OsyaQxWbYoJv7ULs12RtteTpso` },
      
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Erro 401: Não autorizado. Verifique o token de autenticação.');
    } else {
      console.error('Erro ao buscar tarefas:', error.message);
    }
    throw error;
  }
};

export const createTarefa = async (novaTarefa, token) => {

  try {
    const response = await api.post('tarefas/', novaTarefa, {

      headers: {
        Authorization: 'Token 4c62da4b4d7a476d8e413bfec9be5491dec29df3',
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Erro 401: Não autorizado. Verifique o token de autenticação.');
    } else {
      console.error('Erro ao criar tarefa:', error.message);
    }
    throw error;
  }
};



export const updateTarefa = async (id, tarefaAtualizada, token) => {
  try {
    const response = await api.put(`tarefas/${id}/`, tarefaAtualizada, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Erro 401: Não autorizado. Verifique o token de autenticação.');
    } else {
      console.error('Erro ao atualizar tarefa:', error.message);
    }
    throw error;
  }
};


export const deleteTarefa = async (id, token) => {
  try {
    await api.delete(`tarefas/${id}/`, {
      headers: { Authorization: `Bearer  ${token}` }
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Erro 401: Não autorizado. Verifique o token de autenticação.');
    } else {
      console.error('Erro ao excluir tarefa:', error.message);
    }
    throw error;
  }
};
