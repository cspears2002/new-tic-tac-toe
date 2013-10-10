'use strict';

angular.module('newTicApp')
  .controller('MainCtrl', function ($scope, $location, angularFire) {

    // Create a queue and hook to firebase.
    $scope.queue = {};
    var dbQueue = new Firebase("https://fire-cspears2002-newtic.firebaseio.com/queue/");
  	var queuePromise = angularFire(dbQueue, $scope, "queue", {});

  	queuePromise.then (function () {

    	// Hook up Firebase and build a room.
    	$scope.ticTacToe = [
    		[{val:''},{val:''},{val:''}],
    		[{val:''},{val:''},{val:''}],
    		[{val:''},{val:''},{val:''}]
    	];

    	$scope.turn = 1;
    	$scope.numPlayers = 0;
  		$scope.room = {
  			board: $scope.ticTacToe,
  			turn: $scope.turn,
  			numPlayers: $scope.numPlayers
  		}

  		// Push rooms on to firebase.
  		var dbRooms = new Firebase("https://fire-cspears2002-newtic.firebaseio.com/rooms/");
  		var roomPromise = angularFire(dbRooms, $scope, "rooms");

  		roomPromise.then (function(){

  			var fbRef = dbRooms.push($scope.room);
  			var roomId = fbRef.name();
  			// Push on to firebase
  			dbQueue.push({id: roomId});

    		// Styles.
    		$scope.winStyle = {};
    		$scope.winStyle2 = {};
    		$scope.resetStyle = {background: 'green'};

    		// Sets visibility for windows.
    		$scope.resetVisible = {view: true};
    		$scope.gameOverVisible = {view: false};
    		$scope.startGame = {view: false};

    		$scope.addXO = function(cell, turnObj) {

    			if (turnObj.number % 2 == 0)
    			{
    				$scope.radio = 2;
    			}
    			else
    			{
    				$scope.radio = 1;
    			}

				if ($scope.radio == 1 && cell.val != "O")
					cell.val = "X";
	
				if ($scope.radio == 2 && cell.val != "X")
					cell.val = "O";
			
				$scope.identifyWin($scope.ticTacToe, turnObj);
  			};

			$scope.identifyWin = function(cellArray, turnObj) {
				if (turnObj.number == 9)
				{
					$scope.winStyle = $scope.winStyle2 = {background:'#ffff11'};
					$scope.resetVisible.view = true;
				}
				else
				{
					// Test diagonals
					if (cellArray[1][1].val != "") 
					{
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

					// Increment turn counter if the tests don't find a win.
					turnObj.number++;

					if (turnObj.number % 2 == 0)
    				{
    					$scope.radio = 2;
    				}
    				else
    				{
    					$scope.radio = 1;
    				}
				} 
			};

			$scope.changeBgClr = function() {

				if ($scope.radio == 1) {
					$scope.winStyle = {background:'#ffff11'};
					$scope.resetVisible.view = true;
				}

				if ($scope.radio == 2) {
					$scope.winStyle2 = {background:'#ffff11'};
					$scope.resetVisible.view = true;
				}
			};

			$scope.pressResetButton= function() {
				$scope.resetStyle = {background: 'red'};
				$scope.resetVisible.view = true;
			};

			$scope.resetGame = function() {

				// Reset the radio buttons.
				$scope.radio = 1;

				// Set reset button to green.
				$scope.resetStyle = {background: 'green'};

				// Clear board.
				for(var r = 1; r <=3; ++r)
				{
					for(var c = 1; c <= 3; ++c)
					{	
						$scope.ticTacToe[r-1][c-1].val = "";
					}
				}

				// Hide reset popup window
				$scope.resetVisible.view = false;

				// Reset radio button backgrounds
				$scope.winStyle = {};
    			$scope.winStyle2 = {};

			};

			$scope.gameOver = function() {
				$scope.resetVisible.view = false;
				$scope.gameOverVisible.view = true;
			};

  		});
	});
});

