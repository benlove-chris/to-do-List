import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTarefas, createTarefa, updateTarefa, deleteTarefa } from "../../services/tarefaService"; // Importe updateTarefa
import TarefaList from "../tarefaList/TarefaList";
import TarefaForm from "../tarefaForm/TarefaForm";
import "./Home.css";
import userImage from "../../user.png";

const Home = ({ tema, mudarTema }) => {
  const [tarefas, setTarefas] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("Bearer");
  const userName = localStorage.getItem("userName");
  const [modoConvidado, setModoConvidado] = useState(!token);

  useEffect(() => {
    if (token) {
      const fetchTarefas = async () => {
        try {
          const tarefasAPI = await getTarefas(token);
          setTarefas(tarefasAPI);
        } catch (error) {
          console.error("Erro ao buscar tarefas:", error);
        }
      };
      fetchTarefas();
    } else {
      const tarefasLocal = JSON.parse(localStorage.getItem("tarefas") || "[]");
      setTarefas(tarefasLocal);
    }
  }, [token]);

  const handleAddTarefa = async (titulo, status = false) => {
    if (!titulo.trim() || !titulo.trim()) return;

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

  const handleConcluirTarefa = async (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida;
    setTarefas(novasTarefas);

    if (modoConvidado) {
      localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
    } else {
      try {
        const tarefaAtualizada = await updateTarefa(novasTarefas[index].id, novasTarefas[index], token);
        novasTarefas[index] = tarefaAtualizada;
        setTarefas(novasTarefas);
      } catch (error) {
        console.error("Erro ao atualizar status da tarefa:", error);
      }
    }
  };

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

  const handleEditarTarefa = async (index, novoTitulo) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].titulo = novoTitulo; // Atualiza o titulo
    setTarefas(novasTarefas);

    if (modoConvidado) {
      localStorage.setItem("tarefas", JSON.stringify(novasTarefas)); // Atualiza no localStorage
    } else {
      try {
        const tarefaAtualizada = await updateTarefa(novasTarefas[index].id, novasTarefas[index], token); // Atualiza no backend
        novasTarefas[index] = tarefaAtualizada;
        setTarefas(novasTarefas);
      } catch (error) {
        console.error("Erro ao editar tarefa:", error);
      }
    }
  };

  const handleLogin = () => {
    if (!token) {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Bearer");
    setModoConvidado(true);
    navigate("/");
  };

  const isAuthenticated = !!token;  // Verifica se o usuário está autenticado

  return (
    <div className={`home-container ${tema}`}>
      <div id="header">
          <div className="flexrow-container">
          <div className="left-section">
            <button className="login-button" onClick={isAuthenticated ? handleLogout : handleLogin}>
              <i className={`fas ${isAuthenticated ? 'fa-user' : 'fa-sign-in-alt'}`}></i>
              {isAuthenticated ? ` ${userName}` : ' Entrar'}
            </button>
          </div>
        
          <div
            className="standard-theme theme-selector"
            onClick={() => mudarTema("standard")}
          ></div>
          <div
            className="light-theme theme-selector"
            onClick={() => mudarTema("light")}
          ></div>
          <div
            className="darker-theme theme-selector"
            onClick={() => mudarTema("darker")}
          ></div>
        </div>
        <h1 id="title" className={tema === "darker" ? "darker-title" : ""}>
          Let's start.
          <div id="border"></div>
        </h1>
      </div>
      <div id="tarefaConteudo">
        <TarefaForm onAddTarefa={handleAddTarefa} />
        <TarefaList
          tarefas={tarefas}
          onConcluir={handleConcluirTarefa}
          onExcluir={handleExcluirTarefa}
          onEditar={handleEditarTarefa}
        />
      </div>
    </div>
  );
};

export default Home;
