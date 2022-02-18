// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49

const main = document.getElementsByTagName('main')[0];
const levels = document.getElementById('levels');
const playBtn = document.getElementById('btn-play');
const gameContainer = document.querySelector('.game-container');
const initialMessage = document.querySelector('.initial-message');
const message = document.querySelector('.message');
const winnerLoser = document.querySelector('.winner-loser');
const score = document.querySelector('.score');

initialMessage.innerHTML = 'Scegli un livello!';

// A seconda del livello si crea una griglia con numero di caselle diverso quindi:
// di base devo creare un ciclo for per far generare le caselle poi a seconda del livello il ciclo prenderà valori diversi, ovvero quante volte cicla e la width delle celle cambia a seconda del numero di colonne
const startGame = () => { //creo una funzione dove a seconda del caso si creaono griglie diverse
    // dichiaro le variabili per le caselle e le colonne che cambieranno a seconda del livello

    let squares, columns, bombs, points = 0;
    const arrayBoxes = []; // array in cui andrò a salvare tutte le celle della griglia

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

    initialMessage.style.display = 'none'; //metto il messaggio iniziale in display none quando scelgo un livello
    gameContainer.innerHTML = ' '; // faccio in modo che il gameContainer, una volta scelto il livello, prima venga svuotato e poi dopo con il for ci ricreo dentro un'altra griglia
    
    // ogni volta che clicco su un nuovo livello il messaggio va in display none in modo che, quando perdo o vinco una partita in un certo livello, posso poi andare a selezionare un altro livello e rigiocare
    message.style.display = 'none'; 
    // svuoto sia winnerLoser che score ogni volta che viene cliccato play
    winnerLoser.innerHTML = ' ';
    score.innerHTML = ' '


    // ciclo for la creazione delle celle
    for(let i = 1; i <= squares; i++){
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = `calc(100% / ${columns})`;
        box.append(i);
        gameContainer.append(box);
        arrayBoxes.push(box); // vado a pushare tutte le caselle dentro un array per salvarle ed utilizzarle nella funzione notClickable

        // ogni volta che clicco aggancio una casella usando il this
        box.addEventListener('click', selectBox);
    }

    bombs = bombGenerator(16,1,squares); //richiamo la funzione per generare le bombe passandogli i valori che mi servono

    // FUNZIONI -------

    // funzione per selezionare le celle e per non poterle più riselezionare --------
    function selectBox() {
        console.log(this.innerHTML);
        const clickedBox = this; //il this si riferisce alla cella
        const clickedNumber = parseInt(this.innerHTML); //aggiungendo .innerHTML mi riferisco al valore dentro la cella e devo fare il parseInt per trasformarlo da stringa in numero

        //verifico se il numero cliccato è una bomba usando la funzione isBomb che mi sono creata apposta
        if ( isBomb(clickedNumber, bombs) ){ 
            console.log('bomba!')
            clickedBox.classList.add('bomb-box');

            gameOver(points, arrayBoxes);

        } else{
            clickedBox.classList.add('selected-box');
            points++;
            
            //per vincere il punteggio deve essere lo stesso numero di numero delle celle meno il numero delle bombe(per recupere quest'ultimo posso usare la lunghezza dell'array in cui si sono le bombe)
            if (points === squares - bombs.length ){ 
                win(points, arrayBoxes);
            }
        }

        // una volta che ho cliccato su una data cella voglio che questa non sia più cliccabile quindi le devo rimuovere l'event listener del click
        clickedBox.removeEventListener('click', selectBox);
    }

    // funzione per la generazione di numeri random --------
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    // creo una funzione per la generazione random dei numeri corrispondenti alle bombe --------
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

    //funzione per verificare se è una bomba --------
    function isBomb(num, bombs){
        if( bombs.includes(parseInt(num)) ){
            return true;
        
        } else {
            return false;
        }
    }

    // Funzione per quando si vince --------
    function win(points, arrayCells){
        console.log(`You win! Punteggio = ${points}`);
        message.style.display = 'flex';
        winnerLoser.innerHTML += "You win!";
        score.innerHTML += `Score = ${points}`;

        notClickable(arrayCells); //chiamo la funzione per togliere i listener a tutte le celle e gli passo un parametro che poi andrò a sostituire con arrayBoxes nell'if che controlla se ho cliccato su una bomba o no
    }

    //Funzione per quando si perde --------
    function gameOver(points, arrayCells){
        console.log(`Game Over! Punteggio = ${points}`);
        message.style.display = 'flex';
        winnerLoser.innerHTML += "Game Over";
        score.innerHTML += `Score = ${points}`;

        notClickable(arrayCells); //chiamo la funzione per togliere i listener a tutte le celle e gli passo un parametro che poi andrò a sostituire con arrayBoxes nell'if che controlla se ho cliccato su una bomba o no
    }

    // funzione che toglie tutti i Listener alle celle che non sono state selezionate quindi non sono più cliccabili --------
    function notClickable(arrayBoxes){
        // creo un ciclo usando l'array dove ho salvato tutte le caselline(arrayBoxes)
        for(let i = 0; i < arrayBoxes.length; i++){
            // dentro al ciclo salvo le varie caselline e poi tolgo il listener ad ogni casellina
            const cell = arrayBoxes[i];         
            cell.removeEventListener('click',selectBox);
        }
    }

}

playBtn.addEventListener('click',startGame);


