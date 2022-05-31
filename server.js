const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

let word = 'PIZZA'
let wordArray = word.split('');
let correctGuesses = new Array(wordArray.length).fill(" ");
let incorrectGuesses = []
let haveTheyWon = 0
const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('letter' in params){
      let inputLetter = params['letter'].toUpperCase()
      //Validate the input: Check if it is one character and it's a letter
      if(inputLetter.length == 1 && inputLetter.toUpperCase() !== inputLetter.toLowerCase() && haveTheyWon == 0){
        //interate over each letter in the word you're trying to guess to see if it's equal to the letter guessed
        wordArray.forEach((letter, index) => {
          if(inputLetter === letter){ 
            correctGuesses[index] = letter 
          }
        })
        //Check to see if is complete
        if(!correctGuesses.includes(" ")) haveTheyWon = 1;
        //Check if the guess is wrong.  If so, add it to the incorrectGuesses if they have not already guess that letter
        if(!wordArray.includes(inputLetter) && !incorrectGuesses.includes(inputLetter)){
          incorrectGuesses.push(inputLetter)
        } 
        //Check if they have guessed incorrectly 6 times and therefore lost.
        if(incorrectGuesses.length > 5) haveTheyWon = -1;  
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          correctGuesses: correctGuesses,
          incorrectGuesses: incorrectGuesses,
          haveTheyWon: haveTheyWon
        }
        res.end(JSON.stringify(objToJson));
      }//end of input validation
      else{
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          correctGuesses: correctGuesses,
          incorrectGuesses: incorrectGuesses,
          haveTheyWon: haveTheyWon
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
    else{
      //Reset all values
      correctGuesses = new Array(wordArray.length).fill(" ");
      incorrectGuesses = []
      haveTheyWon = 0

      //Send information back
      res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          correctGuesses: correctGuesses,
          incorrectGuesses: incorrectGuesses,
          haveTheyWon: haveTheyWon
        }
        res.end(JSON.stringify(objToJson));
    }
  }//api else if
  else if (page == '/css/reset.css'){
    fs.readFile('css/reset.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);

///////////  **TO DO**  ////////////
/*
---Must Add----
Add styling
Need reset button to refresh page


----Would be nice----
Add images
Autofocus the cursor after an input.
Way to randomize words



*/