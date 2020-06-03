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

listarEstados()

function listarCidades( evento ){
    const cidadeSelecionada = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
 
    const idEstadoSelecionado = evento.target.value
    const indexOfSelectedState = evento.target.selectedIndex
    stateInput.value = evento.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstadoSelecionado}/municipios`

    fetch(url)
     .then( (resposta) => { return resposta.json() } )
     .then( (cidades) => {
         for( cidade of cidades ){
             // usar acentuação "CRAZE" para poder usar formatar dados dentro de tags html
             cidadeSelecionada.innerHTML += `<option value="${cidade.id}">${cidade.nome}</option>`
         }
         cidadeSelecionada.disabled = false
     } )
}


document.querySelector("select[name=uf]")
    .addEventListener("change", listarCidades )
