import React, { useState } from 'react';
import './LoginForm.css'; // Importa o arquivo CSS

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de validação de login
    if (email === 'usuario@teste.com' && senha === 'senha123') {
      // Armazenar o token no localStorage
      localStorage.setItem('token', '4c62da4b4d7a476d8e413bfec9be5491dec29df3');
      window.location.href = '/'; // Redireciona para a página de tarefas
    } else {
      alert('Credenciais inválidas. Você será redirecionado para criar uma conta.');
      window.location.href = '/signup'; // Caminho para a página de criação de conta
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <a href="/signup">Ainda não tem conta? Crie uma agora</a>
    </div>
  );
};

export default LoginForm;
