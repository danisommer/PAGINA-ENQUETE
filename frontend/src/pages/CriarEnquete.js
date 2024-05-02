import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarEnquete, criarOpcao } from "../services/api.js"; 

function CriarEnquete() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [horaTermino, setHoraTermino] = useState("");
  const [opcoes, setOpcoes] = useState(["", "", ""]);
  const [erro, setErro] = useState(""); 

  const handleAddOpcao = () => {
    setOpcoes([...opcoes, ""]); 
  };

  const handleRemoveOpcao = (index) => {
    const newOpcoes = [...opcoes];
    newOpcoes.splice(index, 1);
    setOpcoes(newOpcoes);
  };

  const handleChangeOpcao = (index, value) => {
    const newOpcoes = [...opcoes];
    newOpcoes[index] = value;
    setOpcoes(newOpcoes);
  };

  const handleVoltar = () => {
    navigate("/");
  };  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar se o título não está vazio
    if (titulo.trim() === "") {
      setErro("O título da enquete não pode estar vazio!");
      return;
    }
  
    // Verificar se a data de início é anterior à data de término
    const dataHoraInicio = new Date(`${dataInicio}T${horaInicio}`);
    const dataHoraTermino = new Date(`${dataTermino}T${horaTermino}`);
    if (dataHoraInicio >= dataHoraTermino) {
      setErro("A data de início deve ser anterior à data de término!");
      return;
    }
  
    // Verificar se há pelo menos três opções definidas
    const opcoesDefinidas = opcoes.filter(opcao => opcao.trim() !== "");
    if (opcoesDefinidas.length < 3) {
      setErro("É necessário definir pelo menos 3 opções para a enquete!");
      return;
    }
  
    try {
      const dataInicioString = `${dataInicio} ${horaInicio}`;
      const dataTerminoString = `${dataTermino} ${horaTermino}`;
    
      // Criar a nova enquete
      const novaEnquete = await criarEnquete(titulo, dataInicioString, dataTerminoString);
      console.log("Nova enquete criada:", novaEnquete);
    
      // Submeter as opções
      await Promise.all(opcoes.map(async (opcao) => {
        if (opcao.trim() !== "") {
          console.log(novaEnquete.id);
          await criarOpcao(novaEnquete.id, opcao); // Assumindo que o retorno de criarEnquete contém o ID da nova enquete
        }
      }));
    
      navigate(`/`);
    
    } catch (error) {
      console.error("Erro ao criar enquete:", error.message);
    }
    
  };

  // Verifica se o formulário é inválido para desativar o botão de criar enquete
  const formularioInvalido = titulo.trim() === "" || dataInicio === "" || horaInicio === "" || dataTermino === "" || horaTermino === "" || opcoes.filter(opcao => opcao.trim() !== "").length < 3;

  return (
    <div>
      <button onClick={handleVoltar}>Voltar para a página inicial</button>
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
                <button
                    type="button"
                    onClick={() => handleRemoveOpcao(index)}
                    disabled={opcoes.length <= 3}
                    className={opcoes.length > 3 ? "enabled-button" : ""}
                >
                    Remover
                </button>
                Opção {index + 1}:
                <input
                    type="text"
                    value={opcao}
                    onChange={(e) => handleChangeOpcao(index, e.target.value)}
                />
                </label>
            </div>
            ))}
        <button type="button" onClick={handleAddOpcao}>
          Adicionar Opção
        </button>
        <br />
        <button type="submit" disabled={formularioInvalido} >Criar Enquete</button>
        {erro && <p style={{color: 'red'}}>{erro}</p>}
      </form>
    </div>
  );
}

export default CriarEnquete;
