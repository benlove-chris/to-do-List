import React, { useState, useEffect } from 'react';
import { getTarefas } from '../services/tarefaService';

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [error, setError] = useState(null);
  const token = '4c62da4b4d7a476d8e413bfec9be5491dec29df3'; // Substitua pelo seu token válido

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const data = await getTarefas(token);
        setTarefas(data);
      } catch (err) {
        setError('Erro ao buscar tarefas');
      }
    };

    fetchTarefas();
  }, [token]);

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      {error && <p>{error}</p>}
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tarefas;
