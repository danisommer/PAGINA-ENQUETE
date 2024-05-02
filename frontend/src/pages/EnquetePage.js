import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { listarOpcoesPorEnquete, votarEnquete } from "../services/api.js"; 

function EnquetePage() {
  const { id } = useParams(); // Obtendo o ID da enquete da URL
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
    async function fetchOpcoes() {
      try {
        const opcoesData = await listarOpcoesPorEnquete(id); // Obtendo as opções da enquete
        setOpcoes(opcoesData);
      } catch (error) {
        console.error("Erro ao carregar opções da enquete:", error.message);
      }
    }

    fetchOpcoes();
  }, [id]);

  const handleVotar = async (opcaoId) => {
    try {
      await votarEnquete(opcaoId); // Função para enviar voto para a API
      // Após votar com sucesso, atualizar opções (opcional)
      const opcoesData = await listarOpcoesPorEnquete(id);
      setOpcoes(opcoesData);
    } catch (error) {
      console.error("Erro ao votar na enquete:", error.message);
    }
  };

  return (
    <div>
      <Link to="/">
        <button>Voltar para a página inicial</button>
      </Link>
      <h1>Detalhes da Enquete</h1>
      <h2>Opções:</h2>
      {opcoes.length > 0 ? (
        <ul>
          {opcoes.map((opcao) => (
            <li key={opcao.id}>
              {opcao.descricao} - Votos: {opcao.votos}
              <button onClick={() => handleVotar(opcao.id)}>Votar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma opção disponível para votar.</p>
      )}
      {/* Aqui você pode adicionar formulários ou componentes para inserir, editar e remover enquetes, se necessário */}
    </div>
  );
}

export default EnquetePage;
