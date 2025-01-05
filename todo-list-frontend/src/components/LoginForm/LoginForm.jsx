import React, { useState } from 'react';

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
      // Se as credenciais não forem válidas, redireciona para a página de criação de conta
      alert('Credenciais inválidas. Você será redirecionado para criar uma conta.');
      window.location.href = '/signup'; // Caminho para a página de criação de conta
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
