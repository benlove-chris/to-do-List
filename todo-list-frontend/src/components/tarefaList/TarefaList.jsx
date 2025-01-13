// src/components/tarefaList/TarefaList.js
import React, { useState } from 'react';
import './TarefaList.css';

const TarefaList = ({ tarefas, onConcluir, onExcluir, onEditar }) => {
  const [editandoIndex, setEditandoIndex] = useState(null); // Armazena o índice da tarefa sendo editada
  const [novaDescricao, setNovaDescricao] = useState(''); // Armazena a nova descrição

  const iniciarEdicao = (index, descricao) => {
    setEditandoIndex(index);
    setNovaDescricao(descricao); // Preenche com a descrição atual
  };

  const salvarEdicao = (index) => {
    if (novaDescricao.trim()) {
      onEditar(index, novaDescricao); // Chama a função passada por props para salvar a alteração
      setEditandoIndex(null); // Sai do modo de edição
    }
  };

  const cancelarEdicao = () => {
    setEditandoIndex(null); // Sai do modo de edição sem salvar
  };

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

          {/* Alternar entre modo de exibição e edição */}
          {editandoIndex === index ? (
            <input
              type="text"
              value={novaDescricao}
              onChange={(e) => setNovaDescricao(e.target.value)}
              className="tarefa-input"
            />
          ) : (
            <span>{tarefa.descricao}</span>
          )}

          <div className="tarefa-buttons">
            {editandoIndex === index ? (
              <>
                <button
                  className="salvar-button"
                  onClick={() => salvarEdicao(index)}
                >
                  Salvar
                </button>
                <button className="cancelar-button" onClick={cancelarEdicao}>
                  Cancelar
                </button>
              </>
            ) : (
              <button
                className="editar-button"
                onClick={() => iniciarEdicao(index, tarefa.descricao)}
              >
                Editar
              </button>
            )}
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
