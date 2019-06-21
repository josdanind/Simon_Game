/*
    Todos los elementos del HTML se pueden manipular desde
    javascript (Agregar o quitar clases, cotenido ...)

    document.getElementById('(1)')

    (1) --> string del id del elemento.
*/

const verde = document.getElementById('verde')
const rojo = document.getElementById('rojo')
const azul = document.getElementById('azul')
const amarillo = document.getElementById('amarillo')
const boton = document.getElementById('button')

const LAST_LEVEL = 10

const sounds = {
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
}

class Game{

    constructor(){
        this.initialize()
        this.generateSequence()
        this.nextLevel()
    }

    initialize(){

        this.chooseColor = this.chooseColor.bind(this)

        this.level = 1

        this.sounds = {
            green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
            red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
            blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
            yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
        }

        this.colors = {

        /*
            Si la variable destino tiene el mismo nombre que la
            variable origen se puede asignar el valor de la siguiente manera:
        */
            verde,
            rojo,
            azul,
            amarillo
        }

        /*
            Si la clase on-button está presente la elimina, de
            lo contrario la añade.
        */

        boton.classList.toggle('on-button');
    }

    generateSequence(){

        /*
            Se genera un arra de caracteres, se rellena cada elemento con ceros,
            despues se usa el método map para remplazar cada elemento por numeros
            aleatorios generado por Math.random.

            + new Array (<1>):
            <1> Número de elementos que vá a tener el Array
            + Método fill(<2>)
            <2> Determina el contenido que va a tener cada elemento
            + Para que map() funcione el array tienen que estar
            definido y contener algún valor.
            + Math.random genera un valor entre cero y uno
            + Math.floor redondea para abajo el número
        */

        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random()*4))
    }

    nextLevel(){
        this.subLevel = 0
        this.startLights()
        this.selectButton()
    }


    numberToLetter(number){
        switch (number) {
            case 0:
                return 'verde'
            case 1:
                return 'rojo'
            case 2:
                return 'azul'
            case 3:
                return 'amarillo'
        }
    }

    letterToNumber(color){
        switch (color) {
            case 'verde':
                return 0
            case 'rojo':
                return 1
            case 'azul':
                return 2
            case 'amarillo':
                return 3
        }
    }

    startLights(){

        // Las variables declaradas con let, únicamente tienen existencia en el
        // bloque de código donde fueron declaradas.

        for(let i = 0; i < this.level; i++){

            setTimeout(() => {
                let color = this.numberToLetter(this.sequence[i])
                this.lightColor(color)
            }, 1000*i)
        }
    }

    lightColor(color){

        this.colors[color].classList.add('light')

        switch (color) {
            case 'verde':
            this.sounds.green.play()
            break;
            case 'rojo':
            this.sounds.red.play()
            break;
            case 'azul':
            this.sounds.blue.play()
            break;
            case 'amarillo':
            this.sounds.yellow.play()
            break;
        }


        setTimeout(() => this.turnOff(color),350)
    }

    turnOff(color){
        this.colors[color].classList.remove('light')
    }

    selectButton(){
        this.colors.verde.addEventListener('click', this.chooseColor)
        this.colors.rojo.addEventListener('click', this.chooseColor)
        this.colors.azul.addEventListener('click', this.chooseColor)
        this.colors.amarillo.addEventListener('click', this.chooseColor)
    }

    deleteEventsClick(){
        this.colors.verde.removeEventListener('click', this.chooseColor)
        this.colors.rojo.removeEventListener('click', this.chooseColor)
        this.colors.azul.removeEventListener('click', this.chooseColor)
        this.colors.amarillo.removeEventListener('click', this.chooseColor)

    }

    chooseColor(ev){

        /*
            Al hacer un console.log(this) se puede comprobar qué elemento
            seleccionado es etiqueta html del elemento respectivo, y no el
            objeto de la clase game.
        */

        // console.log(this)

        /*
            Se debe poner this.chooseColor.bind(this) en el addEventListener
            que se ejecuta en selectButton, para que se apunte al objeto de
            la clase game.
        */

        // Accedemos al data-color del elemento

        const colorName = ev.target.dataset.color

        const colorNumber = this.letterToNumber(colorName)

        this.lightColor(colorName)

        if(colorNumber === this.sequence[this.subLevel]){

            this.subLevel++

            if(this.subLevel === this.level){

                this.level++

                this.deleteEventsClick()

                if(this.level === (LAST_LEVEL + 1)){
                    this.winGame()
                } else{
                    setTimeout(this.nextLevel.bind(this),1500)
                }
            }
        } else{
            this.loseGame()
        }
    }

    winGame() {
        // El swal nos devuelve una promesa
        swal("Buen trabajo!", "Llegaste al último nivel!", "success")
            .then(() =>boton.classList.toggle('on-button'))
    }


    loseGame() {
        // El swal nos devuelve una promesa
        swal("Lo sentimos!", "Perdiste el juego 😭", "error")
            .then(() => {
                this.deleteEventsClick()
                boton.classList.toggle('on-button')
            })
    }
}




function startGame(){
    // Se crea un objeto Game
    var game = new Game()
}
