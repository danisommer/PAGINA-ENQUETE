import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Enquete from "../components/Enquete";
import "../assets/css/styles.css";

function EnquetePage() {
  const { id } = useParams(); 
  
const navigate = useNavigate();
  const handleVoltar = () => {
    navigate("/");
  };     

  return (
    <div>
       <button onClick={handleVoltar}>Voltar para a página inicial</button>
       <Enquete id={id} />
    </div>
  );
}

export default EnquetePage;
