import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { login } from './../../services/tarefaService';
import listImg from './images/list.png';
import './LoginForm.css';

const LoginForm = () => {
  const [userNameOrEmail, setUsernameOrEmail] = useState('Lucas');
  const [password, setPassword] = useState('cetelbras');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(userNameOrEmail, password);
      const token = response.token;
      const userName = response.user_name;

      localStorage.setItem('Bearer', token);
      localStorage.setItem('userName', userName);
      window.location.href = '/';
    } catch (error) {
      alert('Credenciais inválidas. Verifique suas informações de login.');
    }
  };

  return (
    <MDBContainer className="login-container">
      <MDBCard className="login-card ">
        <MDBRow className='g-0 '>
          {/* Coluna da Imagem */}
          <MDBCol md='6'>
            <MDBCardImage
              src={listImg}
              alt="login form"
              className='login-image'
            />
          </MDBCol>

          {/* Coluna do Formulário */}
          <MDBCol md='6' className="login-column">
            <MDBCardBody className='d-flex flex-column justify-content-center'>
              <h3 className="text-center text-primary  font-monospace">To-Do List</h3>
              <h5 className="text-center text-primary font-monospace mb-4">Fazer login com sua conta</h5>
              
              <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center ">
                <MDBInput
                  
                  wrapperClass='mb-3'
                  label='Usuário'
                  id='usuario'
                  type='text'
                  value={userNameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  
                />
                <MDBInput
                  label='Senha'
                  id='senha'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  
                  wrapperClass='mb-3 password-input'
                  
                />
                <MDBCheckbox
                  name='showPassword'
                  id='showPassword'
                  label={<span className="custom-label text-primary">Mostrar senha</span>}
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mb-3 "
                />
                <MDBBtn className='w-100' size='md' color='transparent' type='submit'>
                  Entrar
                </MDBBtn>
              </form>

              <a className="small text-muted text-center mt-3" href="#!">Esqueci minha senha</a>
              <p className="text-center mt-2" style={{ color: '#393f81' }}>
                Não possui uma conta? <a href="/signup" style={{ color: '#393f81' }}>Criar conta aqui</a>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default LoginForm;
