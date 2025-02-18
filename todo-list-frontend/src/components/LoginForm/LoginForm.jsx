import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { login } from './../../services/tarefaService'; // Importe a função de login
import celularImg from './images/celular.jpg'; // Importa a imagem
import icone from './images/logo.png'
import './LoginForm.css'; // Importa o arquivo CSS

const LoginForm = () => {
  const [userNameOrEmail, setUsernameOrEmail] = useState('lucas@teste.com');
  const [password, setPassword] = useState('cetelbras');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(userNameOrEmail, password);
      localStorage.setItem('Bearer', token);
      //localStorage.setItem('userName', userame);
      window.location.href = '/'; // Redireciona para a página de tarefas
    } catch (error) {
      alert('Credenciais inválidas. Verifique suas informações de login.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          {/* Coluna da Imagem */}
          <MDBCol md='6' className="d-flex align-items-stretch">
            <MDBCardImage
              src={celularImg}
              alt="login form"
              className='rounded-start w-100 login-image'
            />
          </MDBCol>

          {/* Coluna do Formulário */}
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
              <img
                  src={icone}
                  alt="Ícone"
                  style={{ width: '50px', height: '50px', marginRight: '10px' }} // Ajuste o tamanho conforme necessário
                />
                <span className="h1 fw-bold mb-0">TdL</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Fazer login com sua conta
              </h5>

              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Usuario'
                  id='usuario'
                  type='text'
                  value={userNameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Senha'
                  id='senha'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className='d-flex justify-content-center mb-4'>
                  <MDBCheckbox
                    name='showPassword'
                    id='showPassword'
                    label='Mostrar senha'
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                </div>

                <MDBBtn className='w-100 mb-4' size='md' color='dark' type='submit'>
                  Entrar
                </MDBBtn>
              </form>

              <a className="small text-muted" href="#!">Esqueci minha senha</a>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
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
