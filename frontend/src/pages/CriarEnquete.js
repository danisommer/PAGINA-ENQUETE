import React, { useState } from "react";
import { Link } from "react-router-dom";
import { criarEnquete } from "../services/api.js"; 

function CriarEnquete() {
  const [titulo, setTitulo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [horaTermino, setHoraTermino] = useState("");
  const [opcoes, setOpcoes] = useState(["", "", ""]); // Inicia com 3 opções

  const handleAddOpcao = () => {
    setOpcoes([...opcoes, ""]); // Adiciona uma nova opção vazia
  };

  const handleRemoveOpcao = (index) => {
    if (opcoes.length > 3) {
      const newOpcoes = [...opcoes];
      newOpcoes.splice(index, 1); // Remove a opção no índice especificado
      setOpcoes(newOpcoes);
    } else {
      alert("É necessário manter no mínimo 3 opções!");
    }
  };

  const handleChangeOpcao = (index, value) => {
    const newOpcoes = [...opcoes];
    newOpcoes[index] = value;
    setOpcoes(newOpcoes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Verificar se o título não está vazio
    if (titulo.trim() === "") {
      alert("O título da enquete não pode estar vazio!");
      return;
    }
  
    // Verificar se a data de início é anterior à data de término
    const dataHoraInicio = new Date(`${dataInicio}T${horaInicio}`);
    const dataHoraTermino = new Date(`${dataTermino}T${horaTermino}`);
    if (dataHoraInicio >= dataHoraTermino) {
      alert("A data de início deve ser anterior à data de término!");
      return;
    }
  
    // Verificar se há pelo menos três opções definidas
    const opcoesDefinidas = opcoes.filter(opcao => opcao.trim() !== "");
    if (opcoesDefinidas.length < 3) {
      alert("É necessário definir pelo menos 3 opções para a enquete!");
      return;
    }
  
    try {
      // Chama a função da API para criar uma nova enquete
      const novaEnquete = await criarEnquete(titulo, dataHoraInicio.toISOString(), dataHoraTermino.toISOString());
      console.log("Nova enquete criada:", novaEnquete);
      // Aqui você pode adicionar mais lógica, como redirecionar para a página da enquete criada
    } catch (error) {
      console.error("Erro ao criar enquete:", error.message);
    }
  };

  return (
    <div>
      <Link to="/">
        <button>Voltar para a página inicial</button>
      </Link>
      <h1>Criar Nova Enquete</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </label>
        <br />
        <label>
          Data de Início:
          <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
          <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
        </label>
        <br />
        <label>
          Data de Término:
          <input type="date" value={dataTermino} onChange={(e) => setDataTermino(e.target.value)} />
          <input type="time" value={horaTermino} onChange={(e) => setHoraTermino(e.target.value)} />
        </label>
        <br />
        {opcoes.map((opcao, index) => (
          <div key={index}>
            <label>
              Opção {index + 1}:
              <input
                type="text"
                value={opcao}
                onChange={(e) => handleChangeOpcao(index, e.target.value)}
              />
            </label>
            {opcoes.length > 3 && ( // Mostra o botão de remover apenas se houver mais de 3 opções
              <button type="button" onClick={() => handleRemoveOpcao(index)}>
                Remover
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddOpcao}>
          Adicionar Opção
        </button>
        <br />
        <button type="submit">Criar Enquete</button>
      </form>
    </div>
  );
}

export default CriarEnquete;
