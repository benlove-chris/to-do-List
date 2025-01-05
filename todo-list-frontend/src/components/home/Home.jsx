import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTarefas, createTarefa } from '../../services/tarefaService';
import TarefaForm from '../tarefaForm/TarefaForm'; // Importa o componente TarefaForm
import TarefaList from '../tarefaList/TarefaList'; // Importa o componente TarefaList
import './Home.css';

const Home = () => {
  const [tarefas, setTarefas] = useState([]);
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

  const handleAddTarefa = async (descricao) => {
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
  };

  const handleLogin = () => {
    if (!token) {
      navigate('/login');
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
    navigate('/');
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
      <TarefaForm onAddTarefa={handleAddTarefa} />
      <TarefaList tarefas={tarefas} /> {/* Usando o componente TarefaList */}
    </div>
  );
};

export default Home;
