const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors')

//Middlewares
app.use(cors());
app.use(express.json());

//Conectando com Banco de Dados
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'mysqldb00',
    database: 'employeeSystem',
});


//CREATE
app.post("/create", (req, res) => {
    const nome = req.body.nome;
    const idade = req.body.idade;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const salario = req.body.salario;
  

    db.query(
      "INSERT INTO employees (nome, idade, pais, cargo, salario) VALUES (?,?,?,?,?)",
      [nome, idade, pais, cargo, salario],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Valores inseridos com sucesso!");
        }
      }
    );
  });
  
  //READ
  app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
  //UPDATE
  app.put("/update", (req, res) => {
    const id = req.body.id;
    const salario = req.body.salario;
    db.query(
      "UPDATE employees SET salario = ? WHERE id = ?",
      [salario, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });  


app.listen(3001, () => {
    console.log('O Servidor está em funcionamento na porta 3001!')
})