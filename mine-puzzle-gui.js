// no game rules. GUI only

var minePuzzleGui = function (size) {


	var placeListener = function (td,size,i,j) {
		td.addEventListener('click', function () {
			var revealedTiles = minePuzzleGame(size,i,j);
			console.log('testing');
			for (var q=0; q<revealedTiles.length; q++) {
				console.log('for loop '+q);
				updateGuiSquare(revealedTiles[q].x,revealedTiles[q].y,revealedTiles[q].bombCount);
			}
			//updateGuiSquare(revealedTiles[0].x,revealedTiles[0].y,revealedTiles[0].bombCount);
		})
	}

	var updateGuiSquare = function (x,y,bombCount) {
		document.getElementById('x'+x+'y'+y).innerHTML=bombCount;
	}

	function makeGui() {

		var minePuzzle = document.getElementById('minePuzzle');

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