import React, { useState } from 'react';
import './SignupForm.css'; // Importa o arquivo CSS

const SignupForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ nome: false, email: false, senha: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se algum campo está vazio
    const newErrors = {
      nome: !nome.trim(),
      email: !email.trim(),
      senha: !senha.trim(),
    };

    setErrors(newErrors);

    // Se algum campo estiver vazio, não envia o formulário
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Lógica para criar a conta
    alert(`Conta criada com sucesso! Bem-vindo(a), ${nome}!`);
    // Após criar a conta, redireciona para o login
    window.location.href = '/login';
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="signup-container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={errors.nome ? 'input-error' : ''}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'input-error' : ''}
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={errors.senha ? 'input-error' : ''}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-password"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <button type="submit">Criar Conta</button>
      </form>
    </div>
  );
};

export default SignupForm;
