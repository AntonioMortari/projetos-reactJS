'use strict'
//ELEMENTOS E VARIÁVEIS
let urlFilmesPopulares = 'https://api.themoviedb.org/3/trending/movie/day?language=PT-BR'
let urlSeriesPopulares = 'https://api.themoviedb.org/3/trending/tv/week?language=PT-BR'
let urlMaisVotados = 'https://api.themoviedb.org/3/movie/top_rated?language=pt-br&page=1'
let urlImagens = 'https://image.tmdb.org/t/p/w500'
let conteinerFilmes = document.querySelector('#conteiner-filmes')
let inputPesquisa = document.querySelector('#input-pesquisa')
let itensLocalStorage = JSON.parse(localStorage.getItem('itens')) || []

//autorização
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTg1NTM3OGU5OTAzZWIxZmMzMzQ5YTIzYjY2YzBlYiIsInN1YiI6IjY0YTdmZmUzZjA1NmQ1MDEzOTA0ZDIyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.17mEEK3cYMye1wm5Cl9j_RMXVDYVYBNabUIWKxMy-i4'
    }
};

//MENU HAMBÙRGUER
let menu = document.querySelector('#nav')
let btnMenu = document.querySelector('#btn-menu')

const toggleMenu = () =>{
    btnMenu.classList.toggle('fa-bars')
    btnMenu.classList.toggle('fa-xmark')

    menu.classList.toggle('ativo')

}

btnMenu.addEventListener('click', toggleMenu)

//FUNÇÕES

const requisicaoPadrao = async() =>{
    conteinerFilmes.innerHTML = ''
    try{
        let resposta = await fetch(urlMaisVotados, options)
        let dados = await resposta.json()
        let dadosFilme = dados.results
        criarFilmes(dadosFilme)
    }catch(e){
        console.log(e)
    }
}

const criarFilmes = (dadosFilme) =>{
    dadosFilme.forEach(infoFilme =>{
        let filme = document.createElement('li')
        filme.classList.add('filme')
        
        mostrarFilmesCriado(filme,infoFilme)
    })
}

const mostrarFilmesCriado = (filme,infoFilme) =>{
    if(!infoFilme.poster_path){
        return
    }
    conteinerFilmes.appendChild(filme)

    //verificando se é serie ou filme e pegando as informações
    let data = infoFilme.first_air_date || infoFilme.release_date
    let nome = infoFilme.title || infoFilme.name
    let src = urlImagens + infoFilme.poster_path
    if(!src){
        //se não tiver imagem
        return
    }

    //formatando data
    data = data.split('-').reverse('-')
    data = data[2]

    filme.innerHTML = `
    <div class="descricao">
                    <p>${infoFilme.overview}</p>
                </div>
    <div class="imagem">
    <img src="${src}" alt="Cartaz de ${nome}">
</div>
<div class="info">
    <p><span class="nome-filme">${nome}</span> (<span class = "data">${data}</span>)</p>
    <div class="icones">
        <p class="avaliacao"><i class="fa-solid fa-star" style="color: #ffdd00;"></i>${infoFilme.vote_average.toFixed(1)}</p>

        <abbr title="Marcar como gostei"><i class="fa-regular fa-heart curtir" style="color: #f82525;"></i></abbr>
    </div>
</div>
    `
    
    let btn = filme.querySelector('.curtir')
    itensLocalStorage.forEach(item =>{
        if(item.nome == nome){
            //se o filme estiver no localstorage carregue-o como favorito
            btn.classList.remove('fa-regular')
            btn.classList.add('fa-solid') 
        }
    })

    btn.addEventListener('click', (e) =>{
        marcarGostei(e.target)
    })
}

const procurarFilme = async() =>{
    if(inputPesquisa.value.lenght == 0){
        alert('Digite os dados corretamente')
        return
    }
    let itemPesquisado = inputPesquisa.value

        let resposta = await fetch(`https://api.themoviedb.org/3/search/movie?query=${itemPesquisado}&include_adult=false&language=pt-br&page=1`, options)
        let dados = await resposta.json()
        if(dados.results == 0){
            mostrarErro()
            return
        }
        if(dados.results == 0){
            mostrarErro()
            return
        }
        let dadosFilme = dados.results

        
        conteinerFilmes.innerHTML =''
        inputPesquisa.value = ''
        
        criarFilmes(dadosFilme)
        await procurarSerie(itemPesquisado)
}

const procurarSerie = async(itemPesquisado) =>{
    let resposta = await fetch(`https://api.themoviedb.org/3/search/tv?query=${itemPesquisado}&include_adult=false&language=pt-br&page=1`, options)
    let dados = await resposta.json()
    let dadosFilme = dados.results

    criarFilmes(dadosFilme)
}

const seriesPopulares = async() =>{
    conteinerFilmes.innerHTML = ''

    let resposta = await fetch(urlSeriesPopulares, options)
    let dados = await resposta.json()
    let dadosFilme = dados.results

    criarFilmes(dadosFilme)
}

const filmesPopulares = async() =>{
    conteinerFilmes.innerHTML = ''

    let resposta = await fetch(urlFilmesPopulares, options)
    let dados = await resposta.json()
    console.log(dados)
    let dadosFilme = dados.results

    criarFilmes(dadosFilme)
} 

const mostrarErro = () =>{
    conteinerFilmes.innerHTML = '<p style="color: white; font-size: 1.7rem;">Nenhum resultado encontrado!</p>'
}

const marcarGostei = (btn) =>{
    btn.classList.toggle('fa-regular')
    btn.classList.toggle('fa-solid')

    btn.classList[2] == 'fa-solid' ? adicionarItemLocalStorage(btn) : removerItemLocalStorage(btn)
}

const adicionarItemLocalStorage = (btn) =>{
    
    let dadosFilmeCurtido = pegarDadosItemCurtido(btn)
    itensLocalStorage.push(dadosFilmeCurtido)

    localStorage.setItem('itens', JSON.stringify(itensLocalStorage))
    
}

const removerItemLocalStorage = (btn) =>{
    let filme = btn.parentNode.parentNode.parentNode.parentNode;
    let nomeFilmeRemovido = filme.querySelector('.nome-filme').textContent;
    let indiceFilmeRemovido = 0
    itensLocalStorage.forEach((item,indice) =>{
        if(item.nome == nomeFilmeRemovido){
            indiceFilmeRemovido = indice
        }
    })
    
    itensLocalStorage.splice(indiceFilmeRemovido, 1)

    localStorage.setItem('itens', JSON.stringify(itensLocalStorage))


}

const pegarDadosItemCurtido = (btn) =>{
    let itemCurtido = btn.parentNode.parentNode.parentNode.parentNode
    
    let dadosFilmeCurtido = {
        src: itemCurtido.querySelector('.imagem img').src,
        nome: itemCurtido.querySelector('.nome-filme').textContent,
        avaliacao: itemCurtido.querySelector('.avaliacao').textContent,
        data: itemCurtido.querySelector('.data').textContent,
        overview: itemCurtido.querySelector('.descricao').textContent
    }

    return dadosFilmeCurtido
}

const carregarItensCurtidos = () =>{
    conteinerFilmes.innerHTML = ''
    itensLocalStorage = JSON.parse(localStorage.getItem('itens'))
    itensLocalStorage.forEach(item =>{
        let filme = document.createElement('li')
        filme.classList.add('filme')
    
        filme.innerHTML = `
        <div class="descricao">
            ${item.overview}
        </div>     
        <div class="imagem">
        <img src="${item.src}" alt="Cartaz de ${item.nome}">
        </div>
    <div class="info">
        <p><span class="nome-filme">${item.nome}</span> (<span class = "data">${item.data}</span>)</p>
        <div class="icones">
            <p class="avaliacao"><i class="fa-solid fa-star" style="color: #ffdd00;"></i>${item.avaliacao}</p>
            <abbr title="Remover da lista"><i class="fa-regular fa-trash curtir" style="color: #f82525;"></i></abbr>
        </div>
    </div>
        `
        conteinerFilmes.appendChild(filme)

        let btn = filme.querySelector('.curtir')
        itensLocalStorage.forEach(itemls =>{
        if(itemls.nome == item.nome){
            btn.classList.remove('fa-regular')
            btn.classList.add('fa-solid') 
        }

        btn.addEventListener('click', (btn) =>{
            removerItemLocalStorage(btn.target)
            let filme = btn.target.parentNode.parentNode.parentNode.parentNode.parentNode
            filme.remove()
        })
    })
    })

}

requisicaoPadrao()




//EVENTOS
document.querySelector('#btn-procurar').addEventListener('click', procurarFilme)
inputPesquisa.addEventListener('keydown', (e) =>{
    e.key == 'Enter' ? procurarFilme() : false
})

document.querySelector('#melhor-avaliados').addEventListener('click', requisicaoPadrao)
document.querySelector('#series-populares').addEventListener('click', seriesPopulares)
document.querySelector('#filmes-populares').addEventListener('click', filmesPopulares)
document.querySelector('#filmes-curtidos').addEventListener('click', carregarItensCurtidos)
