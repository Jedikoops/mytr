function handleSolveButton(){
  let puzzleSolve = false
  let userHTML = ""
  let correctWords = []
  
  
  for(let i = 0; i < words.length; i++){ // canvas clean up
    let pxLineHeight = 33
    let remainder = words[i].y % pxLineHeight;

    words[i].y -= remainder - Math.floor(pxLineHeight/2)
  }

  words.sort((vOne, vTwo) => vOne.y - vTwo.y || vOne.x - vTwo.x) //sort, y first, x next

  let row = -1

  if(puzzle.includes("-letter scramble.txt")){
    console.log("AHFGSDGHSFIHFWEFW")
  }

  for(let i = 0; i < words.length; i++){ // adding breaks in the userHTML between lines
    if(row != words[i].y && i != 0){
      row = words[i].y
      userHTML += "<br>"
    }else if(i == 0){
      row = words[i].y
    }
    if(puzzle.includes("-letter scramble.txt")){
      userHTML += words[i].word
    }else{
      userHTML += words[i].word + " "
    }
  }

  ///////////////////////////////////

  let userText = puzzle

  if (userText && userText != '') {

    let userRequestObj = {
      text: userText
    }
    let userRequestJSON = JSON.stringify(userRequestObj)
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //we are expecting the response text to be a JSON string
        let responseObj = JSON.parse(this.responseText)
        //==========PROBLEM 2 ANSWER CODE
        if (responseObj.puzzleLines) {
          
          for (line of responseObj.puzzleLines) {
            lineWords = line.split(" ")
            let col = getRandomColor()
            for (w of lineWords) {
              let word = {
                word: w,
              }
              correctWords.push(word)
            }
          }
        }
        console.log("meow meow meow")
        console.log(correctWords)
        for(let i = 0; i<correctWords.length; i++){
          if(correctWords[i].word == words[i].word){
            puzzleSolve = true
          }else{
            puzzleSolve = false
            break;
          }
        }

        if (puzzleSolve) {
          let textDiv = document.getElementById("text-area")
          document.getElementById("text-area").style.color = 'green';
          document.getElementById("text-area").style.fontSize = '20pt';
          document.getElementById("text-area").style.fontFamily = 'Courier, monospace';
          document.getElementById("text-area").style.fontWeight = 'bold';
          textDiv.innerHTML = `<p> ${userHTML}</p>`
        }
        else{
          let textDiv = document.getElementById("text-area")
          document.getElementById("text-area").style.color = 'red';
          document.getElementById("text-area").style.fontSize = '20pt';
          document.getElementById("text-area").style.fontFamily = 'Courier, monospace';
          document.getElementById("text-area").style.fontWeight = 'bold';
          textDiv.innerHTML = `<p> ${userHTML}</p>`
        }
      
        drawCanvas()
      }
    }
    xhttp.open("POST", "userText") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
  }


}


function handlePuzzleRequest(userText) {
  //let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {

    let userRequestObj = {
      text: userText
    }
    let userRequestJSON = JSON.stringify(userRequestObj)

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //we are expecting the response text to be a JSON string
        let responseObj = JSON.parse(this.responseText)
        //==========PROBLEM 2 ANSWER CODE
        if (responseObj.puzzleLines) {
          words = [] //clear words on canvas
          for (line of responseObj.puzzleLines) {
            lineWords = line.split(" ")
            let col = getRandomColor()
            for (w of lineWords) {
              let box = {
                height: 24,
                width: 50,
              }
              let word = {
                word: w,
                colour: col,
                isSelected: false,
                myBox: box
              }


              assignRandomIntCoords(word, canvas.width, canvas.height)
              let randomIndex = Math.floor(Math.random()* (words.length + 1));
              
              words.splice(randomIndex, 0, word)
            }
          }
        }
        //==============================

        drawCanvas()
      }

    }
    xhttp.open("POST", "userText") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
  }
}

//PROBLEM 4 ANSWER CODE===========================
function handleRequestForPuzzlesList() {

  const REQUEST_TEXT = 'puzzlesListRequest'

  let userRequestObj = {text: REQUEST_TEXT}

  let userRequestJSON = JSON.stringify(userRequestObj)

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("data: " + this.responseText)
        console.log("typeof: " + typeof this.responseText)
        //we are expecting the response text to be a JSON string
        let responseObj = JSON.parse(this.responseText)
        console.dir(responseObj) //pretty print response data to console.
        let puzzleList = responseObj.puzzleFiles
        let puzzleSelectMenu = document.getElementById('puzzle_select_menu_id')

        for(let i in puzzleList){
          puzzleSelectMenu.innerHTML += `<option value='${puzzleList[i]}'>${puzzleList[i]}</option>`
        }
      drawCanvas()
      }
    }
    xhttp.open("POST", REQUEST_TEXT) //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
}

function handlePuzzleMenuSelectionChange(e){
  e.preventDefault()
  e.stopPropagation()
  console.log('PUZZLE SELECT MENU CHANGE' + e)
  console.log(e.currentTarget.value)
  handlePuzzleRequest(e.currentTarget.value)
  puzzle = e.currentTarget.value
}
