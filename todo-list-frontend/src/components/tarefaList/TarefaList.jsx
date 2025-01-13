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
          {/* Checkbox para concluir a tarefa */}
          <input
            type="checkbox"
            checked={tarefa.concluida}
            onChange={() => onConcluir(index)}
            className="concluir-checkbox"
          />
          <span>{tarefa.descricao}</span>
          <div className="tarefa-buttons">
            {/* Botão renomeado para Editar */}
            <button
              className="editar-button"
              onClick={() => console.log(`Editar tarefa ${index}`)}
            >
              Editar
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
