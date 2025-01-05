import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTarefas, createTarefa } from '../../services/tarefaService';
import './Home.css'; // Importa os estilos

const Home = () => {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
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
        await createTarefa(tarefa, token);
      }
      localStorage.removeItem('tarefas');
    } catch (error) {
      console.error('Erro ao sincronizar tarefas locais:', error);
    }
  };

  const handleAddTarefa = async (e) => {
    e.preventDefault();
    if (!descricao.trim()) return;

    if (modoConvidado) {
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

  const handleLogin = () => {
    if (!token) {
      navigate('/login'); // Redireciona para a página de login
    } else {
      const mockToken = 'mock-token-de-login';
      localStorage.setItem('token', mockToken);
      setModoConvidado(false);

      const tarefasLocais = JSON.parse(localStorage.getItem('tarefas') || '[]');
      if (tarefasLocais.length > 0) {
        sincronizarTarefas(tarefasLocais);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setModoConvidado(true);
    navigate('/'); // Redireciona para a home
  };

  return (
    <div className="home-container">
      <h1>Lista de Tarefas - Home</h1>
      {modoConvidado && (
        <p className="modo-convidado">
          Você está no modo convidado. Suas tarefas serão salvas apenas localmente.
        </p>
      )}
      {!token ? (
        <button className="login-button" onClick={handleLogin}>
          Fazer login para salvar tarefas no servidor
        </button>
      ) : (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
      <form className="tarefa-form" onSubmit={handleAddTarefa}>
        <input
          type="text"
          placeholder="Digite uma nova tarefa"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="input-tarefa"
        />
        <button type="submit" className="add-button">
          Adicionar
        </button>
      </form>
      <div className="tarefas-list">
        <ul>
          {tarefas.map((tarefa, index) => (
            <li key={index} className="tarefa-item">
              {tarefa.descricao}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
