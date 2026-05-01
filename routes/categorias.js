const express = require('express');
const router = express.Router();
const fs = require('fs');

const caminho = './data/categorias.json';

function lerDados() {
    return JSON.parse(fs.readFileSync(caminho));
}

function salvarDados(dados) {
    fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
}

// GET
router.get('/', (req, res) => {
    res.json(lerDados());
});

// POST
router.post('/', (req, res) => {
    const dados = lerDados();

    if (!req.body.nome) {
        return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    const nova = {
        id: Date.now(),
        nome: req.body.nome
    };

    dados.push(nova);
    salvarDados(dados);

    res.status(201).json(nova);
});

module.exports = router;