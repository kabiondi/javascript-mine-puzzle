var minePuzzleBoard;
var size; // used for showBoard - this needs to go away

var minePuzzleGame = function (dimension,x,y) {
	size = dimension; // used for showBoard - this needs to go away

	var selectSquare = function (x,y) {
		var result = '';
		var squareSelected = minePuzzleBoard[y][x]; // switch x and y
		squareSelected.isCrawled=true;
		isGameOver();
		console.log('line 12 '+x+','+y);
		if (squareSelected.isBomb===true) {
			result = squareSelected.isBomb;
		}
		console.log(squareSelected)
		if (squareSelected.isBomb===false) {
			result = squareSelected.bombCount;
		}
		//console.log('result is '+result);
		//console.log(minePuzzleBoard);
		return result;
	}

	var isGameOver = function () {
		var placesNotChecked = 0;
		for (var i=0; i<dimension; i++) {
			for (var j=0; j<dimension; j++) {
				var checkSquare = minePuzzleBoard[i][j];
				if (checkSquare.isBomb===true && checkSquare.isCrawled===true) {
					alert("BOMB!");
				}
				if (checkSquare.isBomb===false && checkSquare.isCrawled===false) {
					placesNotChecked += 1;
				}
			}
		}
		//console.log('Safe squares remaining: '+placesNotChecked);
		if (placesNotChecked===0) alert('YOU WON!');
	}

	var recurseZeros = function (x,y) {
		var checkSquare = minePuzzleBoard[x][y];

	}

	// var SquareData = {
	// 	var isBomb = false;
	// 	var bombCount = 0;
	// 	var isCrawled = false
	// }

	var MakeGameAndFirstPlay = function (dimension,x,y) {

		var arrayWithBombs = function () {
			var initArray = [];
			var bombsToGive = 10;
			var k=0;
			var firstClick = x+''+y;
			// make empty array with dimensions
			for (var i=0; i<dimension; i++) {
				initArray.push([]);
				for (var j=0; j<dimension; j++) {
						initArray[i].push({isBomb:false, bombCount:0, isCrawled:false});
				}
			}
			// add bombs to the array
			while (k < bombsToGive) {
				var l = Math.floor(Math.random()*7.999); // random number between 1 and 8
				var m = Math.floor(Math.random()*7.999); // random number between 1 and 8
				var currentPlace = l+''+m;

				if (initArray[l][m].isBomb===true || firstClick===currentPlace) {continue}
				initArray[l][m].isBomb=true;
				k++;
			}
			return initArray;
		}();
		
		var calcNums = function (array) {
			var gameBoard = array; //gameArray();
			var counter = 0;

			for (var i=0; i<dimension; i++) {

				for (var j=0; j<dimension; j++) {
					counter = 0;
					for (var k=i-1; k<i+2; k++) {

						for (var l=j-1; l<j+2; l++) {
							if (!(k<0 || k>dimension-1)) {
								if (!(l<0 || l>dimension-1)) {
									if (gameBoard[k][l].isBomb) {counter += 1}
								}
							}
						}
					}
					gameBoard[i][j].bombCount = counter;
				}
			}
			return gameBoard;
		}
		minePuzzleBoard = calcNums(arrayWithBombs);
		console.log('board array created');
	}
	if (!minePuzzleBoard) {
		MakeGameAndFirstPlay(dimension,x,y);
	}
	return selectSquare(x,y);
}





//==============development

var showBoard = function () {
	// for development only
	console.log(minePuzzleBoard);
	for (var i=size-1; i>=0; i--) { // runs backward to show x-y coordinates correctly
		var boardRow = [];
		for (var j=0; j<size; j++) {
			if (!minePuzzleBoard[i][j].isBomb) {boardRow.push(minePuzzleBoard[i][j].bombCount)}
			if (minePuzzleBoard[i][j].isBomb) {boardRow.push('o')}
		}
	console.log(boardRow);
	}
}

//==============tests

var assert = function (claim,message) {
	if (!claim) console.error(message);
}

assert(2+2==5,'I have not written any tests');



