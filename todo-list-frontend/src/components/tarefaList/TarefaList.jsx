// src/components/tarefaList/TarefaList.js
import React from 'react';
import './TarefaList.css';

const TarefaList = ({ tarefas, onConcluir, onExcluir }) => {
  return (
    <div className="tarefa-list">
      {tarefas.map((tarefa, index) => (
        <div
          key={index}
          className={`tarefa-item ${tarefa.concluida ? 'concluida' : ''}`}
        >
          <span>{tarefa.descricao}</span>
          <div className="tarefa-buttons">
            <button
              className="concluir-button"
              onClick={() => onConcluir(index)}
            >
              {tarefa.concluida ? 'Desfazer' : 'Concluir'}
            </button>
            <button
              className="excluir-button"
              onClick={() => onExcluir(index)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TarefaList;
