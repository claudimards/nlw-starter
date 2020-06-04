const botaoPesquiser = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const fechar = document.querySelector("#modal .header a")

botaoPesquiser.addEventListener("click", () => {
    modal.classList.toggle("hide")
})

fechar.addEventListener("click", () => {
    modal.classList.add("hide")
})