const express = require("express")
const server = express()

// pegar o banco de dados
const database = require("./database/db")

// configurar pasta publica
server.use(express.static("public"))

// habilitar o uso da requisição do BODY na aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {express: server, noCache: true})

// configurar caminhos na aplicação
// página inicial
server.get("/", (requisicao, resposta) => {
    return resposta.render("index.html")
})

server.get("/create-point", (requisicao, resposta) => {
    // query string da url da página
    //console.log(requisicao.query)
    return resposta.render("create-point.html")
})

server.post("/save-point", (requisicao, resposta) => {
    // corpo do formulário

    // inserir dados no banco de dados
    const query = `INSERT INTO places(image, name, address, address2, state, city, items) 
        VALUES(?,?,?,?,?,?,?);`

    const values = [
        requisicao.body.image,
        requisicao.body.name,
        requisicao.body.address,
        requisicao.body.address2,
        requisicao.body.state,
        requisicao.body.city,
        requisicao.body.itens
    ]

    function afterInsertData(error){
        if(error){
            console.log(error)
            //return resposta.send("Erro ao cadastrar")
            return resposta.render("create-point.html", { fail: true })
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return resposta.render("create-point.html", { saved: true })
    }
    database.run(query, values, afterInsertData)
})

server.get("/search", (requisicao, resposta) => {
    const search = requisicao.query.search
    if(search == ""){
        // pesquisa vazia
        return resposta.render("search-results.html", { total: 0 })
    }
    // pegar os dados do banco de dados
    database.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(error, rows){
        if(error){
            return console.log(error)
        }
        const total = rows.length
        // mostrar a página html com os dados do banco de dados
        return resposta.render("search-results.html", { places: rows, total: total })
    })
})

// ligar o servidor
server.listen(3000)