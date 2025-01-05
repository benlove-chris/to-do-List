import React from 'react';
import './TarefaList.css';

const TarefaList = ({ tarefas }) => {
  return (
    <div className="tarefas-list">
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index} className="tarefa-item">
            {tarefa.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TarefaList;
