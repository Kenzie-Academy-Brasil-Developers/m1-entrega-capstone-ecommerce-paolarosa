function criarCard(produto) {

  let id = produto.id
  let imagem = produto.imagem
  let nome = produto.nome[0].toUpperCase() + produto.nome.slice(1)
  let descricao = produto.descricao[0].toUpperCase() + produto.descricao.slice(1)
  let preco = parseFloat(produto.preco)
  let botao = produto.botao
  let categoria = produto.categoria

  let tagLi = document.createElement("li")
  let tagImagem = document.createElement("img")
  let tagDiv = document.createElement("div")
  let tagCategoria = document.createElement("h3")
  let tagNome = document.createElement("h2")
  let tagDescricao = document.createElement("p")
  let tagPreco = document.createElement("strong")
  let tagBotao = document.createElement("button")

  tagLi.classList.add("li")
  tagImagem.classList.add("imagem")
  tagImagem.src = `./img/${imagem}`
  tagDiv.classList.add("info_cards")
  tagCategoria.classList.add("categoria")
  tagCategoria.innerText = categoria
  tagNome.classList.add("produto")
  tagNome.innerText = nome
  tagDescricao.classList.add("descricao")
  tagDescricao.innerText = descricao
  tagPreco.classList.add("preco")
  tagPreco.innerText = `R$${preco.toFixed(2)}`
  tagBotao.classList.add("produto_button")
  tagBotao.innerText = botao
  tagBotao.id = produto.id

  tagDiv.append(tagCategoria, tagNome, tagDescricao, tagPreco, tagBotao)
  tagLi.append(tagImagem, tagDiv)

  return tagLi
}


function addElementos(lista) {
  let listaProdutos = document.querySelector(".cards")
  listaProdutos.innerHTML = ""
  for (let i = 0; i < lista.length; i++) {
    listaProdutos.appendChild(criarCard(lista[i]))
  }
}
addElementos(data)



let carrinho = []

function separarProduto() {
  let botaoCarrinho = document.getElementsByClassName("produto_button")

  for (let i = 0; i < botaoCarrinho.length; i++) {
    botaoCarrinho[i].addEventListener("click", function (event) {
      event.preventDefault()

      for (let j = 0; j < data.length; j++) {
        if (event.target.id == data[j].id) {
          carrinho.push(data[j])
          addRemoveTotal()
          renderizarQuantidadeESoma()
        }
      }
      renderizarCarrinho(carrinho)
    })
  }
}
separarProduto()



function addRemoveTotal() {
  let carrinhoVazio = document.querySelector(".vazio")
  carrinhoVazio.classList.remove("hidden")
  let valorFinal = document.querySelector(".valorFinal")

  if (carrinho.length > 0) {
    valorFinal.classList.remove("hidden")
    carrinhoVazio.classList.add("hidden")
  } else {
    valorFinal.classList.add("hidden")
    carrinhoVazio.classList.remove("hidden")
  }
}


function renderizarCarrinho(produtos) {
  let tagUlCarrinho = document.querySelector(".ulcarrinho")
  tagUlCarrinho.innerHTML = ""

  for (let i = 0; i < produtos.length; i++) {

    let tagLiCarrinho = document.createElement("li")
    let tagImagem = document.createElement("img")
    let tagDiv = document.createElement("div")
    let tagNome = document.createElement("h3")
    let tagPreco = document.createElement("strong")
    let tagBotao = document.createElement("button")

    tagLiCarrinho.classList.add("licarrinho")
    tagImagem.classList.add("imagemcarrinho")
    tagImagem.src = `./img/${produtos[i].imagem}`

    tagNome.classList.add("nomecarrinho")
    tagNome.innerText = `${produtos[i].nome}`
    tagPreco.classList.add("precocarrinho")
    tagPreco.innerText = `R$${Number(produtos[i].preco).toFixed(2)}`
    tagBotao.classList.add("removeproduto")
    tagBotao.innerText = 'Remover produto'

    tagBotao.addEventListener("click", function (event) {
      carrinho.splice(i, 1)
      renderizarCarrinho(carrinho)
      renderizarQuantidadeESoma()
      addRemoveTotal()
    })

    tagUlCarrinho.appendChild(tagLiCarrinho)
    tagLiCarrinho.append(tagImagem, tagDiv)
    tagDiv.append(tagNome, tagPreco, tagBotao)
  }

}


function renderizarQuantidadeESoma() {
  let valorFinal = document.querySelector(".valorFinal")
  let tagQuantidade = document.createElement("div")
  let tagTotal = document.createElement("div")

  valorFinal.innerHTML = ""

  tagQuantidade.classList.add("quantidade")
  tagQuantidade.innerHTML = `<p>Quantidade:</p><p>${carrinho.length}</p>`
  tagTotal.classList.add("total")
  tagTotal.innerHTML = `<p>Total:</p><p>R$${somaProducts(carrinho).toFixed(2)}</p>`

  valorFinal.appendChild(tagQuantidade)
  valorFinal.appendChild(tagTotal)

}

function somaProducts(carrinho) {
  let soma = 0
  for (let i = 0; i < carrinho.length; i++) {
    soma += Number(carrinho[i].preco)
  } return soma
}
somaProducts(carrinho)


function separarCategoria() {
  let tagBotoesCategoria = document.querySelectorAll(".ul_nav li a")

  for (let i = 0; i < tagBotoesCategoria.length; i++) {
    tagBotoesCategoria[i].addEventListener("click", function (event) {
      event.preventDefault()
      console.log(event.target)
      let novaArray = []
      for (let j = 0; j < data.length; j++) {
        if (event.target.getAttribute("id") == data[j].categoria) {
          novaArray.push(data[j])
        }
        if (event.target.getAttribute("id") == "Todos") {
          novaArray.push(data[j])
        }

      }
      addElementos(novaArray)

    })
  }

}
separarCategoria()

