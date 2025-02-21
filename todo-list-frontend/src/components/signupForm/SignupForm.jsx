import React, { useState } from 'react';
import './SignupForm.css'; // Importa o arquivo CSS
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
} from 'mdb-react-ui-kit';
import { signup } from './../../services/tarefaService'; // Importe a função de signup

const SignupForm = () => {
  const [username, setUsername] = useState('zezin');
  const [email, setEmail] = useState('zezin@apostelo.vac');
  const [password, setPassword] = useState('jesussave');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: false, email: false, password: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se algum campo está vazio
    const newErrors = {
      username: !username.trim(),
      email: !email.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);

    // Se algum campo estiver vazio, não envia o formulário
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const response = await signup(username, email, password);
      alert(`Conta criada com sucesso! Bem-vindo(a), ${username}!`);
      window.location.href = '/login'; // Redireciona para a página de login
    } catch (error) {
      alert('Erro ao criar conta. Por favor, tente novamente.');
      console.error('Erro ao criar conta:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            Criar conta
          </h1>

          <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
            Registre-se agora e gerencie suas tarefas com facilidade, onde quer que você esteja!
          </p>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' 
                    label='Nome'
                    id='form2' 
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={errors.username ? 'input-error' : ''}
                />
                  

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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? 'is-invalid' : ''}
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

                <MDBBtn className='w-100 mb-4' size='md' type='submit'>Criar Conta</MDBBtn>
              </form>

              
            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
};

export default SignupForm;
