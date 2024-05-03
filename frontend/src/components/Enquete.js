import React, { useState, useEffect } from "react";
import { listarOpcoesPorEnquete, votarEnquete, excluirEnquete, obterEnquete, editarEnquete, editarOpcao } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import "../assets/css/styles.css";

function Enquete({ id }) {
  const [opcoes, setOpcoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [titulo, setTitulo] = useState(null);
  const [edicaoAtivada, setEdicaoAtivada] = useState(false); 
  const [edicaoTitulo, setEdicaoTitulo] = useState(false);
  const [edicaoDataInicio, setEdicaoDataInicio] = useState(false);
  const [edicaoDataFim, setEdicaoDataFim] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOpcoes() {
      try {
        const opcoesData = await listarOpcoesPorEnquete(id);
        setOpcoes(opcoesData);
        setErro(null);
      } catch (error) {
        console.error("Erro ao carregar opções da enquete:", error.message);
        setErro("Erro ao carregar opções da enquete. Tente novamente mais tarde.");
      }
    }

    async function fetchInfoEnquete() {
      try {
        const enqueteInfo = await obterEnquete(id);
        setDataInicio(new Date(enqueteInfo.data_inicio).toLocaleString());
        setDataFim(new Date(enqueteInfo.data_termino).toLocaleString());
        setTitulo(enqueteInfo.titulo);
      } catch (error) {
        console.error("Erro ao carregar informações da enquete:", error.message);
      }
    }

    fetchOpcoes();
    fetchInfoEnquete();
  }, [id]);

  const handleVotar = async (opcaoId) => {
    try {
      await votarEnquete(opcaoId);
      const opcoesData = await listarOpcoesPorEnquete(id);
      setOpcoes(opcoesData);
      setErro(null);
    } catch (error) {
      console.error("Erro ao votar na enquete:", error.message);
      setErro("Erro ao votar na enquete. Tente novamente mais tarde.");
    }
  };

  const handleExcluirEnquete = async () => {
    try {
      await excluirEnquete(id);
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir enquete:", error.message);
      setErro("Erro ao excluir enquete. Tente novamente mais tarde.");
    }
  };

  const handleEditarEnquete = async () => {
    try {
      const formatoDataSQL = (data) => {
        return data.toISOString().slice(0, 19).replace('T', ' ');
      };
  
      await editarEnquete(id, titulo, formatoDataSQL(new Date(dataInicio)), formatoDataSQL(new Date(dataFim)));
      navigate("/");

    } catch (error) {
      console.error("Erro ao editar enquete:", error.message);
      setErro("Erro ao editar enquete. Tente novamente mais tarde.");
    }
  };
  
  const handleEditarOpcao = async (opcaoId, descricao) => {
    try {
      await editarOpcao(opcaoId, descricao);
      const opcoesAtualizadas = opcoes.map(opcao => {
        if (opcao.id === opcaoId) {
          return { ...opcao, descricao: descricao };
        }
        return opcao;
      });
      setOpcoes(opcoesAtualizadas);
      setErro(null);
    } catch (error) {
      console.error("Erro ao editar opção:", error.message);
      setErro("Erro ao editar opção. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="enquete">
      {edicaoTitulo ? (
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      ) : (
        <h3>{titulo}</h3>
      )}
      {dataInicio && dataFim && (
        <p>
          {edicaoDataInicio ? (
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          ) : (
            `Data de início: ${dataInicio}`
          )}{" "}
          -{" "}
          {edicaoDataFim ? (
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          ) : (
            `Data de fim: ${dataFim}`
          )}
        </p>
      )}
      {erro ? (
        <p>{erro}</p>
      ) : opcoes.length > 0 ? (
        <ul>
          {opcoes.map((opcao) => (
            <li key={opcao.id}>
              {edicaoAtivada ? (
                <input
                  type="text"
                  value={opcao.descricao}
                  onChange={(e) => handleEditarOpcao(opcao.id, e.target.value)}
                />
              ) : (
                <span>{opcao.descricao}</span>
              )}
              {" - Votos: " + opcao.votos}
              {dataInicio &&
                dataFim &&
                new Date() >= new Date(dataInicio) &&
                new Date() <= new Date(dataFim) && (
                  <button onClick={() => handleVotar(opcao.id)}>Votar</button>
                )}
              {edicaoAtivada && (
                <button onClick={() => handleEditarOpcao(opcao.id, opcao.descricao)}>Salvar</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma opção disponível para votar.</p>
      )}
      {edicaoTitulo || edicaoDataInicio || edicaoDataFim || edicaoAtivada ? (
        <>
          <button onClick={handleEditarEnquete}>Salvar Alterações</button>
          <button onClick={() => {
            setEdicaoTitulo(false);
            setEdicaoDataInicio(false);
            setEdicaoDataFim(false);
            setEdicaoAtivada(false);
          }}>Cancelar Edição</button>
        </>
      ) : (
        <button onClick={() => {
          setEdicaoTitulo(true);
          setEdicaoDataInicio(true);
          setEdicaoDataFim(true);
          setEdicaoAtivada(true);
        }}>
          Editar Enquete
        </button>
      )}
      <button onClick={handleExcluirEnquete}>Excluir Enquete</button>
    </div>
  );
}

export default Enquete;
