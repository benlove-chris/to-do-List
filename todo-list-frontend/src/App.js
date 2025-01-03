import React, { useState, useEffect } from 'react';
import TarefaList from './components/TarefaList';
import TarefaForm from './components/TarefaForm';
import { getTarefas, createTarefa } from './services/tarefaService';

const App = () => {
  const [tarefas, setTarefas] = useState([]);
  const token = localStorage.getItem('token'); // Token do usuário logado

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const tarefasAPI = await getTarefas(token);
        setTarefas(tarefasAPI);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTarefas();
  }, [token]);

  const handleAddTarefa = async (novaTarefa) => {
    try {
      const tarefaCriada = await createTarefa(novaTarefa, token);
      setTarefas([...tarefas, tarefaCriada]);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  return (
    <div>
      <h1>Lista de tarefas</h1>
      <TarefaForm onSubmit={handleAddTarefa} />
      <TarefaList tarefas={tarefas} />
    </div>
  );
};

export default App;
