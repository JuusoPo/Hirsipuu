const input = document.querySelector('input')
const output = document.querySelector('output')
const span = document.querySelector('span')

const words = [
    "Banaani",
    "Tikkari",
    "Kauris",
    "Naulakko",
    "Tikaspuut",
    "Virtuaalitodellisuus",
    "Elokuvateatteri"
]

let randomizedWord = ''
let maskedWord = ''
let totalGuesses = 0
let wrongGuesses = 0

const newGame = () => {
    const random = Math.floor(Math.random() * words.length)
    randomizedWord = words[random]
    maskedWord = "*".repeat(randomizedWord.length)
    console.log(randomizedWord)
    output.innerHTML = maskedWord
    totalGuesses = 0
    wrongGuesses = 0
    span.innerHTML = totalGuesses
}


const win = () => {
    alert(`Arvasit oikein, oikea sana on ${randomizedWord}! Käytit ${totalGuesses} arvausta joista ${wrongGuesses} oli väärin`)
    newGame()
}

const replaceFoundChars = (guess) => {
    let found = false
    for (let i = 0;i<randomizedWord.length;i++) {
        const char = randomizedWord.substring(i,i+1)
        if (char.toLowerCase() === guess.toLowerCase()) {
            let newString = maskedWord.split('')
            newString.splice(i, 1, char)
            newString = newString.join('')
            maskedWord = newString
            found = true
        }
    }
    output.innerHTML = maskedWord
    return found
}

newGame()

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()

        const guess = input.value.trim()
        if (guess.length === 0) return

        totalGuesses++
        span.innerHTML = totalGuesses

        if (guess.length === 1) {
            const found = replaceFoundChars(guess)
            if (!found) {
                wrongGuesses++
            }
            if (maskedWord.toLowerCase() === randomizedWord.toLowerCase()) {
                win()
            }
        } else if (guess.toLowerCase() === randomizedWord.toLowerCase()) {
            win()
        } else {
            alert("Arvasit väärin!")
            wrongGuesses++
        }

        input.value = ''
    }
})