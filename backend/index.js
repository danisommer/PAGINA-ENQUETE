const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'DZS2102',
  database: 'sistema_votacao',
  insecureAuth : true
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.json());

// Rotas para manipulação de enquetes

// Rota para criar uma nova enquete
app.post('/enquetes', (req, res) => {
    // Implementação da lógica para criar uma nova enquete
});

// Rota para editar uma enquete existente
app.put('/enquetes/:id', (req, res) => {
    // Implementação da lógica para editar uma enquete existente
});

// Rota para excluir uma enquete existente
app.delete('/enquetes/:id', (req, res) => {
    // Implementação da lógica para excluir uma enquete existente
});

// Rota para listar todas as enquetes
app.get('/enquetes', (req, res) => {
    // Implementação da lógica para listar todas as enquetes
});

// Rotas para manipulação de opções

// Rota para criar uma nova opção para uma enquete
app.post('/opcoes', (req, res) => {
    // Implementação da lógica para criar uma nova opção para uma enquete
});

// Rota para editar uma opção existente
app.put('/opcoes/:id', (req, res) => {
    // Implementação da lógica para editar uma opção existente
});

// Rota para excluir uma opção existente
app.delete('/opcoes/:id', (req, res) => {
    // Implementação da lógica para excluir uma opção existente
});

// Rota para listar todas as opções de uma enquete
app.get('/opcoes/:enqueteId', (req, res) => {
    // Implementação da lógica para listar todas as opções de uma enquete
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});