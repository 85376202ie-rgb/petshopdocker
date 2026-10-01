const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const banco = mysql.createPool({
    host: "banco",
    user: "root",
    password: "123456",
    database: "petshop"
});

app.get("/agendamentos", (req, res) => {
    banco.query("SELECT * FROM agendamentos ORDER BY data_hora", (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao buscar agendamentos" });
        }
        res.json(resultados);
    });
});

app.post("/agendamentos", (req, res) => {
    const { pet, tutor, servico, data_hora } = req.body;

    banco.query(
        "INSERT INTO agendamentos (pet, tutor, servico, data_hora) VALUES (?, ?, ?, ?)",
        [pet, tutor, servico, data_hora || null],
        (erro) => {
            if (erro) {
                return res.status(500).json({ erro: "Erro ao salvar agendamento" });
            }
            res.json({ mensagem: "Agendamento salvo" });
        }
    );
});

app.listen(3000, () => {
    console.log("Backend do Pet Shop rodando na porta 3000");
});
