import React, { useState } from 'react';
import { Pencil, Trash, Check, X } from 'lucide-react';
import './TarefaList.css';

const TarefaList = ({ tarefas, onConcluir, onExcluir, onEditar }) => {
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState('');

  const iniciarEdicao = (index, titulo) => {
    setEditandoIndex(index);
    setNovoTitulo(titulo);
  };

  const salvarEdicao = (index) => {
    if (novoTitulo.trim()) {
      onEditar(index, novoTitulo);
      setEditandoIndex(null);
    }
  };

  const cancelarEdicao = () => {
    setEditandoIndex(null);
  };

  return (
    <div className="tarefa-list">
      {tarefas.slice().reverse().map((tarefa, index) => (
        <div
          key={index}
          className={`tarefa-item ${tarefa.concluida ? 'concluida' : ''}`}
        >
          <input
            type="checkbox"
            checked={tarefa.concluida}
            onChange={() => onConcluir(tarefas.length - 1 - index)}
            className="concluir-checkbox"
          />

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
                <button className="salvar-button" onClick={() => salvarEdicao(tarefas.length - 1 - index)}>
                  <Check size={18} />
                </button>
                <button className="cancelar-button" onClick={cancelarEdicao}>
                  <X size={18} />
                </button>
              </>
            ) : (
              <button className="editar-button" onClick={() => iniciarEdicao(tarefas.length - 1 - index, tarefa.titulo)}>
                <Pencil size={18} />
              </button>
            )}
            <button className="excluir-button" onClick={() => onExcluir(tarefas.length - 1 - index)}>
              <Trash size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TarefaList;
