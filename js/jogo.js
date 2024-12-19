// jogo.js

// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras e reinicia o jogo
function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    jogarNovamente();
    atualizaPlacar(0, 0);
    // Torna os botões "Jogar novamente" e "Reiniciar" visíveis
    btnJogarNovamente.className = 'visivel btn btn-primary';
    btnReiniciar.className = 'visivel btn btn-secondary';
}

// Função jogar novamente (não altera tentativas, apenas reinicializa o estado do jogo)
function jogarNovamente() {
    jogar = true;
    let divis = document.getElementsByClassName("card-container");
    for (let i = 0; i < divis.length; i++) {
        divis[i].className = "inicial card-container";
        const imagem = divis[i].querySelector('img');
        if (imagem) {
            imagem.remove(); // Remove a imagem ao reiniciar
        }
    }
    document.getElementById("resposta").innerHTML = '';
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
    desempenho = tentativas === 0 ? 0 : (acertos / tentativas) * 100;
    document.getElementById("resposta").innerHTML = `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

function mostrarImagem(obj, imgSrc) {
    // Remove a imagem anterior, se houver
    const imgExistente = obj.querySelector('img');
    if (imgExistente) {
        imgExistente.remove();
    }

    const img = new Image();
    img.src = imgSrc;
    obj.appendChild(img);
}

// Função que sorteia um número aleatório entre 0 e 3 e verifica se o jogador acertou
function verifica(obj) {
    if (jogar) {
        jogar = false;
        tentativas++;
        let sorteado = Math.floor(Math.random() * 4); // Para considerar id 0 a 3

        if (obj.id == sorteado) {
            obj.className = "acertou card-container";
            mostrarImagem(obj, "https://media.istockphoto.com/id/530810572/pt/vetorial/bandeira-do-brasil-vector-ilustra%C3%A7%C3%A3o.jpg?s=612x612&w=0&k=20&c=ZB_eKlq6OLWP8QsakCaE7Dxmvd6P9t6MU0TOvPBaq4M="); // Imagem
            acertos++;
        } else {
            obj.className = "errou card-container";
            mostrarImagem(obj, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe1zMRuFxLS4ve7U7jD3v2zPYTNaY7X9SnGURX7ILKzB7F9x8ff2F5YVQV0vQL4rKzaT4&usqp=CAU");
            const objSorteado = document.getElementById(sorteado);
        }
        atualizaPlacar(acertos, tentativas);
    } else {
        alert('Clique em "Jogar novamente" para tentar novamente.');
    }
}


// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
