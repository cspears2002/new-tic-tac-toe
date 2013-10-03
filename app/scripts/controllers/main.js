'use strict';

angular.module('newTicApp')
  .controller('MainCtrl', function ($scope) {

    $scope.ticTacToe = [
    	['','',''],
    	['','',''],
    	['','','']
    ];

    $scope.box = "";

    $scope.addXO = function() {
		if ($scope.radio == 1 && this.box != "O")
			this.box = "X";

		if ($scope.radio == 2 && this.box != "X")
			this.box = "O";

		$scope.identifyWin($scope.ticTacToe)
  	};

	$scope.identifyWin = function(cellArray) {
		console.log(cellArray)
	
		// Test diagonals
		if (cellArray[1][1] != "") {
			if ((cellArray[0][0] == cellArray[1][1] &&
				 cellArray[1][1] == cellArray[2][2]) ||
				(cellArray[0][2] == cellArray[1][1] &&
			 	 cellArray[1][1] == cellArray[2][0])) 
			{
				$scope.changeBgClr;		
			}
		}

		// Test columns.
		for(var c = 1; c <= 3; ++c)
		{
			if(cellArray[0][c-1] == cellArray[1][c-1]  && 
			   cellArray[1][c-1] == cellArray[2][c-1]  && 
		   	   cellArray[0][c-1] != "")
			{
				$scope.changeBgClr;
			}
		}

		// Test rows.
		for(var r = 1; r <= 3; ++r)
		{
			if(cellArray[r-1][0] == cellArray[r-1][1]  && 
		   	   cellArray[r-1][1] == cellArray[r-1][2]  && 
		   	   cellArray[r-1][0] != "")
			{
				$scope.changeBgClr;
			}
		}
	};

	$scope.changeBgClr = function() {

		radio_container_1 = document.getElementsByClassName("player_1_radio")[0];
		radio_container_2 = document.getElementsByClassName("player_2_radio")[0];

		if ($scope.radio == 1) {
			radio_container_1.style.backgroundColor = '#ffff11';
		}

		if ($scope.radio == 2) {
			radio_container_2.style.backgroundColor = '#ffff11';
		}
	};

  });


function resetGame(element){
	element.style.background = '#ff0000';

	document.getElementById("reset_popup").style.display = "block";
}


