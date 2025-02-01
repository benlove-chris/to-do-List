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
}
from 'mdb-react-ui-kit';

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
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={errors.nome ? 'input-error' : ''}
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
