import React, { useState, useEffect } from "react";
import { listarOpcoesPorEnquete, votarEnquete, excluirEnquete, obterEnquete } from "../services/api.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../assets/css/styles.css";

function Enquete({ id }) {
  const [opcoes, setOpcoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [titulo, setTitulo] = useState(null);
  
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

  return (
    <div className="enquete">
        <h3>{titulo}</h3>
      {dataInicio && dataFim && (
        <p>Data de início: {dataInicio} - Data de fim: {dataFim}</p>
      )}
      {erro ? (
        <p>{erro}</p>
      ) : opcoes.length > 0 ? (
        <ul>
          {opcoes.map((opcao) => (
            <li key={opcao.id}>
              {opcao.descricao} - Votos: {opcao.votos}
              {dataInicio && dataFim && new Date() >= new Date(dataInicio) && new Date() <= new Date(dataFim) && (
                <button onClick={() => handleVotar(opcao.id)}>Votar</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma opção disponível para votar.</p>
      )}
      <button onClick={handleExcluirEnquete} >Excluir Enquete</button>
      <Link to={`/editar-enquete/${id}`}>
        <button>Editar Enquete</button>
      </Link>
    </div>
  );
}

export default Enquete;
