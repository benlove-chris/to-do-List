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
}
from 'mdb-react-ui-kit';

import './LoginForm.css'; // Importa o arquivo CSS

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ nome: false, email: false, senha: false });

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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };



  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0 "  >TdL</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Fazer login com sua conta</h5>
              <form onSubmit={handleSubmit}>
                
                                <MDBInput wrapperClass='mb-4' 
                                    label='Email' 
                                    id='email' 
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={errors.email ? 'input-error' : ''}
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Senha'
                                    id='senha'
                                    type={showPassword ? 'text' : 'password'}
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className={errors.senha ? 'is-invalid' : ''}
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

                                <MDBBtn className='w-100 mb-4' size='md' color='dark' type='submit'>Criar Conta</MDBBtn>
              </form>
          
              <a className="small text-muted" href="#!">Esqueci minha senha</a>
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Não possui uma conta? <a href="/signup" style={{color: '#393f81'}}>Criar conta aqui</a></p>


            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default LoginForm;