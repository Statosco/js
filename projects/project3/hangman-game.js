const hangmanImage  = document.querySelector(".hangman-box img");
const wordDisplay  = document.querySelector(".word-display");


const gameModal  = document.querySelector(".game-modal");
const guessesText  = document.querySelector(".guesses-tex b");
const keyboardDiv  = document.querySelector(".keyboard");
const playAgain  = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuestCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuestCount= 0;
    hangmanImage.src = `hangman-${wrongGuestCount}.svg`
    guessesText.innerText = `${wrongGuestCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show")
}

 const getRandomWord = () =>{
    const{word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-tex b").innerText = hint;
    resetGame();
 }

 const gameOver = (isVicory) =>{
    setTimeout(() => {
        const modalText = isVicory ? `you found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `${isVicory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerHTML = `${isVicory ? 'Congrats' : 'Game over'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add("show")
    }, 300);
 }

const initGame = (button, clickedLetter) =>{
    if (currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }else{
        wrongGuestCount++;
        hangmanImage.src = `hangman-${wrongGuestCount}.svg`
    }
    button.disabled = true
    guessesText.innerText = `${wrongGuestCount} / ${maxGuesses}`;

    
    if(wrongGuestCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgain.addEventListener("click", getRandomWord);