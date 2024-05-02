const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

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
  const { titulo, data_inicio, data_termino } = req.body;
  const query = 'INSERT INTO enquetes (titulo, data_inicio, data_termino) VALUES (?, ?, ?)';
  connection.query(query, [titulo, data_inicio, data_termino], (err, result) => {
      if (err) throw err;
      res.status(201).send('Enquete criada com sucesso');
  });
});

// Rota para editar uma enquete existente
app.put('/enquetes/:id', (req, res) => {
  const { titulo, data_inicio, data_termino } = req.body;
  const id = req.params.id;
  const query = 'UPDATE enquetes SET titulo = ?, data_inicio = ?, data_termino = ? WHERE id = ?';
  connection.query(query, [titulo, data_inicio, data_termino, id], (err, result) => {
      if (err) throw err;
      res.send('Enquete atualizada com sucesso');
  });
});

// Rota para excluir uma enquete existente
app.delete('/enquetes/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM enquetes WHERE id = ?';
  connection.query(query, [id], (err, result) => {
      if (err) throw err;
      res.send('Enquete excluída com sucesso');
  });
});

// Rota para listar todas as enquetes
app.get('/enquetes', (req, res) => {
  const query = 'SELECT * FROM enquetes';
  connection.query(query, (err, result) => {
      if (err) throw err;
      res.json(result);
  });
});

// Rotas para manipulação de opções

app.post('/votar', (req, res) => {
  const { opcaoId } = req.body;
  const query = 'UPDATE opcoes SET votos = votos + 1 WHERE id = ?';
  connection.query(query, [opcaoId], (err, result) => {
      if (err) throw err;
      res.send('Voto registrado com sucesso');
  });
});

// Rota para criar uma nova opção para uma enquete
app.post('/opcoes', (req, res) => {
  const { enquete_id, descricao } = req.body;
  const query = 'INSERT INTO opcoes (enquete_id, descricao) VALUES (?, ?)';
  connection.query(query, [enquete_id, descricao], (err, result) => {
      if (err) throw err;
      res.status(201).send('Opção criada com sucesso');
  });
});

// Rota para editar uma opção existente
app.put('/opcoes/:id', (req, res) => {
  const { descricao } = req.body;
  const id = req.params.id;
  const query = 'UPDATE opcoes SET descricao = ? WHERE id = ?';
  connection.query(query, [descricao, id], (err, result) => {
      if (err) throw err;
      res.send('Opção atualizada com sucesso');
  });
});

// Rota para excluir uma opção existente
app.delete('/opcoes/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM opcoes WHERE id = ?';
  connection.query(query, [id], (err, result) => {
      if (err) throw err;
      res.send('Opção excluída com sucesso');
  });
});

// Rota para listar todas as opções de uma enquete
app.get('/opcoes/:enqueteId', (req, res) => {
  const enqueteId = req.params.enqueteId;
  const query = 'SELECT * FROM opcoes WHERE enquete_id = ?';
  connection.query(query, [enqueteId], (err, result) => {
      if (err) throw err;
      res.json(result);
  });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
