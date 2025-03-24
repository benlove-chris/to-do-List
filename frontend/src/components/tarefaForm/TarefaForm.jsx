import React, { useState } from 'react';
import './TarefaForm.css';

const TarefaForm = ({ onAddTarefa }) => {
  const [titulo, setTitulo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTarefa(titulo);
    setTitulo('');
  };

  return (
    <form className="tarefa-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite uma nova tarefa"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="input-tarefa"
      />
      <button type="submit" className="add-button">
        Adicionar
      </button>
    </form>
  );
};

export default TarefaForm;
