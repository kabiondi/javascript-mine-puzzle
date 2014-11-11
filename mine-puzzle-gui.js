// no game rules. GUI only

var minePuzzleGui = function (size) {


	var placeListener = function (td,size,i,j) {
		td.addEventListener('click', function () {
			var bombCountGui = minePuzzleGame(size,i,j);
			td.innerHTML=bombCountGui;
		})
	}


	function makeGui() {

		var minePuzzle = document.getElementById('minePuzzle');

		var table = document.createElement('table');
		table.setAttribute('id','gameTable');
		minePuzzle.appendChild(table);

		var tbody = document.createElement('tbody');
		table.appendChild(tbody);

		for (var i=size-1; i>=0; i--) {
		var tr = document.createElement('tr');		
			tbody.appendChild(tr);

			for (var j=0; j<size; j++) {
			var td = document.createElement('td');			
				td.setAttribute('id','x'+i+'y'+j);
				placeListener(td,size,i,j);
				tr.appendChild(td);
			}
		}
	}
	return makeGui();
}