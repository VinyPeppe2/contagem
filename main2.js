let bstart = document.getElementById('bStart');
let bstop = document.getElementById('bStop');
let breset = document.getElementById('bReset');
let cronometro = document.getElementById('cronometro');
let interval;
let time = 30; // Tempo para teste rápido
let pause = false;
let teste = document.getElementById('teste');

// Áudios carregados fora da função
let tocar_go = new Audio('/musics/sino.mp3');
let tocar = new Audio('/musics/contagem.mp3');

async function tocarSom(audio) {
    try {
        await audio.play(); // Aguarda a reprodução começar
    } catch (error) {
        console.log("Erro ao tocar áudio:", error);
    }
}

function start(){
    cronometro.innerHTML = '00:30';
    if (!pause){
        pause = true;
        interval = setInterval(function(){
            let minutos = Math.floor((time % 3600) / 60);
            let segundos = time % 60;

            cronometro.innerHTML =
            (minutos < 10 ? '0' : '') + minutos + ':' +
            (segundos < 10 ? '0' : '') + segundos;

            time--;
            teste.innerHTML = time;

            if (time === 29){
                tocarSom(tocar_go);
            }
            else if (time === 12){
                tocarSom(tocar);
            }
            else if (time < 0){
                clearInterval(interval);
                pause = false;
                cronometro.innerHTML = '00:00';
            }
        }, 1000);
    }
}

function stop(){
    clearInterval(interval);
    pause = false;
}

function reset(){
    clearInterval(interval);
    cronometro.innerHTML = '00:00';
    time = 30; // Reinicia para o tempo original
    pause = false;
}

bstart.addEventListener('click', start);
breset.addEventListener('click', reset);
bstop.addEventListener('click', stop);
