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
import celularImg from './images/celular.jpg'; // Importa a imagem
import icone from './images/logo.png'
import './LoginForm.css'; // Importa o arquivo CSS

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de validação de login
    if (email === 'usuario@teste.com' && senha === 'senha123') {
      localStorage.setItem('Bearer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5NzM0MzA4LCJpYXQiOjE3Mzk3MzA3MDgsImp0aSI6ImUxZjk3ZjM5OWIwMzQ1ZmI5OWZjMjU2YmYyY2U3MGZlIiwidXNlcl9pZCI6M30.NAAjpFwXIPkWMXN5u-CyVsUmm3c4uqNctJSIoS5j9tM' );
      window.location.href = '/'; // Redireciona para a página de tarefas
    } else {
      alert('Credenciais inválidas. Você será redirecionado para criar uma conta.');
      window.location.href = '/signup'; // Caminho para a página de criação de conta
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
                  label='Email'
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Senha'
                  id='senha'
                  type={showPassword ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
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