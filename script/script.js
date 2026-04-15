//Cria uma lista(array) vazia chamada "tarefas"
const tarefas = []; 

//Função de Colocar a tarefa na lista, Adicionando-a através do nome e das horas
function adicionarTarefa() {
    const campoNome = document.getElementById('nome');
    const campoHoras = document.getElementById('horas');

//Se estiver vazio(!) nos retorna uma mensagem para colocar o nome ou as horas
    if (!campoNome.value || !campoHoras.value) {
        return alert("Preencha o nome e as horas!");
}

//Cria um "objeto"(ficha) com: 
    const novaTarefa = {
        id: Date.now(), //ID: Transforma a data que escrevemos em ID
        nome: campoNome.value, //Nome: Pega o nome(valor) e coloca na ficha
        horas: parseFloat(campoHoras.value) //Horas: Converte para decimal através do "parseFloat"
};

    tarefas.push(novaTarefa); //Coloca essa ficha para dentro da nossa lista.

//limpa os campos para adicionarmos próximas tarefas
    campoNome.value = '';
    campoHoras.value = '';
        
    atualizarTela(); //Função para mostrar a novidade na tabela(Atualiza a tela mostrando a nova tarefa)
}

//Remove a Tarefa após clicar no botão
function removerTarefa(id) {
    const index = tarefas.findIndex(t => t.id === id); //Procura a posição da lista da tarefa que tem o ID que clicamos.
    tarefas.splice(index, 1); //Vai até essa posição e remove um item.
    atualizarTela(); //Atualiza a tela depois que removemos a tarefa
}

//Função que redesenha a tela
function atualizarTela() {
        //Pega o valor da hora que está lá no topo da página(Em decimal).
        const valorHora = parseFloat(document.getElementById('valorHora').value) || 0; 

        const corpoTabela = document.getElementById('lista');
        
        corpoTabela.innerHTML = ''; //Apaga tudo o que está na tabela agora para não duplicar os itens.

    tarefas.forEach(t => { //Para cada tarefa (t) na lista:
        const subtotal = t.horas * valorHora; //Calcula o subtotal.
        corpoTabela.innerHTML += //Adiciona a tarefa na lista com "+="(Significa mantenha o que já existe e adicione ao final).
        //Cria uma linha de tabela(tr) com as células(td) na horizontal(Por ser apenas uma linha) seguido do botão de apagar. 
        `<tr>
            <td>${t.nome}</td>
            <td>${t.horas}h</td>
            <td>R$ ${subtotal.toFixed(2)}</td>
            <td><button onclick="removerTarefa(${t.id})
            "style="color:red">Apagar</button></td>
        </tr>`;
    });
}

//Função que mostra o resultado parecido com uma nota fiscal:
function mostrarOrcamento() {
    const valorHora = parseFloat(document.getElementById('valorHora').value); //Valor da hora(Decimal).
    const areaResumo = document.getElementById('conteudo-orcamento'); //Onde o resumo(Nota fiscal) aparece.
    const imposto = parseFloat(document.getElementById('imposto').value) || 0; //Valor do imposto(Decimal).

    areaResumo.innerHTML = tarefas.map(t => { //Transforma cada tarefa em um parágrafo com o cálculo detalhado.
        const custo = t.horas * valorHora;
        return `<p>${t.nome}: ${t.horas}h x R$${valorHora} = <b>R$ ${custo.toFixed(2)}</b></p>`; //Retorna a parte do cálculo detalhado.
    }).join(''); //Junta tudo em um único blocão de texto para colocar na tela.

    const somaBruta = tarefas.reduce((acc, t) => acc + (t.horas * valorHora), 0); //O totalizador(.reduce) calcula o valor de cada tarefa da lista e joga dentro do acumulador(acc).
    const totalFinal = somaBruta * (1 + imposto / 100); //Fórmula do imposto

    document.getElementById('total-final').innerText = `Total Geral (com ${imposto}% imposto): R$ ${totalFinal.toFixed(2)}`; //Atualiza o texto do Total Geral com o resultado final formatado.
    document.getElementById('orcamento').style.display = 'block'; //Faz o quadro de resumo(Que estava escondido) aparecer para o usuário.
}