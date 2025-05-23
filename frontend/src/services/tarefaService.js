import api from './api';

// criar usuario - create user
export const signup = async (username, email, password) => {
  try {
    const response = await api.post('signup/', { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// autenticar o usuario - login
export const login = async (usernameOrEmail, password) => {
  try {
    const response = await api.post('auth/login/', { username: usernameOrEmail, password });
    return {
      token: response.data.access, // Supondo que o token é retornado no campo 'access'
      user_name: response.data.user_name, // Supondo que o nome do usuário é retornado no campo 'user_name'
    };
  } catch (error) {
    throw error;
  }
};

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
        Authorization: `Bearer ${token}`,
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
