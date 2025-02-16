import React, { useState } from 'react';
import './TarefaList.css';

const TarefaList = ({ tarefas, onConcluir, onExcluir, onEditar }) => {
  const [editandoIndex, setEditandoIndex] = useState(null); // Armazena o índice da tarefa sendo editada
  const [novoTitulo, setNovoTitulo] = useState(''); // Armazena a nova descrição

  const iniciarEdicao = (index, titulo) => {
    setEditandoIndex(index);
    setNovoTitulo(titulo); // Preenche com a descrição atual
  };

  const salvarEdicao = (index) => {
    if (novoTitulo.trim()) {
      onEditar(index, novoTitulo); // Chama a função passada por props para salvar a alteração
      setEditandoIndex(null); // Sai do modo de edição
    }
  };

  const cancelarEdicao = () => {
    setEditandoIndex(null); // Sai do modo de edição sem salvar
  };

  return (
    <div className="tarefa-list">
      {tarefas.slice().reverse().map((tarefa, index) => (
        <div
          key={index}
          className={`tarefa-item ${tarefa.concluida ? 'concluida' : ''}`}
        >
          {/* Checkbox para concluir a tarefa */}
          <input
            type="checkbox"
            checked={tarefa.concluida}
            onChange={() => onConcluir(tarefas.length - 1 - index)}
            className="concluir-checkbox"
          />

          {/* Alternar entre modo de exibição e edição */}
          {editandoIndex === tarefas.length - 1 - index ? (
            <input
              type="text"
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              className="tarefa-input"
            />
          ) : (
            <span>{tarefa.titulo}</span>
          )}

          <div className="tarefa-buttons">
            {editandoIndex === tarefas.length - 1 - index ? (
              <>
                <button
                  className="salvar-button"
                  onClick={() => salvarEdicao(tarefas.length - 1 - index)}
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
                onClick={() => iniciarEdicao(tarefas.length - 1 - index, tarefa.titulo)}
              >
                Editar
              </button>
            )}
            <button
              className="excluir-button"
              onClick={() => onExcluir(tarefas.length - 1 - index)}
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
