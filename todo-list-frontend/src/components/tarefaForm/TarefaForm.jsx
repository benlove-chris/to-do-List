import React, { useState } from 'react';
import './TarefaForm.css';

const TarefaForm = ({ onAddTarefa }) => {
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTarefa(descricao);
    setDescricao('');
  };

  return (
    <form className="tarefa-form" onSubmit={handleSubmit}>
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
  );
};

export default TarefaForm;
