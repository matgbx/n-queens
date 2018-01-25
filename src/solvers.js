/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};


window.findNRooksSolution = function(n) {
  // make a possible array of all indices using n - for loop
  var possibleI = [...Array(n).keys()];
  // make empty matrix
  var board = makeEmptyMatrix(n);
  
  // function([array of colIndices], rowIndex (n-1))      {
  var createBoard = function (arrayOfColIndices, rowsRemaining) {
    // if rows < 0 { 
    if (rowsRemaining < 0) {
      
      //return out of func
      return;
    }
    
    // for loop (i = 0 ... i < rowIndex){
    for (var i = 0; i < arrayOfColIndices.length; i++) {
      var colIndex = arrayOfColIndices[i];
      //in our nested array matrix,
      //find row & column index
        //set value to 1
      board[rowsRemaining][colIndex] = 1;
      
      // function (possible (splice[i]), rows -1);
      var updatedColIndices = arrayOfColIndices.slice();
      updatedColIndices.splice(i, 1);
      //recurse the function w/ new imputs
      createBoard(updatedColIndices, (rowsRemaining - 1));
      break;
    }
  };
  
  
  // run function on (possiblesArray, n -1);
  createBoard(possibleI, n - 1);

  // return matrix solution
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board;
};






// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
