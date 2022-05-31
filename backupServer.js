const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');
// const randomWords = require('random-words');

let word = 'pizza'
let wordArray = word.split('');
let foundLetters = new Array(wordArray.length);
let incorrectGuesses = []

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
    let inputLetter = params['letter']
    if('letter' in params){
      if(inputLetter.length == 1 && inputLetter.toUpperCase() !== inputLetter.toLowerCase()){
        wordArray.forEach((el, index) => {
          if(inputLetter === el){ 
            foundLetters[index] = el 
          }
            })
        if(!wordArray.includes(inputLetter)){
          incorrectGuesses.push(inputLetter)
        } ///////////////////////
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          foundLetters: foundLetters,
          incorrectGuesses: incorrectGuesses
        }
        res.end(JSON.stringify(objToJson));
      }
      else{
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          foundLetters: foundLetters,
          incorrectGuesses: incorrectGuesses
        }
        res.end(JSON.stringify(objToJson));
      }
    }
  //     {
  //       res.writeHead(200, {'Content-Type': 'application/json'});
  //       const objToJson = {
  //         name: "leon",
  //         status: "Boss Man",
  //         currentOccupation: "Baller"
  //       }
  //       res.end(JSON.stringify(objToJson));
  //     }//student = leon
  //     else if(params['student'] != 'leon'){
  //       res.writeHead(200, {'Content-Type': 'application/json'});
  //       const objToJson = {
  //         name: "unknown",
  //         status: "unknown",
  //         currentOccupation: "unknown"
  //       }
  //       res.end(JSON.stringify(objToJson));
  //     }//student != leon
  //   }//student if
  }
else if (page == '/css/style.css'){
    fs.readFile('style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('main.js', function(err, data) {
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


    // if('letter' in params){
    //   let inputLetter = params['letter']
    //   //Validate the input: Check if it is one character and it's a letter
    //   if(inputLetter.length == 1 && inputLetter.toUpperCase() !== inputLetter.toLowerCase()){
    //     //interate over each letter in the word you're trying to guess to see if it's equal to the letter guessed
    //     wordArray.forEach((letter, index) => {
    //       if(inputLetter === letter){ 
    //         foundLetters[index] = letter 
    //       }
    //     })
    //   }
