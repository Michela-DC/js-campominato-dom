// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49

const gameContainer = document.querySelector('.game-container');
const levels = document.getElementById('levels');
const playBtn = document.getElementById('btn-play');

// A seconda del livello si crea una griglia con numero di caselle diverso quindi:
// di base devo creare un ciclo for per far generare le caselle poi a seconda del livello il ciclo prenderà valori diversi, ovvero quante volte cicla e la width delle celle cambia a seconda del numero di colonne
const startGame = () => { //creo una funzione dove a seconda del caso si creaono griglie diverse
    // dichiaro le variabili per le caselle e le colonne che cambieranno a seconda del livello
    let squares, columns; 
    // creo i casi a seconda del livello
    switch (levels.value){
        case 'easy':
            console.log('level easy');
            // a seconda del livello cambia il numero di colonne
            squares = 100;
            columns = 10;
            console.log(gameContainer);
            break;
    
        case 'normal':
            console.log('level normal');
            squares = 81;
            columns = 9;
            console.log(gameContainer);
            break;
        
        case 'crazy':
            console.log('level crazy');
            squares = 49;
            columns = 7;
            console.log(gameContainer);
            break;
    }

    // questa riga di codice fa in modo che il gameContainer, una volta scelto il livello, prima venga svuotato e poi dopo con il for ci ricreo dentro un'altra griglia
    gameContainer.innerHTML = ' ';

    //Una volta che viene scelto il caso si possono creare le celle con un ciclo for e le inserisco dentro il game container
    for(let i = 1; i <= squares; i++){
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = `calc(100% / ${columns})`;
        box.append(i);
        gameContainer.append(box);
    }
}

playBtn.addEventListener('click',startGame);
