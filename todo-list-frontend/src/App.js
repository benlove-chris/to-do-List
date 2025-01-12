import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/loginForm/LoginForm';
import SignupForm from './components/signupForm/SignupForm';
import Home from './components/home/Home';
import './App.css'; // Certifique-se de importar o CSS

const App = () => {
  const [tema, setTema] = useState(localStorage.getItem('tema') || 'standard-theme');

  const mudarTema = (novoTema) => {
    setTema(novoTema);
    localStorage.setItem('tema', novoTema);
  };

  return (
    <Router>
      <div className={`app-container ${tema}`}>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<Home tema={tema} mudarTema={mudarTema} />} />
          {/* Redirecionamento caso não caia em nenhuma rota válida */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
