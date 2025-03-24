import React, { useState } from 'react';
import './SignupForm.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { signup } from './../../services/tarefaService';

const SignupForm = () => {
  const [username, setUsername] = useState('zezin');
  const [email, setEmail] = useState('zezin@apostelo.vac');
  const [password, setPassword] = useState('jesussave');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: false, email: false, password: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: !username.trim(),
      email: !email.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      await signup(username, email, password);
      alert(`Conta criada com sucesso! Bem-vindo(a), ${username}!`);
      window.location.href = '/login';
    } catch (error) {
      alert('Erro ao criar conta. Por favor, tente novamente.');
      console.error('Erro ao criar conta:', error);
    }
  };

  return (
    <MDBContainer fluid className='signup-container'>

      <MDBRow className="align-items-center justify-content-center">
        <MDBCol md='6' className='text-white text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="display-4 fw-bold">Criar Conta</h1>
          <p>Registre-se agora e gerencie suas tarefas com facilidade, onde quer que esteja!</p>
        </MDBCol>

        <MDBCol md='5'>
          <MDBCard className='bg-light shadow p-4'>
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <MDBInput 
                  wrapperClass='mb-3' 
                  label='Nome' 
                  id='username' 
                  type='text' 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  className={`input-field ${errors.username ? 'input-error' : ''}`}
                />

                <MDBInput 
                  wrapperClass='mb-3' 
                  label='Email' 
                  id='email' 
                  type='email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                />

                <MDBInput
                  wrapperClass='mb-3'
                  label='Senha'
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`input-field ${errors.password ? 'input-error' : ''}`}
                />

                <div className='d-flex justify-content-center mb-3'>
                  <MDBCheckbox
                    name='showPassword'
                    id='showPassword'
                    label='Mostrar senha'
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                </div>

                <MDBBtn className='w-100 btn-custom' size='md' type='submit'>Criar Conta</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
};

export default SignupForm;
