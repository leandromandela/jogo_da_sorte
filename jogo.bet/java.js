var jogoEncerrado = false;
var valorAposta = 0;
var multiplicadorDiamante = 1.5; // Multiplicador para cada diamante encontrado
var valorAtual = 0;

function revealContent(square) {
    if (jogoEncerrado) return; // Verifica se o jogo já está encerrado
    
    // Defina a probabilidade de cada conteúdo
    var content = Math.random() < 0.5 ? '💎' : '💣';
    
    // Defina o conteúdo do quadrado conforme a probabilidade
    square.textContent = content;

    // Adicione uma classe para estilização
    square.classList.add(content === '💎' ? 'diamante' : 'bomba');

    // Se o conteúdo for uma bomba, encerre o jogo
    if (content === '💣') {
        jogoEncerrado = true;
        alert('Você encontrou uma bomba! Aposta cancelada.');
        valorAtual = 0; // Reseta o valor atual
    } else {
        // Multiplica o valor atual pelo multiplicador
        valorAtual *= multiplicadorDiamante;
        alert('Você encontrou um diamante! Valor atual: ' + valorAtual);
    }

    // Remova o evento de clique após revelar o conteúdo
    square.onclick = null;
} 

function fazerAposta(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    if (valorAposta <= 0) {
        alert('Por favor, insira um valor válido para a aposta.');
        return;
    }

    // Inicia o valor atual com o valor da aposta
    valorAtual = valorAposta;
    alert('Aposta inicial de ' + valorAposta + ' realizada! Boa sorte!');
}

function setValorAposta() {
    var valorApostaInput = document.getElementById('valorAposta');
    var valorApostaText = valorApostaInput.value;

    if (!valorApostaText || isNaN(valorApostaText) || parseFloat(valorApostaText) <= 0) {
        alert('Por favor, insira um valor válido para a aposta.');
        return;
    }

    valorAposta = parseFloat(valorApostaText);
}

function finalizarJogo() {
    alert('Jogo encerrado! Valor final: ' + valorAtual);
    resetJogo();
}

function resetJogo() {
    var squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.textContent = '';
        square.classList.remove('diamante', 'bomba');
        square.onclick = function() {
            revealContent(this);
        };
    });
    jogoEncerrado = false;
    valorAtual = 0;
}
