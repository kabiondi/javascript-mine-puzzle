// no game rules. GUI only

var minePuzzleGui = function (size) {
	minePuzzleBoard = null;

	var placeListener = function (td,size,i,j) {
		td.addEventListener('click', function () {

			var revealedTiles = minePuzzleGame(size,i,j);
			if (revealedTiles=='game over') {
				endGame();
			}
			for (var q=0; q<revealedTiles.length; q++) {
				if (revealedTiles[q].isBomb && revealedTiles[q].isCrawled) 
					endGame();
				else
					showSquareGui(revealedTiles[q].x,revealedTiles[q].y,revealedTiles[q].bombCount);
			}
		});
	}

	var showSquareGui = function (x,y,bombCount) {
		var td=document.getElementById('x'+x+'y'+y);
		td.innerHTML=bombCount;
		switch (bombCount) {
			// sets classes to color numbers
			case 0:
				td.setAttribute('class','checked bombs-zero');
				break;
			case 1:
				td.setAttribute('class','checked bombs-one');
				break;
			case 2:
				td.setAttribute('class','checked bombs-two');
				break;
			case 3:
				td.setAttribute('class','checked bombs-three');
				break;
			case 4:
				td.setAttribute('class','checked bombs-four');
				break;
			case 5:
				td.setAttribute('class','checked bombs-five');
				break;
			case 6:
				td.setAttribute('class','checked bombs-six');
				break;
			case 7:
				td.setAttribute('class','checked bombs-seven');
				break;
			case 8:
				td.setAttribute('class','checked bombs-eight');
				break;
		}
	}

	var endGame = function () {
		var allTiles = minePuzzleBoard;
		var gameWon=true;
		for (var t=0; t<size; t++) {
			for (var u=0; u<size; u++) {
				if (allTiles[t][u].isBomb && allTiles[t][u].isCrawled) {
					var td=document.getElementById('x'+t+'y'+u);
					td.innerHTML=allTiles[t][u].bombCount;
					td.setAttribute('class','explode');
					gameWon=false;
				}
				else showSquareGui(t,u,allTiles[t][u].bombCount);
			}
		}
		if (gameWon==true) {
			alert('You won!')
		}
		else {
			alert('Uh oh! You were bombed.');	
		}
		
	}

	function makeGui() {

		var minePuzzle = document.getElementById('minePuzzle');
		if (document.getElementById('gameTable')) {
			// clear out gameTable if one exists
			var clearMinePuzzle = document.getElementById('gameTable');
			clearMinePuzzle.parentNode.removeChild(clearMinePuzzle);	
		}


		var table = document.createElement('table');
		table.setAttribute('id','gameTable');
		minePuzzle.appendChild(table);

		var tbody = document.createElement('tbody');
		table.appendChild(tbody);

		//for (var i=0; i<size; i++) {
		for (var i=size-1; i>=0; i--) {
		var tr = document.createElement('tr');		
			tbody.appendChild(tr);

			//for (var j=size-1; j>=0; j--) {
			for (var j=0; j<size; j++) {	
			var td = document.createElement('td');			
				td.setAttribute('id','x'+j+'y'+i); // i and j switched to keep DOM coordinates correct
				placeListener(td,size,j,i); // i and j switched to keep DOM coordinates correct
				tr.appendChild(td);
			}
		}
	}
	return makeGui();
}