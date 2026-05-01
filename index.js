const express = require('express');
const app = express();

const produtosRoutes = require('./routes/produtos');
const categoriasRoutes = require('./routes/categorias');

app.use(express.json());
app.use(express.static('public'));

app.use('/produtos', produtosRoutes);
app.use('/categorias', categoriasRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});