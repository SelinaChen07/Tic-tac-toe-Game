//player id is either 1 or 2
//player1's symbol is "x" and player2's symbol is "o"
function Player(id,symbol){	
	this.id = id;
	this.symbol = symbol;
	this.score = 0;
};

var board = {
	//squares are all empty when the game begins
	squares: ["","","","","","","","",""],
	
	//clean the board
	reset: function(){
		this.squares = ["","","","","","","","",""];
		for(var i=0;i<9;i+=1){
			$("#"+i).html("");
		}
	},
	//add either "x" or "o" to one square
	//note: use "board" instead of "this" when call borad.squares because this can be changed in diffreent backgrouds
	addSymbol: function(index,symbol){
		//can only add symbol if this square is empty
		if(!board.squares[index]){
			$("#"+index).html("<div class='" + symbol + "'></div>");
			board.squares[index] = symbol;
		}
	},
	//to see if the board is already full
	ifFull: function(){
		for(var i=0;i<9;i+=1){
			if(!board.squares[i]){return false;}
		}
		return true;
	}
};

var dashBoard ={
	updateScores: function(){
		$("#score1").html(""+game.player1.score);
		$("#score2").html(""+game.player2.score);
		$("#tie").html(""+game.tie);
	}
}

var game = {
	player1: new Player(1,"x"),
	player2: new Player(2,"o"),
	tie:0,
	gameOver: false,

	init:function(){
		board.reset();
		this.currentPlayer = this.player1;
		$('#board').on('click', this.clickHandler);

	},

	restart: function(){
		board.reset();
		this.currentPlayer = this.player1;
		this.gameOver = false;
	},

	//note: use "game" instead of "this" in clickhandler becuase on click event this refers to the element being clicked 
	clickHandler: function(event){
		//restart the game automatically if the game is over
		if(game.gameOver === true){game.restart();}
		//make a move and show on the board
		board.addSymbol($(event.target).attr("id"),game.currentPlayer.symbol);
		//change current player
		game.ifGameOver();
		game.nextPlayer();
	},

	nextPlayer:function(){
		game.currentPlayer = game.currentPlayer===game.player1? game.player2:game.player1;
	},

	//when someone wins or tie, game is over.
	ifGameOver:function(){
		if((board.squares[0] === board.squares[1] && board.squares[1] === board.squares[2] && board.squares[0]) ||
			(board.squares[3] === board.squares[4] && board.squares[4] === board.squares[5] && board.squares[3]) ||
			(board.squares[6] === board.squares[7] && board.squares[7] === board.squares[8] && board.squares[6]) ||
			(board.squares[0] === board.squares[3] && board.squares[3] === board.squares[6] && board.squares[0]) ||
			(board.squares[1] === board.squares[4] && board.squares[4] === board.squares[7] && board.squares[1]) ||
			(board.squares[2] === board.squares[5] && board.squares[5] === board.squares[8] && board.squares[2]) ||
			(board.squares[0] === board.squares[4] && board.squares[4] === board.squares[8] && board.squares[0]) ||
			(board.squares[2] === board.squares[4] && board.squares[4] === board.squares[6] && board.squares[2])){
			alert("Congratulations on player" + game.currentPlayer.id + "! You won!");
			game.currentPlayer.score+=1;
			game.gameOver = true;
			dashBoard.updateScores();
		}else if(board.ifFull()){
			alert("Game over! It is a tie.");
			game.tie+=1;
			game.gameOver = true;
			dashBoard.updateScores();
		}
		return game.gameOver;

	}
};

$(document).ready(function(){
	game.init();
});