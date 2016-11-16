var minePuzzleBoard;
var recurseArray;

var minePuzzleGame = function (dimension,x,y) {
	size = dimension;

	var selectSquare = function (x,y) {
		var result = [];
		var squareSelected = minePuzzleBoard[x][y];
		
		console.log('line 12 '+x+','+y);
		if (squareSelected.isBomb===true) {
			result.push(squareSelected);
		}
		console.log(squareSelected)
		if (squareSelected.isBomb===false) {
			if (squareSelected.bombCount!=0) {
				result.push(squareSelected);
			}
			else {
				recurseArray = [];
				result = recurseZeros(x,y);
			}
		}
		//console.log('result is '+result);
		console.log(minePuzzleBoard);
		squareSelected.isCrawled=true;
		if (isGameWon()==true) {result = 'game over'};
		return result;
	}

	var isGameWon = function () {
		var placesNotChecked = 0;
		for (var i=0; i<dimension; i++) {
			for (var j=0; j<dimension; j++) {
				var checkSquare = minePuzzleBoard[i][j];
				if (checkSquare.isBomb===false && checkSquare.isCrawled===false) {
					placesNotChecked += 1;
				}
			}
		}
		//console.log('Safe squares remaining: '+placesNotChecked);
		if (placesNotChecked===0) {
			console.log('winner');
			return true;
		};
	}

	var recurseZeros = function (x,y) {

		if (x>dimension-1 || x<0) {return}
		if (y>dimension-1 || y<0) {return}

		var checkSquare = minePuzzleBoard[x][y];

		if (checkSquare.isCrawled) {return}
	
		checkSquare.isCrawled=true;

		if (checkSquare.bombCount===0) {

			for (var r=-1; r<=1; r++)
				for (var s=-1; s<=1; s++)
					recurseZeros(x+r,y+s);
		}

		recurseArray.push(checkSquare);
		return recurseArray;
	}

	// var SquareData = {
	// 	var isBomb = false;
	// 	var bombCount = 0;
	// 	var isCrawled = false
	// }

	var MakeGameAndFirstPlay = function (dimension,x,y) {

		var arrayWithBombs = function () {
			var initArray = [];
			var numOfSquares = dimension*dimension;
			var bombsToGive = Math.floor(numOfSquares*(0.12+(dimension-10)/140)); // ugly, but generates a somewhat scalable bomb ratio
			console.log('bombs to give '+bombsToGive);
			console.log('')
			var k=0;
			var firstClick = x+''+y;
			// make empty array with dimensions
			for (var i=0; i<dimension; i++) {
				initArray.push([]);
				for (var j=0; j<dimension; j++) {
						initArray[i].push({isBomb:false, bombCount:0, isCrawled:false, x:i, y:j});
				}
			}
			// add bombs to the array
			while (k < bombsToGive) {
				var l = Math.floor(Math.random()*(dimension-0.001)); // random x coordinate
				var m = Math.floor(Math.random()*(dimension-0.001)); // random y coordinate
				var currentPlace = l+''+m;

				if (initArray[l][m].isBomb===true || firstClick===currentPlace) {continue}
				initArray[l][m].isBomb=true;
				initArray[l][m].bombCount='';
				k++;
			}
			return initArray;
		}();
		
		var calcNums = function (array) {
			var gameBoard = array;
			var counter = 0;

			for (var i=0; i<dimension; i++) {

				for (var j=0; j<dimension; j++) {
					counter = 0;
					if (gameBoard[i][j].isBomb) continue;
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



var assert = function (claim,message) {
	if (!claim) console.error(message);
}

assert(2+2==5,'I have not written any tests');



