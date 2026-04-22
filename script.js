let total = 0;

function adicionarTarefa() {
    let tarefaInput = document.getElementById('tarefa');
    let horasInput = document.getElementById('horas');
   
    let tarefa = tarefaInput.value;
    let horas = parseFloat(horasInput.value);

    if (!tarefa || !horas || horas <= 0) {
        alert("Por favor, preencha a tarefa e uma quantidade de horas válida!");
        return;
    }

    let valor = horas * 50; // Valor da sua hora

    let tabela = document.getElementById('corpo-tabela');
    let linha = tabela.insertRow();

    linha.innerHTML = `
        <td>${tarefa}</td>
        <td>${horas}h</td>
        <td>R$ ${valor.toFixed(2)}</td>
        <td><button class="btn-delete" onclick="remover(this, ${valor})">Excluir</button></td>
    `;

    total += valor;
    atualizarTotal();

    // Limpar campos
    tarefaInput.value = "";
    horasInput.value = "";
    tarefaInput.focus();
}

function remover(btn, valor) {
    let linha = btn.parentNode.parentNode;
    linha.remove();

    total -= valor;
    atualizarTotal();
}

function atualizarTotal() {
    document.querySelector('#total span').innerText =
        "R$ " + total.toFixed(2).replace('.', ',');
}