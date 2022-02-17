// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49

const main = document.getElementsByTagName('main')[0];
const levels = document.getElementById('levels');
const playBtn = document.getElementById('btn-play');
const gameContainer = document.querySelector('.game-container');
const message = document.querySelector('.message');
const points = document.querySelector('.points');

// A seconda del livello si crea una griglia con numero di caselle diverso quindi:
// di base devo creare un ciclo for per far generare le caselle poi a seconda del livello il ciclo prenderà valori diversi, ovvero quante volte cicla e la width delle celle cambia a seconda del numero di colonne
const startGame = () => { //creo una funzione dove a seconda del caso si creaono griglie diverse
    // dichiaro le variabili per le caselle e le colonne che cambieranno a seconda del livello

    let squares, columns, bombs;

    // creo i casi a seconda del livello
    switch (levels.value){
        case 'easy':
            console.log('level easy');
            // a seconda del livello cambia il numero di colonne
            squares = 100;
            columns = 10;
            //salco dentro un array i numeri random che genero
            numbers = [];

            main.style.backgroundColor = '#7FFFD4'
            console.log(gameContainer);
            break;

        case 'normal':
            console.log('level normal');
            squares = 81;
            columns = 9;
            numbers = [];

            console.log(gameContainer);
            main.style.backgroundColor = "gold";
            break;

        case 'crazy':
            console.log('level crazy');
            squares = 49;
            columns = 7;

            console.log(gameContainer);
            main.style.backgroundColor = "#FF6347";
            break;
    }

    // questa riga di codice fa in modo che il gameContainer, una volta scelto il livello, prima venga svuotato e poi dopo con il for ci ricreo dentro un'altra griglia
    gameContainer.innerHTML = ' ';

    // funzione per selezionare le celle e per non poterle più riselezionare
    function selectBox() {
        console.log(this.innerHTML);
        const clickedBox = this; //il this si riferisce alla cella
        const clickedNumber = parseInt(this.innerHTML); //aggiungendo .innerHTML mi riferisco al valore dentro la cella e devo fare il parseInt per trasformarlo da stringa in numero

        //verifico se il numero cliccato è una bomba usando la funzione isBomb che mi sono creata apposta
        if ( isBomb(clickedNumber, bombs) ){ 
            console.log('bomba!')
            clickedBox.classList.add('bomb-box');
            // message.style.display = 'flex';

        } else{
            clickedBox.classList.add('selected-box');
        }

        // una volta che ho cliccato su una data cella voglio che questa non sia più cliccabile quindi le devo rimuovere l'event listener del click
        clickedBox.removeEventListener('click', selectBox);
    }

    // ciclo for la creazione delle celle
    for(let i = 1; i <= squares; i++){
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = `calc(100% / ${columns})`;
        box.append(i);
        gameContainer.append(box);

        // ogni volta che clicco aggancio una casella usando il this
        box.addEventListener('click', selectBox);
    }

    bombs = bombGenerator(16,1,squares);

    // funzione per la generazione di numeri random
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    // creo una funzione per la generazione random dei numeri corrispondenti alle bombe
    function bombGenerator(bombsNum, min, max){
        const  array = [];

        do{
            const randomNumber = getRandomIntInclusive(min, max);
            if( !array.includes(randomNumber) ){ 
                array.push(randomNumber);
            }
        }while (array.length < bombsNum)

        console.log(array);

        return array;
    }

    //funzione per verificare se è una bomba
    function isBomb(num, bombs){
        if( bombs.includes(parseInt(num)) ){
            return true;
        
        } else {
            return false;
        }
    }

}

playBtn.addEventListener('click',startGame);


