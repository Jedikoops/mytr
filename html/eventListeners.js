


document.addEventListener('DOMContentLoaded', function() {
  //This is called after the browser has loaded the web page

  //add mouse down listener to our canvas object
  document.getElementById('canvas1').addEventListener('mousedown', handleMouseDown)

  document.getElementById('solve_button').addEventListener('click', handleSolveButton)

  //add key handler for the document as a whole, not separate elements.
  // document.addEventListener('keydown', handleKeyDown)
  // document.addEventListener('keyup', handleKeyUp)

  randomizeWordArrayLocations(words) //PROBLEM 1 ANSWER CODE

  //PROBLEM 4
  //ask server for a list of the puzzles it has.
  handleRequestForPuzzlesList()
  document.getElementById('puzzle_select_menu_id').addEventListener('change', handlePuzzleMenuSelectionChange)

  drawCanvas()
})
