let bstart = document.getElementById('bStart');
let bstop = document.getElementById('bStop');
let breset = document.getElementById('bReset');
let cronometro = document.getElementById('cronometro');
let interval;
let time = 300;
let pause = false;
let tocar= new Audio('/contagem/musics/sino.mp3');


function start(){
    cronometro.innerHTML = '05:00';
    if (!pause){
        pause = true;
        interval = setInterval(function(){
            let minutos = Math.floor((time % 3600) / 60);
            let segundos = time % 60;

            cronometro.innerHTML =
            (minutos < 10 ? '0' : '') + minutos + ':' +
            (segundos < 10 ? '0' : '') + segundos;

            time --;

            if(time === 299){
                tocar.load()
                tocar.play();
            }

            if (time === 165){
                tocar.src = '/contagem/musics/contagem.mp3';
                tocar.load();
                tocar.play();
            }

            else if (time <= 0){
                clearInterval(interval);
                pause = false;
                cronometro.innerHTML = '00:00'
            }
        }, 100)
    }
    bstart.hidden = true;
    breset.hidden = false;
    bstop.hidden = false;
}

function stop(){
    clearInterval(interval);
    pause = false;
    bstart.hidden = false;
    breset.hidden = false;
    bstop.hidden = true;
}

function reset(){
    clearInterval(interval);
    cronometro.innerHTML = '00:00';
    time = 300;
    pause = false;
    breset.hidden = true;
    bstart.hidden = false;
    bstop.hidden = true;
}

bstart.addEventListener('click', start);
breset.addEventListener('click', reset);
bstop.addEventListener('click', stop);
