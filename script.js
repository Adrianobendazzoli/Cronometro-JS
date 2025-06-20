// cronometro
let segundosc = 0;
let intervaloc;
let  timerc= false; 

function formatarTempo(segundosTotais) {
  const horas = String(Math.floor(segundosTotais / 3600)).padStart(2, '0');
  const minutos = String(Math.floor((segundosTotais % 3600) / 60)).padStart(2, '0');
  const segundos = String(segundosTotais % 60).padStart(2, '0');
  return `${horas}:${minutos}:${segundos}`;
}

document.getElementById('start1').addEventListener('click', () => {
  
  if (!intervaloc) {
    intervaloc = setInterval(() => {
      segundosc++;
      document.getElementById('tempo1').textContent = formatarTempo(segundosc);
    }, 1000);
  }
});

document.getElementById('pause1').addEventListener('click', () => {
  clearInterval(intervaloc);
  intervaloc = null;
});

document.getElementById('reset1').addEventListener('click', () => {
  clearInterval(intervaloc);
  intervaloc = null;
  segundosc = 0;
  document.getElementById('tempo1').textContent = "00:00:00";
});


// teporizador
let tempoRestante = 0;
let intervaloRegressivo;

function formatarRegressivo(segundosTotais) {
  const minutos = String(Math.floor(segundosTotais / 60)).padStart(2, '0');
  const segundos = String(segundosTotais % 60).padStart(2, '0');
  return `${minutos}:${segundos}`;
}

document.getElementById('start2').addEventListener('click', () => {
  const inputMin = parseInt(document.getElementById('temporizador').value);
  if (!isNaN(inputMin) && inputMin > 0) {
    tempoRestante = inputMin * 60;

    document.getElementById('start2').classList.add('hidden');
    document.getElementById('pause2').classList.remove('hidden');
    document.getElementById('reset2').classList.remove('hidden');

    intervaloRegressivo = setInterval(() => {
      if (tempoRestante > 0) {
        tempoRestante--;
        document.getElementById('tempo2').textContent = formatarRegressivo(tempoRestante);
      } else {
        clearInterval(intervaloRegressivo);
        intervaloRegressivo = null;
        alert("Tempo esgotado!");
        
      }
    }, 1000);
  } else {
    alert("insira um número válido de minutos."); 
  }
});



document.getElementById('pause2').addEventListener('click', () => {
  clearInterval(intervaloRegressivo);
  intervaloRegressivo = null;
  document.getElementById('pause2').classList.add('hidden');
  document.getElementById('retomar').classList.remove('hidden');
});

document.getElementById('retomar').addEventListener('click', () => {
  if (tempoRestante > 0 && !intervaloRegressivo) {
    intervaloRegressivo = setInterval(() => {
      if (tempoRestante > 0) {
        tempoRestante--;
        document.getElementById('tempo2').textContent = formatarRegressivo(tempoRestante);
      } else {
        clearInterval(intervaloRegressivo);
        intervaloRegressivo = null;
        alert(" Tempo esgotado!");
       
      }
    }, 1000);
  }

  document.getElementById('retomar').classList.add('hidden');
  document.getElementById('pause2').classList.remove('hidden');
});

document.getElementById('reset2').addEventListener('click', () => {
  clearInterval(intervaloRegressivo);
  intervaloRegressivo = null;
  tempoRestante = 0;
  document.getElementById('tempo2').textContent = "00:00";
  document.getElementById('temporizador').value = "";

  document.getElementById('start2').classList.remove('hidden');
  document.getElementById('pause2').classList.add('hidden');
  document.getElementById('retomar').classList.add('hidden');
  document.getElementById('reset2').classList.add('hidden');
});
