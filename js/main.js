document.querySelector('#guessButton').addEventListener('click', makeReq)
document.querySelector('#resetButton').addEventListener('click', reset)

async function makeReq(){
  const guess = document.querySelector("#guess").value;
  const res = await fetch(`/api?letter=${guess}`);
  const data = await res.json();

  console.log(data);
  document.querySelector("#correctGuesses").textContent = data.correctGuesses.join(' '); /////////////////
  document.querySelector("#incorrectGuesses").textContent = data.incorrectGuesses.join(' ');
  if(data.haveTheyWon > 0) document.querySelector("#gameCompleteStatus").textContent = "YOU WIN!!!"
    else if(data.haveTheyWon < 0) document.querySelector("#gameCompleteStatus").textContent = "YOU LOSE!!!"
  
  //reset the input field
  document.querySelector("#guess").value = ""
  document.querySelector("#guess").input.focus()
}

async function reset(){
  
  const guess = document.querySelector("#guess").value;
  const res = await fetch(`/api?`);
  const data = await res.json();

  console.log(data);
  document.querySelector("#correctGuesses").textContent = data.correctGuesses.join(' ');
  document.querySelector("#incorrectGuesses").textContent = data.incorrectGuesses.join(' ');
  // document.querySelector("#tryAgain").value = 'Try Again...'
  document.querySelector("#gameCompleteStatus").value = ""
  //reset the input field
  document
  document.querySelector("#guess").value = ""
}

