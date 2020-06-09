// Constantes
const abc = 'abcdefghijklmnñopqrstuvwxyz';
const fileNameImage = {
    5: 'OneStage.png',
    4: 'TwoStage.png',
    3: 'ThreeStage.png',
    2: 'FourStage.png',
    1: 'FiveStage.png',
    0: 'SixStage.png',
};

const words = [
    'elecciones',
    'ala',
    'carro',
    'murcialago',
    'debajo',
    'propaganda',
    'sol',
    'luna',
    'anillo',
    'compromiso',
    'camion',
    'pera',
    'Enjambre',
    'pistola',
    'manzana',
    'letrero',
    'mariposa',
    'rojo',
    'amarillo',
    'basura',
    'contenedor',
    'queso',
    'alfombra',
    'policia',
    'persona',
    'vecino',
    'gato',
    'perro',
    'avion',
    'tortilla',
    'ceramica',
    'falda',
    'detenerse',
    'galeria',
    'imagen',
    'sufrimiento',
    'amor',
    'caracol',
    'palmera',
    'mono',
    'adolescencia',
    'juventud',
    'depilar',
    'sombrero',
    'zanahoria',
    'isla',
    'creatividad',
    'contacto',
    'alegria',
    'motocicleta',
];

const gamer = {
    fallos: 0,
    aciertos: 0,
    intentos: 5,
    reset: function () {
        this.fallos = 0;
        this.intentos = 5;
        this.aciertos = 0;
    },
    upAciertos: function () {
        ++this.aciertos;
    },
};

let aciertos = 0;

// Variables
let selectedWordRandom = '';
let showWord = '';

// Functions

//Cargar abecedario
function loadAbecedario() {
    $('#keyboard').empty();

    abc.split('').forEach(function (letter) {
        let $btnABC = $('<button></button>');

        $btnABC.append(letter.toUpperCase());

        //Evento click
        $btnABC.on('click', function () {
            if (wordHasThisLetter(selectedWordRandom, $(this).text()) === true) {
                //
                let letraCorrecta = $(this).text();
                let $padreWord = $('#word').children(`span[name=${letraCorrecta}]`);


                searchAndReplace($padreWord.filter('span:not(.correct)'), this, '*', letraCorrecta);

                let win = checkWin();

                if (win === false) {
                    $(this).addClass('btn-correct');
                    console.log(gamer.aciertos)
                }
            } else {
                // Puntaje
                gamer.intentos--;
                gamer.fallos++;

                cambiarImagen(gamer.intentos); //Cambiar imagen

                //Style
                $(this).removeClass('btn-color-primary');
                $(this).addClass('btn-danger');

                $(this).off('click');

                if (gameOver() === true) {
                    $('#mensaje').text('Fue un buen intento!!');
                    $('#modal-center').modal('show');
                }
            }
        });

        addLettersToKeyBoard($('#keyboard'), $btnABC, 'btn btn-color-primary btn-lg');
    });
}

//Cargar palabra random
function loadRandomWord() {
    $('#word').empty();

    selectRandomWord(words); //Seleccionar palabra aleatoria

    selectedWordRandom.split('').forEach(function (letterWord) {
        let $spanWord = $('<span>*</span>');
        $spanWord.attr('name', letterWord.toUpperCase());
        addLettersToKeyBoard($('#word'), $spanWord, 'btn-lg letter mx-2');
    });
}




// Agregar letras al teclado
//  1. Parametro el padre
//  2. Parametro el hijo
//  3. Parametro el estilo
function addLettersToKeyBoard($padre, $hijo, classStyle) {
    let $button = $hijo;

    $button.addClass(classStyle);

    $padre.append($button);
}

// Seleccionar palabra random
function selectRandomWord(words) {
    let randomNumber = Math.floor(Math.random() * (words.length - 1));
    let randomWord = words[randomNumber];
    selectedWordRandom = randomWord;
}

//buscar letra en palabras
function wordHasThisLetter(word, letter) {
    if (letter.length === 1) {
        for (let i = 0; i < word.length; i++) {
            //Recorre la palabra en busca de la letra
            if (word[i].toLowerCase() === letter.toLowerCase()) {
                return true;
            }
        }
    } else {
        console.log('El segundo argumento debe tener 1 caracter');
    }

    return false;
}

// Resetea todo

function resetAll() {
    gamer.reset();
    selectedWordRandom = '';
    $('#img-state').attr('src', 'img/' + fileNameImage[gamer.intentos]);
    loadAbecedario();
    loadRandomWord();
}

// Cambiar estado de imagen
function cambiarImagen(intentosFallidos) {
    if (intentosFallidos > -1) {
        $('#img-state').attr('src', 'img/' + fileNameImage[intentosFallidos]);
    }
}


// Remplaza el texto en la pantalla
function searchAndReplace($filtro, where, search, replace) {

    if ($filtro.length > 0) {
        let text = $(where).text();
        $filtro.first().text(text.replace(search, replace));
        $filtro.first().addClass('correct');
        gamer.upAciertos();
    }
}


// Chequear si gano

function checkWin() {
    if (selectedWordRandom.length === gamer.aciertos) {
        $('#mensaje').text('Ganaste!!');
        $('#modal-center').modal('show');
        $('#aciertos').text(gamer.aciertos);
        $('#fallos').text(gamer.fallos);
        $('#keyboard').find('button').off(); //Quitar evento click

        return true;
    } else {
        return false;
    }
}

//Game over
function gameOver() {
    if (gamer.intentos === 0) {
        $('#mensaje').text('Fue un buen intento!!');
        $('#modal-center').modal('show');
        $('#keyboard').find('button').off(); //Quitar evento click
        $('#aciertos').text(gamer.aciertos);
        $('#fallos').text(gamer.fallos);
        return true;
    } else {
        console.log('Intentos:' + gamer.intentos);
        return false;
    }
}

$(document).ready(function () {
    // Definicion
    // 1 . agregar evento de reiniciar
    $('#reset').click(resetAll);
    $('#reset-game').click(resetAll);

    // 2. Cargar letras en keyboard
    loadAbecedario();

    // 3. Cargar palabra aleatoria
    loadRandomWord();
});