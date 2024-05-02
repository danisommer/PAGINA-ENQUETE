import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listarEnquetes } from "../services/api.js"; 

function HomePage() {
  const [enquetes, setEnquetes] = useState([]);

  useEffect(() => {
    async function fetchEnquetes() {
      try {
        const enquetesData = await listarEnquetes(); 
        setEnquetes(enquetesData);
      } catch (error) {
        console.error("Erro ao carregar enquetes:", error.response ? error.response.data : error.message);
      }
    }
  
    fetchEnquetes();
  }, []);

  // Função para categorizar as enquetes
  const categorizeEnquetes = (enquetes) => {
    const now = new Date();
    const nonStarted = [];
    const ongoing = [];
    const finished = [];

    enquetes.forEach((enquete) => {
      const startDate = new Date(enquete.data_inicio);
      const endDate = new Date(enquete.data_termino);

      if (now < startDate) {
        nonStarted.push(enquete);
      } else if (now >= startDate && now <= endDate) {
        ongoing.push(enquete);
      } else {
        finished.push(enquete);
      }
    });

    return { nonStarted, ongoing, finished };
  };

  const { nonStarted, ongoing, finished } = categorizeEnquetes(enquetes);

  return (
  <div>
    <h1>PollBox</h1>
    <Link to="/criar-enquete">
      <button>Criar Nova Enquete</button>
    </Link>
    <section>
      <h2>Não Iniciadas</h2>
      <ul>
        {nonStarted.map(enquete => (
          <li key={enquete.id}>
            <Link to={`/enquete/${enquete.id}`}>{enquete.titulo}</Link>
          </li>
        ))}
      </ul>
    </section>
    <section>
      <h2>Em Andamento</h2>
      <ul>
        {ongoing.map(enquete => (
          <li key={enquete.id}>
            <Link to={`/enquete/${enquete.id}`}>{enquete.titulo}</Link>
          </li>
        ))}
      </ul>
    </section>
    <section>
      <h2>Finalizadas</h2>
      <ul>
        {finished.map(enquete => (
          <li key={enquete.id}>
            <Link to={`/enquete/${enquete.id}`}>{enquete.titulo}</Link>
          </li>
        ))}
      </ul>
    </section>
  </div>
);
}

export default HomePage;
