import axios from 'axios';

const baseURL = 'http://localhost:3000'; // URL base do seu backend

const api = axios.create({
  baseURL,
});

// Função para criar uma nova enquete
export const criarEnquete = async (titulo, data_inicio, data_termino) => {
    try {
      const response = await api.post('/enquetes', { titulo, data_inicio, data_termino });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
  
  // Função para editar uma enquete existente
  export const editarEnquete = async (id, titulo, data_inicio, data_termino) => {
    try {
      const response = await api.put(`/enquetes/${id}`, { titulo, data_inicio, data_termino,});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

export const excluirEnquete = async (id) => {
    try {
      const response = await api.delete(`/enquetes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
  
  // Função para listar todas as enquetes
  export const listarEnquetes = async () => {
    try {
      const response = await api.get('/enquetes');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  // Função para votar em uma opção
  export const votarEnquete = async (opcaoId) => {
    try {
      const response = await api.post('/votar', { opcaoId });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

// Função para criar uma nova opção para uma enquete
export const criarOpcao = async (enquete_id, descricao) => {
    try {
      const response = await api.post('/opcoes', { enquete_id, descricao });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
  
  // Função para editar uma opção existente
  export const editarOpcao = async (id, descricao) => {
    try {
      const response = await api.put(`/opcoes/${id}`, { descricao });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
  
  // Função para excluir uma opção existente
  export const excluirOpcao = async (id) => {
    try {
      const response = await api.delete(`/opcoes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
  
  // Função para listar todas as opções de uma enquete
  export const listarOpcoesPorEnquete = async (enqueteId) => {
    try {
      const response = await api.get(`/opcoes/${enqueteId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
  
export default api;