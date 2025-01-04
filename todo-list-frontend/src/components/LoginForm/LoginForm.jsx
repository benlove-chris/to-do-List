import React, { useState } from "react";
import "./LoginForm.css"; // Importa o CSS

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Login realizado com sucesso!");
  };

  return (
    <div className="container">
      <h1 className="header">Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha:</label>
        <input
          className="input"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button className="button" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
