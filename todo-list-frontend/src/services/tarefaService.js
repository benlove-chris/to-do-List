import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const getTarefas = async (token) => {
  try {
    const response = await api.get('tarefas/', {
      headers: { Authorization: `Token ${token}` },
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
