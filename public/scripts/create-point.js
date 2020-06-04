// função para listar os estados puxando via api
function listarEstados() {
    const estadoSelecionado = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
     .then( (resposta) => { return resposta.json() } )
     .then( (estados) => {
         for( estado of estados ){
             // usar acentuação "CRAZE" para poder usar formatar dados dentro de tags html
            estadoSelecionado.innerHTML += `<option value="${estado.id}">${estado.sigla} - ${estado.nome}</option>`
         }
     } )
}

//chamando a função de listar estados
listarEstados()

// função para listar as cidades do estado selecionado, também via api
function listarCidades( evento ){
    const cidadeSelecionada = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
 
    const idEstadoSelecionado = evento.target.value
    const indexOfSelectedState = evento.target.selectedIndex
    stateInput.value = evento.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstadoSelecionado}/municipios`

    cidadeSelecionada.innerHTML = "<option value>Selecione a cidade</option>"
    cidadeSelecionada.disabled = true

    fetch(url)
     .then( (resposta) => { return resposta.json() } )
     .then( (cidades) => {
         for( cidade of cidades ){
             // usar acentuação "CRAZE" para poder usar formatar dados dentro de tags html
             cidadeSelecionada.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
         }
         cidadeSelecionada.disabled = false
     } )
}

// listener de mudança de estado da tag option
document.querySelector("select[name=uf]").addEventListener("change", listarCidades )

// itens de coleta
// pegar todos li´s
const itensParaColetar = document.querySelectorAll(".items-grid li")

for(const item of itensParaColetar){
    item.addEventListener("click", tratarItemSelecionado)
}

// guardar os itens que são coletados
const itensColetados = document.querySelector("input[name=itens]")

// array para armazenar os itens selecionados
let itensSelecionados = []

function tratarItemSelecionado(evento){
    const itemLi = evento.target

    // adicionar ou remover uma classe css com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se exitem itens selecionados, se sim
    // pegar os itens selecionados
    const jaSelecionados = itensSelecionados.findIndex( (item) => {
        const itemEncontrado = item == itemId // retornará verdadeiro ou falso
        return itemEncontrado
    })

    // se já estiver selecionado, tirar da seleção
    if( jaSelecionados >= 0 ){
        // tirar da seleção
        const itemFiltrado = itensSelecionados.filter( ( item ) => {
            const itemDiferente = item != itemId
            return itemDiferente
        } )
        itensSelecionados = itemFiltrado

    }else{ // se o item não estiver selecionado, adicionar a seleção
        itensSelecionados.push( itemId )
    }
    // atualizar o iput hidden no html
    itensColetados.value = itensSelecionados
}