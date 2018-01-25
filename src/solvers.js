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
// time complexity: quadratic


//return an array filled with 0s of n length
var makeEmptyRow = function(n) {
  return _(_.range(n)).map(function() {
    return 0;
  });
};
//time complexity: linear



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
//time complexity: exponential (nested n loops)



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
    // make a possible array of all indices using n - for loop
  var possibleI = [...Array(n).keys()];
  // make empty matrix
  var board = makeEmptyMatrix(n);
  
  // function([array of colIndices], rowIndex (n-1))      {
  var createBoard = function (arrayOfColIndices, rowsRemaining) {
    // if rows < 0 { 
    if (rowsRemaining < 0) {
      solutionCount++;
      //return out of func
      return;
    }
    
    // for loop (i = 0 ... i < rowIndex){
    for (var i = 0; i < arrayOfColIndices.length; i++) {
      
      //to reduce speed, stop running the function when we're halfway through 
      //the possibilities and double the count.
      //is n even?
      var evenBoard = n % 2 === 0;
      //are we on the row we started on?
      var firstRow = rowsRemaining === n - 1;
      //is i === rowsRemaining / 2
      var halfwayOdd = rowsRemaining / 2 === i;
      //is i > rowsRemaining / 2
      var oddLastColumn = (rowsRemaining / 2) === (i - 1);
      var halfway = rowsRemaining / 2 < i;
      //if n is even & we're halfway through first row
      if (evenBoard && firstRow && halfway) {
        //double solutions
        solutionCount *= 2;
        //stop recursing
        return; 
        //if we're about to start the middle col of first row  w/ an odd n
      } else if (firstRow && halfwayOdd) {
        //double the current solution & continue
        solutionCount *= 2;
        //if we've just finished the middle col of the first row w/ an odd n
      } else if (firstRow && oddLastColumn) {
        //stop the loop
        return;
      }
      //reset current row to all zeros
      board[rowsRemaining] = makeEmptyRow(n);
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
    }
  };
  
  // run function on (possiblesArray, n -1);
  createBoard(possibleI, n - 1);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
//time complexity: exponential (nested n loops)



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // make a possible array of all indices using n - for loop
  var possibleI = [...Array(n).keys()];
  // make empty matrix
  var matrix = makeEmptyMatrix(n);
  var solution = matrix.slice();
  
  // function([array of colIndices], rowIndex (n-1))      {
  var createBoard = function (arrayOfColIndices, rowsRemaining) {
    // if rows < 0 { 
    if (rowsRemaining < 0) {
      //create board using matrix
      var testBoard = new Board(matrix);
      //test both diagonals on board
      var truthTest = !testBoard.hasAnyMajorDiagonalConflicts() && !testBoard.hasAnyMinorDiagonalConflicts();
      
      if (truthTest) {
        //if both tests return false, it's a valid solution
        solution = matrix.slice();
      }
      //return out of func
      return truthTest;
    }
    
    // for loop (i = 0 ... i < rowIndex){
    for (var i = 0; i < arrayOfColIndices.length; i++) {
      //reset current row to all zeros
      matrix[rowsRemaining] = makeEmptyRow(n);

      var colIndex = arrayOfColIndices[i];
      //in our nested array matrix,
      //find row & column index
        //set value to 1
      matrix[rowsRemaining][colIndex] = 1;
      
      // function (possible (splice[i]), rows -1);
      var updatedColIndices = arrayOfColIndices.slice();
      updatedColIndices.splice(i, 1);
      //recurse the function w/ new imputs
      
      var foundSolution = createBoard(updatedColIndices, (rowsRemaining - 1));
      if (foundSolution) {
        return foundSolution;
      }
    }
  };
  // run function on (possiblesArray, n -1);
  createBoard(possibleI, n - 1);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
//time complexity: exponential (nested n loops)






// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  
  //make an array of colIndex possibilities (0 -n)
  var possibleI = [...Array(n).keys()];
  //make an empty matrix
  var matrix = makeEmptyMatrix(n);
  
  //make recursive function takes in two arguments: possible col indices & rows remaining
  var findSolutions = function (colIndexArray, rowsRemaining) {
    //base case! if num of rows < 0
    if (rowsRemaining < 0) {
      //transform matrix into board
      var testBoard = new Board(matrix);
      // create truth variable and test both diagonals
      var truthTest = !testBoard.hasAnyMajorDiagonalConflicts() && !testBoard.hasAnyMinorDiagonalConflicts();
      // if both pass, increase solution count
      if (truthTest) {
        solutionCount++;
      }
      return;
    }
    //iterate through available col indices
    for (var i = 0; i < colIndexArray.length; i++) {
      //to reduce speed, stop running the function when we're halfway through 
      //the possibilities and double the count.
      //is n even?
      var evenBoard = n % 2 === 0;
      //are we on the row we started on?
      var firstRow = rowsRemaining === n - 1;
      //is i === rowsRemaining / 2
      var halfwayOdd = rowsRemaining / 2 === i;
      //is i > rowsRemaining / 2
      var oddLastColumn = (rowsRemaining / 2) === (i - 1);
      var halfway = rowsRemaining / 2 < i;
      //if n is even & we're halfway through first row
      if (evenBoard && firstRow && halfway) {
        //double solutions
        solutionCount *= 2;
        //stop recursing
        return; 
        //if we're about to start the middle col of first row  w/ an odd n
      } else if (firstRow && halfwayOdd) {
        //double the current solution & continue
        solutionCount *= 2;
        //if we've just finished the middle col of the first row w/ an odd n
      } else if (firstRow && oddLastColumn) {
        //stop the loop
        return;
      }
      
      //clear the current row
      matrix[rowsRemaining] = makeEmptyRow();
      //make a variable for column index
      var colIndex = colIndexArray[i];
      //set matrix at row and column to 1
      matrix[rowsRemaining][colIndex] = 1;
      //copy possible column indices
      var updatedColIndices = colIndexArray.slice();
      //splice the column index used
      updatedColIndices.splice(i, 1);
      //recall the function with new colum index possibles and rows -1
      findSolutions(updatedColIndices, rowsRemaining - 1);
    }
  };
    
  //call recursive function on array of col index & rows = n-1
  findSolutions(possibleI, n - 1);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



console.log(countNQueensSolutions(9));