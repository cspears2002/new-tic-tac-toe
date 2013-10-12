'use strict';

angular.module('newTicApp')
  .controller('MainCtrl', function ($scope, $location, angularFire) {

    // Create an entry called queue for firebase.
    var dbQueue = new Firebase("https://fire-cspears2002-newtic.firebaseio.com/queue/");
    $scope.queue = {};
  	var queuePromise = angularFire(dbQueue, $scope, "queue");

  	queuePromise.then (function () {

  		// Create an entry called rooms for firebase.
  		var dbRooms = new Firebase("https://fire-cspears2002-newtic.firebaseio.com/rooms/");
  		$scope.rooms = {};
  		var roomPromise = angularFire(dbRooms, $scope, "rooms");

  		roomPromise.then (function(){

  			// Deal with multipe players.
  			if ($scope.queue.id == undefined) {
    			console.log("I'm player 1");
    			$scope.player = 'p1';

  				// Push room on to firebase
  				var fbRef = dbRooms.push({
  					board: [
  						[{val:''},{val:''},{val:''}],
    					[{val:''},{val:''},{val:''}],
    					[{val:''},{val:''},{val:''}]
    				],
  					turn: 'p1',
  					moves: 0,
  					radio: 1,
  					waiting: true,
  					win: false,
  				});

  				// Get room id
  				$scope.roomId = fbRef.name();
  				
  				// Show that there is a room available.
  				$scope.queue.id = $scope.roomId;
  				console.log("Player 1's room is: " + $scope.roomId);
  			} else {
  				console.log("I'm player 2");
          		$scope.player = 'p2';

          		// Point player 2 at the proper room and
          		// set the room variables 
          		$scope.roomId = $scope.queue.id;
          		$scope.rooms[$scope.roomId].waiting = false;

          		$scope.radio = $scope.rooms[$scope.roomId].turn;

          		// Clear queue on firebase
          		dbQueue.remove();
          		console.log("Player 2's game is: " + $scope.roomId);
  			}

    		// Styles.
    		$scope.winStyle = {};
    		$scope.winStyle2 = {};
    		$scope.resetStyle = {background: 'green'};

    		// Sets visibility for windows.
    		$scope.resetVisible = {view: true};
    		$scope.gameOverVisible = {view: false};
    		$scope.startGame = {view: false};

    		$scope.addXO = function(cell, room) {
    			if (room.waiting == false && $scope.player == room.turn) {
    				
    				if (room.turn == 'p1' && cell.val != "O") {
							cell.val = "X";
							room.radio = 2;
					}

    				if (room.turn  == 'p2' && cell.val != "X") {
							cell.val = "O";
							room.radio = 1;
					}
					
					room.moves++;

					$scope.identifyWin(room.board, room);

					if (room.turn == 'p1') {
						room.turn = 'p2';
					} else {
						room.turn = 'p1';
					}
				}
  			};

			$scope.identifyWin = function(cellArray, room) {
				if (room.moves == 9)
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
							$scope.changeBgClr(room);		
						}
					}

					// Test columns.
					for(var c = 1; c <= 3; ++c)
					{
						if(cellArray[0][c-1].val == cellArray[1][c-1].val  && 
			   	   	   	   cellArray[1][c-1].val == cellArray[2][c-1].val  && 
		   	   	   	   	   cellArray[0][c-1].val != "")
						{
							$scope.changeBgClr(room);
						}
					}

					// Test rows.
					for(var r = 1; r <= 3; ++r)
					{
						if(cellArray[r-1][0].val == cellArray[r-1][1].val && 
		   	   	   	   	   cellArray[r-1][1].val == cellArray[r-1][2].val && 
		   	   	   	   	   cellArray[r-1][0].val != "")
						{
					 		$scope.changeBgClr(room);
						}
					}
				} 
			};

			$scope.changeBgClr = function(room) {
				room.win = true;

				if (room.turn == 'p1') {
					$scope.winStyle = {background:'#ffff11'};
					$scope.resetVisible.view = true;
				}

				if (room.turn == 'p2') {
					$scope.winStyle2 = {background:'#ffff11'};
					$scope.resetVisible.view = true;
				}

			};

			$scope.pressResetButton= function() {
				$scope.resetStyle = {background: 'red'};
				$scope.resetVisible.view = true;
			};

			$scope.resetGame = function(room) {

				// Set reset button to green.
				$scope.resetStyle = {background: 'green'};

				// Clear board.
				/*
				for(var r = 1; r <=3; ++r)
				{
					for(var c = 1; c <= 3; ++c)
					{	
						room.board[r-1][c-1].val = "";
					}
				}
				*/

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

