'use strict';

angular.module('newTicApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

/*
function attachFunction() {
	var boxes = document.getElementsByClassName("box");
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].onclick = addXO;
	};
}

function resetGame(element){
	element.style.background = '#ff0000';

	document.getElementById("reset_popup").style.display = "block";
}

function addXO(){

	var rd_plyer_1 = document.getElementById('player_1');
	var rd_plyer_2 = document.getElementById('player_2');

	if (rd_plyer_1.checked && event.target.innerHTML != "O")
		event.target.innerHTML = "X";

	if (rd_plyer_2.checked && event.target.innerHTML != "X")
		event.target.innerHTML = "O";

	identifyWin(rd_plyer_1, rd_plyer_2);
}

function identifyWin(rd_button_1, rd_button_2) {
	var cellArray = [["","",""],["","",""],["","",""]];
	for (var r = 1; r <= 3 ; ++r)
	{
		for(var c = 1; c <= 3; ++c) 
		{
			var div_id = "box" + r + "_" + c;
			cellArray[r-1][c-1] = document.getElementById(div_id).innerHTML;
		}
	}

	// Test diagonals
	if (cellArray[1][1] != "") {
		if ((cellArray[0][0] == cellArray[1][1] &&
			 cellArray[1][1] == cellArray[2][2]) ||
			(cellArray[0][2] == cellArray[1][1] &&
			 cellArray[1][1] == cellArray[2][0])) {
				// win_popup.innerHTML = cellArray[1][1] + " won.";
				// win_popup.style.display = "block";
				if (rd_button_1.checked) {
					document.getElementById("player_1_radio").style.background = 'ff0000';
				}
		}
	}

	// Test columns.
	for(var c = 1; c <= 3; ++c)
	{
		if(cellArray[0][c-1] == cellArray[1][c-1]  && 
		   cellArray[1][c-1] == cellArray[2][c-1]  && 
		   cellArray[0][c-1] != "")
		{
			win_popup.innerHTML = cellArray[0][c-1] + " won in column " + c;
			win_popup.style.display = "block";
		}
	}

	// Test rows.
	for(var r = 1; r <= 3; ++r)
	{
		if(cellArray[r-1][0] == cellArray[r-1][1]  && 
		   cellArray[r-1][1] == cellArray[r-1][2]  && 
		   cellArray[r-1][0] != "")
		{
			win_popup.innerHTML = cellArray[r-1][0] + " won in row " + r;
			win_popup.style.display = "block";
		}
	}
}
*/