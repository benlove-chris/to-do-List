import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTarefas, createTarefa } from "../../services/tarefaService";
import TarefaForm from "../tarefaForm/TarefaForm";
import TarefaList from "../tarefaList/TarefaList";
import "./Home.css";
import userImage from "../../user.png";

const Home = ({ tema, mudarTema }) => {
  const [tarefas, setTarefas] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
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

  const handleAddTarefa = async (descricao) => {
    if (!descricao.trim()) return;

    if (modoConvidado) {
      const novasTarefas = [...tarefas, { descricao, concluida: false }];
      setTarefas(novasTarefas);
      localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
    } else {
      try {
        const tarefaCriada = await createTarefa({ descricao }, token);
        setTarefas([...tarefas, tarefaCriada]);
      } catch (error) {
        console.error("Erro ao criar tarefa:", error);
      }
    }
  };

  const handleConcluirTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida;
    setTarefas(novasTarefas);
    if (modoConvidado) {
      localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
    }
  };

  const handleExcluirTarefa = (index) => {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);
    if (modoConvidado) {
      localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
    }
  };

  const handleEditarTarefa = (index, novaDescricao) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].descricao = novaDescricao; // Atualiza a descrição
    setTarefas(novasTarefas);

    if (modoConvidado) {
      localStorage.setItem("tarefas", JSON.stringify(novasTarefas)); // Atualiza no localStorage
    }
  };

  const handleLogin = () => {
    if (!token) {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
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
              {isAuthenticated ? ' Usuário' : ' Entrar'}
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
