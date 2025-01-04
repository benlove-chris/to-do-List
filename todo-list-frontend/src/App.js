import React, { useState, useEffect } from 'react';
import { getTarefas, createTarefa } from './services/tarefaService';

const App = () => {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState(''); // Para o formulário
  const token = localStorage.getItem('token'); // Token do usuário logado
  const [modoConvidado, setModoConvidado] = useState(!token);

  useEffect(() => {
    if (token) {
      const fetchTarefas = async () => {
        try {
          const tarefasAPI = await getTarefas(token);
          setTarefas(tarefasAPI);
        } catch (error) {
          console.error('Erro ao buscar tarefas:', error);
        }
      };

      fetchTarefas();
    } else {
      const tarefasLocal = JSON.parse(localStorage.getItem('tarefas') || '[]');
      setTarefas(tarefasLocal);
    }
  }, [token]);

  const sincronizarTarefas = async (tarefasLocais) => {
    try {
      for (const tarefa of tarefasLocais) {
        await createTarefa(tarefa, token); // Cria as tarefas locais no servidor
      }
      console.log('Tarefas locais sincronizadas com o servidor.');
      localStorage.removeItem('tarefas'); // Limpa as tarefas locais após sincronização
    } catch (error) {
      console.error('Erro ao sincronizar tarefas locais:', error);
    }
  };

  const handleLogin = async () => {
    const mockToken = 'mock-token-de-login';
    localStorage.setItem('token', mockToken);
    setModoConvidado(false);

    // Sincronizar tarefas locais ao fazer login
    const tarefasLocais = JSON.parse(localStorage.getItem('tarefas') || '[]');
    if (tarefasLocais.length > 0) {
      await sincronizarTarefas(tarefasLocais);
    }

    window.location.reload(); // Atualiza para refletir o login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setModoConvidado(true);
    window.location.reload();
  };

  const handleAddTarefa = async (e) => {
    e.preventDefault();
    if (!descricao.trim()) return;

    if (modoConvidado) {
      // Salvar tarefas localmente no modo convidado
      const novasTarefas = [...tarefas, { descricao }];
      setTarefas(novasTarefas);
      localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
    } else {
      try {
        const tarefaCriada = await createTarefa({ descricao }, token);
        setTarefas([...tarefas, tarefaCriada]);
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
      }
    }
    setDescricao('');
  };

  // Estilos inline
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: "'Arial', sans-serif",
    padding: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const tarefasContainerStyle = {
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1>Lista de Tarefas</h1>
      {modoConvidado && (
        <p style={{ color: '#d9534f', marginBottom: '20px', fontSize: '14px' }}>
          Você está no modo convidado. Suas tarefas serão salvas apenas localmente.
        </p>
      )}
      {!token ? (
        <button style={buttonStyle} onClick={handleLogin}>
          Fazer login para salvar tarefas no servidor
        </button>
      ) : (
        <button style={{ ...buttonStyle, backgroundColor: '#dc3545' }} onClick={handleLogout}>
          Logout
        </button>
      )}
      <form
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}
        onSubmit={handleAddTarefa}
      >
        <input
          type="text"
          placeholder="Digite uma nova tarefa"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '70%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            outline: 'none',
            marginRight: '10px',
          }}
        />
        <button type="submit" style={buttonStyle}>
          Adicionar
        </button>
      </form>
      <div style={tarefasContainerStyle}>
        <ul>
          {tarefas.map((tarefa, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              {tarefa.descricao}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
