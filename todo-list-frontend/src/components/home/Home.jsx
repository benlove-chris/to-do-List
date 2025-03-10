import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTarefas, createTarefa, updateTarefa, deleteTarefa } from "../../services/tarefaService";
import TarefaList from "../tarefaList/TarefaList";
import TarefaForm from "../tarefaForm/TarefaForm";
import Modal from "react-modal";
import { FaArrowLeft } from "react-icons/fa"; // Ícone de seta
import "./Home.css";

Modal.setAppElement("#root"); // Para acessibilidade

const Home = ({ tema, mudarTema }) => {
  const navigate = useNavigate();

  // Estados principais
  const [tarefas, setTarefas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContaIsOpen, setModalContaIsOpen] = useState(false);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);

  // Verificação de usuário autenticado
  const token = localStorage.getItem("Bearer");
  const userName = localStorage.getItem("userName");
  const [modoConvidado, setModoConvidado] = useState(!token);

  // Carregar tarefas do usuário
  useEffect(() => {
    const fetchTarefas = async () => {
      if (token) {
        try {
          const tarefasAPI = await getTarefas(token);
          setTarefas(tarefasAPI);
        } catch (error) {
          console.error("Erro ao buscar tarefas:", error);
          handleLogout(); //deslogar usuario se não tiver o token.
        }
      } else {
        const tarefasLocal = JSON.parse(localStorage.getItem("tarefas") || "[]");
        setTarefas(tarefasLocal);
      }
    };
    fetchTarefas();
  }, [token]);

  // Adicionar tarefa
  const handleAddTarefa = async (titulo, status = false) => {
    if (!titulo.trim()) return;

    if (modoConvidado) {
      const novasTarefas = [...tarefas, { titulo, status }];
      setTarefas(novasTarefas);
      localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
    } else {
      try {
        const tarefaCriada = await createTarefa({ titulo, status }, token);
        setTarefas([...tarefas, tarefaCriada]);
      } catch (error) {
        console.error("Erro ao criar tarefa:", error);
      }
    }
  };

  // Alterar status da tarefa (concluir ou não)
  const handleConcluirTarefa = async (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida;
    setTarefas(novasTarefas);

    if (!modoConvidado) {
      try {
        await updateTarefa(novasTarefas[index].id, novasTarefas[index], token);
      } catch (error) {
        console.error("Erro ao atualizar status da tarefa:", error);
      }
    } else {
      localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
    }
  };

  // Excluir tarefa
  const handleExcluirTarefa = async (index) => {
    const novasTarefas = [...tarefas];

    if (modoConvidado) {
      novasTarefas.splice(index, 1);
      setTarefas(novasTarefas);
      localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
    } else {
      try {
        await deleteTarefa(novasTarefas[index].id, token);
        novasTarefas.splice(index, 1);
        setTarefas(novasTarefas);
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
      }
    }
  };

  // Editar tarefa
  const handleEditarTarefa = async (index, novoTitulo) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].titulo = novoTitulo;
    setTarefas(novasTarefas);

    if (!modoConvidado) {
      try {
        await updateTarefa(novasTarefas[index].id, novasTarefas[index], token);
      } catch (error) {
        console.error("Erro ao editar tarefa:", error);
      }
    }
  };

  // Login / Logout
  const handleLogin = () => {
    if (!token) navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("Bearer");
    localStorage.removeItem("userName");
    localStorage.setItem('userName', "My friend");
    setModoConvidado(true);
    closeModal();
    navigate("/");
  };

  // Controle de modais
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openModalConta = () => setModalContaIsOpen(true);
  const closeModalConta = () => setModalContaIsOpen(false);
  const openModalUpdate = () => setModalUpdateIsOpen(true);
  const closeModalUpdate = () => setModalUpdateIsOpen(false);

  
  const isAuthenticated = !!token;

  return (
    <div className={`home-container ${tema}`}>
      {/* Header */}
      <header id="header">
        <div className="flexrow-container">
          <div className="left-section">
            <button className="login-button" onClick={isAuthenticated ? openModal : handleLogin}>
              <i className={`fas ${isAuthenticated ? "fa-user" : "fa-sign-in-alt"}`}></i>
              {isAuthenticated ? ` ${userName}` : " Entrar"}
            </button>
          </div>

          {/* Seletor de temas */}
          {["standard", "light", "darker"].map((theme) => (
            <div key={theme} className={`${theme}-theme theme-selector`} onClick={() => mudarTema(theme)} />
          ))}
        </div>
        <h1 id="title">Welcome, {userName}. <br /> Let's start.</h1>
      </header>

      {/* Lista de Tarefas */}
      <main id="tarefaConteudo">
        <TarefaForm onAddTarefa={handleAddTarefa} />
        <TarefaList tarefas={tarefas} onConcluir={handleConcluirTarefa} onExcluir={handleExcluirTarefa} onEditar={handleEditarTarefa} />
      </main>

      {/* Modal Principal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Opções do Usuário" className="modal_x" overlayClassName="modal-overlay">
        <button type="button" title="Conta" onClick={() => { openModalConta(); closeModal(); }}>
          <div className="userConta">
            <p className="userNameModal">{userName}</p>
            <p className="userEmailModal">anelusbenlove@gmail.com</p>
            </div>
        </button>
        
        <hr className="modal-divider" />
        <br />
        <button onClick={handleLogout}>Sair</button>
      </Modal>

      {/* Modal Conta */}
      <Modal isOpen={modalContaIsOpen} onRequestClose={closeModalConta} contentLabel="Conta" className="modal_x" overlayClassName="modal-overlay" >
        <div className="divConta">
          <button className="back-button" onClick={closeModalConta}>
            <FaArrowLeft size={20} />
          </button>
          <h2>Conta</h2>
        </div>
        <button className="update-name-button" onClick={()=>{closeModalConta(); openModalUpdate(); }}>
          <span>Nome</span> 
          <span className="name-label">{userName}</span>

        </button>
        

        <hr className="modal-divider" />

        <div className="del-section">
          <h3 className="del-title">Excluir minha conta</h3>
          <p className="del-text">
            Isso excluirá permanentemente sua conta e todas as suas tarefas.
            <button type="button" className="delete-account-button">Excluir conta</button>
          </p>
        </div>
      </Modal>

      
      {/* Modal Atualizar */}
      <Modal isOpen={modalUpdateIsOpen} onRequestClose={closeModalUpdate} contentLabel="Atualizar" className="modal_x" overlayClassName="modal-overlay" >
        <div className="divUpdateUser">
          <button className="back-button" onClick={closeModalUpdate}>
            <FaArrowLeft size={20} />
          </button>
          <h2>Nome</h2>
        </div>
        <button className="update-name-button">
          <span>Nome</span> 
          <span className="name-label">{userName}</span>

        </button>
        
        <hr className="modal-divider" />
        <br />
        {/*<button onClick={handleUpdateUser}>Atualizar</button>*/}
  

      </Modal>
    </div>
  );
};

export default Home;
