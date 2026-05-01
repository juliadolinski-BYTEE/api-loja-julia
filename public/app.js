async function carregar() {
    const res = await fetch('/produtos');
    const dados = await res.json();

    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    dados.forEach(p => {
    lista.innerHTML += `
        <li>
            ${p.nome}
            <button onclick="editar(${p.id})">Editar</button>
            <button onclick="deletar(${p.id})">X</button>
        </li>
    `;
});
}

async function criar() {
    const nome = document.getElementById('nome').value;

    await fetch('/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
    });

    carregar();
}

async function deletar(id) {
    await fetch('/produtos/' + id, {
        method: 'DELETE'
    });

    carregar();
}

carregar();

async function editar(id) {
    const novoNome = prompt("Novo nome:");

    if (!novoNome) return;

    await fetch('/produtos/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoNome })
    });

    carregar();
}