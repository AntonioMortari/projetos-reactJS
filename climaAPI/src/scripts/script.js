'use strict'

import chaveAPI from "./chave.js"

//variaveis e elementos
const urlBandeiras = 'https://flagsapi.com/BR/flat/64.png'
let inputCidade = document.querySelector('#cidade-input')
let btnProcurar = document.querySelector('#buscar')
let msgErro = document.querySelector('#msg-erro')

let conteinerDados = document.querySelector('#weather-data')
conteinerDados.style.display = 'none'
let cidadePesquisada = document.querySelector('#cidade')
let bandeira = document.querySelector('#pais')
let temperatura = document.querySelector('#numero-temperatura')
let descricao = document.querySelector('#descricao')
let iconeTempo = document.querySelector('#weather-icon')
let umidade = document.querySelector('#umidade span')
let vento = document.querySelector('#vento span')


//funções
const pegarDados = async(cidade) =>{
    let resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveAPI}&lang=pt_br`)
    let dados = await resposta.json()

    return dados
}

const mostrarDados = async() =>{
    if(inputCidade.value.length == 0){
        alert('Erro, digite uma cidade para ver o clima!')
        return
    }else{
        let cidade = inputCidade.value
        const dados = await pegarDados(cidade)
        console.log(dados)
        if(dados.message == 'city not found'){
            conteinerDados.style.display = 'none'
            msgErro.style.display = 'block'
            msgErro.innerHTML = '<p class="erro">Cidade não encontrada!</p>' 
            return  
        }else{
            conteinerDados.style.display = 'block'
            msgErro.style.display = 'none'
            cidadePesquisada.textContent = `${dados.name}`
            bandeira.src =  `https://flagsapi.com/${dados.sys.country}/flat/64.png`
            temperatura.textContent = `${dados.main.temp.toFixed(1)} °C` 
            descricao.textContent = `${dados.weather[0].description}`
            iconeTempo.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
            umidade.textContent = `${dados.main.humidity}%`
            vento.textContent = `${dados.wind.speed} Km/h`
        }


    }
}

//eventos
btnProcurar.addEventListener('click' ,mostrarDados)
inputCidade.addEventListener('keydown', (e) =>{
    if(e.key == 'Enter'){
        mostrarDados()
    }
})