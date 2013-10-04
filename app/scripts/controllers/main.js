'use strict';

angular.module('newTicApp')
  .controller('MainCtrl', function ($scope) {

    $scope.ticTacToe = [
    	['','',''],
    	['','',''],
    	['','','']
    ];

    $scope.winStyle = {};
    $scope.winStyle2 = {};
    $scope.resetStyle = {background:'green'}

    $scope.visible = false;

    $scope.addXO = function(p_index,index) {
		if ($scope.radio == 1 && $scope.ticTacToe[p_index][index] != "O")
			$scope.ticTacToe[p_index][index]  = "X";

		if ($scope.radio == 2 && $scope.ticTacToe[p_index][index]  != "X")
			$scope.ticTacToe[p_index][index]  = "O";

		$scope.identifyWin($scope.ticTacToe);
  	};

	$scope.identifyWin = function(cellArray) {
		// Test diagonals
		if (cellArray[1][1] != "") {
			if ((cellArray[0][0] == cellArray[1][1] &&
				 cellArray[1][1] == cellArray[2][2]) ||
				(cellArray[0][2] == cellArray[1][1] &&
			 	 cellArray[1][1] == cellArray[2][0])) 
			{
				$scope.changeBgClr();		
			}
		}

		// Test columns.
		for(var c = 1; c <= 3; ++c)
		{
			if(cellArray[0][c-1] == cellArray[1][c-1]  && 
			   cellArray[1][c-1] == cellArray[2][c-1]  && 
		   	   cellArray[0][c-1] != "")
			{
				$scope.changeBgClr();
			}
		}

		// Test rows.
		for(var r = 1; r <= 3; ++r)
		{
			if(cellArray[r-1][0] == cellArray[r-1][1]  && 
		   	   cellArray[r-1][1] == cellArray[r-1][2]  && 
		   	   cellArray[r-1][0] != "")
			{
				$scope.changeBgClr();
			}
		}
	};

	$scope.changeBgClr = function() {

		if ($scope.radio == 1) {
			$scope.winStyle = {background:'#ffff11'};
			$scope.visible = true;
		}

		if ($scope.radio == 2) {
			$scope.winStyle2 = {background:'#ffff11'};
			$scope.visible = true;
		}
	};

  });


function resetGame(element){
	element.style.background = '#ff0000';

	document.getElementById("reset_popup").style.display = "block";
}


