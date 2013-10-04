'use strict';

angular.module('newTicApp')
  .controller('MainCtrl', function ($scope) {

    $scope.ticTacToe = [
    	[{val:''},{val:''},{val:''}],
    	[{val:''},{val:''},{val:''}],
    	[{val:''},{val:''},{val:''}]
    ];

    $scope.winStyle = {};
    $scope.winStyle2 = {};
    $scope.resetStyle = {background:'green'}

    $scope.visible = {view: false};

    $scope.addXO = function(cell) {
		if ($scope.radio == 1 && cell.val != "O")
			cell.val = "X";

		if ($scope.radio == 2 && cell.val != "X")
			cell.val = "O";

		$scope.identifyWin($scope.ticTacToe);
  	};

	$scope.identifyWin = function(cellArray) {
		// Test diagonals
		if (cellArray[1][1].val != "") {
			if ((cellArray[0][0].val == cellArray[1][1].val &&
				 cellArray[1][1].val == cellArray[2][2].val) ||
				(cellArray[0][2].val == cellArray[1][1].val &&
			 	 cellArray[1][1].val == cellArray[2][0].val)) 
			{
				$scope.changeBgClr();		
			}
		}

		// Test columns.
		for(var c = 1; c <= 3; ++c)
		{
			if(cellArray[0][c-1].val == cellArray[1][c-1].val  && 
			   cellArray[1][c-1].val == cellArray[2][c-1].val  && 
		   	   cellArray[0][c-1].val != "")
			{
				$scope.changeBgClr();
			}
		}

		// Test rows.
		for(var r = 1; r <= 3; ++r)
		{
			if(cellArray[r-1][0].val == cellArray[r-1][1].val && 
		   	   cellArray[r-1][1].val == cellArray[r-1][2].val && 
		   	   cellArray[r-1][0].val != "")
			{
				$scope.changeBgClr();
			}
		}
	};

	$scope.changeBgClr = function() {

		if ($scope.radio == 1) {
			$scope.winStyle = {background:'#ffff11'};
			$scope.visible.view = true;
		}

		if ($scope.radio == 2) {
			$scope.winStyle2 = {background:'#ffff11'};
			$scope.visible.view = true;
		}
	};

	$scope.resetGame = function() {
		// Clear board.
		for(var r = 1; r <=3; ++r)
		{
			for(var c = 1; c <= 3; ++c)
			{	
				$scope.ticTacToe[r-1][c-1].val = "";
			}
		}

		// Hide reset popup window
		$scope.visible.view = false;

	};

  });


