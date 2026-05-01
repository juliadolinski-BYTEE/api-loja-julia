const express = require('express');
const router = express.Router();
const fs = require('fs');

const caminho = './data/produtos.json';

// ler dados
function lerDados() {
    return JSON.parse(fs.readFileSync(caminho));
}

// salvar dados
function salvarDados(dados) {
    fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
}

// GET todos
router.get('/', (req, res) => {
    res.json(lerDados());
});

// POST criar
router.post('/', (req, res) => {
    const dados = lerDados();

    if (!req.body.nome) {
        return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    const novo = {
        id: Date.now(),
        nome: req.body.nome
    };

    dados.push(novo);
    salvarDados(dados);

    res.status(201).json(novo);
});

// PUT atualizar
router.put('/:id', (req, res) => {
    const dados = lerDados();
    const index = dados.findIndex(p => p.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ erro: "Não encontrado" });
    }

    if (!req.body.nome) {
        return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    dados[index].nome = req.body.nome;

    salvarDados(dados);
    res.json(dados[index]);
});

// DELETE
router.delete('/:id', (req, res) => {
    let dados = lerDados();
    const novo = dados.filter(p => p.id != req.params.id);

    if (dados.length === novo.length) {
        return res.status(404).json({ erro: "Não encontrado" });
    }

    salvarDados(novo);
    res.json({ mensagem: "Removido" });
});

module.exports = router;