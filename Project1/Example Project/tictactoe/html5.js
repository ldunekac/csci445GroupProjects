var turn = 1;
window.onload = function(){
	
	//Create 9 canvases for the 9 squares in the game
	for(i=0;i<9;i++){
		var c = document.createElement("canvas");
		c.setAttribute('id','newcanvas'+(i+1));			//Give the canvas a unique ID
		c.setAttribute('width',150);					//Set the width and height of the cavas
		c.setAttribute('height',150);
		c.className = i;								//Give the canvas a unique Class (needed for later use)
		
		c.onmouseover = pickturn;						//Tie the DOM events for each canvas to a function
		c.onmouseout = erase_moves;
		c.onclick = make_move;
		
		document.getElementById("tictactoe_board").appendChild(c);		//Add the canvas to the division
		
		//Make some HTML5 modifications to each canvas
		var ctx=c.getContext('2d');								//Get the context - needed for HTML5 manipulation
		ctx.fillStyle='#FFFFFF';								//Make it blank to begin with
		ctx.fillRect(i%3,0,148,148);							//Shape it
	}
	
	//Connect the reset button to its function
	document.getElementById("reset").onclick = reset;
}


function terminate_game(){
	for(var i=1; i<10; i++){
		if(document.getElementById("newcanvas"+i.toString()).className != "x" && document.getElementById("newcanvas"+i.toString()).className != "o"){
			var n = document.getElementById("newcanvas"+i.toString());
			var difference = (n.id.substring(n.id.length - 1))%3;
			var amt = 0;
			if(difference == 1)
				amt = 0;
			else if(difference == 2)
				amt = 1;
			else
				amt = 2;
			n.className = "over";
			var ntx = n.getContext('2d');
			ntx.fillStyle='#DDDDDD';
			ntx.fillRect(3%3+amt,0,148,148);
		}
	}
}

function erase_moves(){
	var difference = (this.id.substring(this.id.length - 1))%3;
	var amt = 0;
	if(difference == 1)
		amt = 0;
	else if(difference == 2)
		amt = 1;
	else
		amt = 2;
	if(this.className != "x" && this.className != "o" && this.className != "over"){
		var n = document.getElementById(this.id);
		var ntx=n.getContext('2d');
		ntx.fillStyle='#FFFFFF';
		ntx.fillRect(3%3+amt,0,148,148);
	}
}

function check_win(){

	//Horizontal
	for(var i=1; i<10; i+=3){
		if(document.getElementById("newcanvas"+i.toString()).className == document.getElementById("newcanvas"+(i+1)).className
			&& document.getElementById("newcanvas"+i.toString()).className == document.getElementById("newcanvas"+(i+2)).className){
			terminate_game();
			alert("Game Over - Player '" + document.getElementById("newcanvas"+i.toString()).className.toUpperCase() + "'wins!");
			return 0;
		}
	}
	//Vertical
	for(var i=1; i<4; i++){
		if(document.getElementById("newcanvas"+i.toString()).className == document.getElementById("newcanvas"+(i+3)).className
			&& document.getElementById("newcanvas"+i.toString()).className == document.getElementById("newcanvas"+(i+6)).className){
			alert("Game Over - Player '" + document.getElementById("newcanvas"+i.toString()).className.toUpperCase() + "' " + "wins!");
			terminate_game();
			return 0;
		}
	}
	//Diagonal
	if((document.getElementById("newcanvas1").className == document.getElementById("newcanvas5").className
			&& document.getElementById("newcanvas1").className == document.getElementById("newcanvas9").className)
			|| (document.getElementById("newcanvas3").className == document.getElementById("newcanvas5").className
			&& document.getElementById("newcanvas3").className == document.getElementById("newcanvas7").className)){
			alert("Game Over - Player '" + document.getElementById("newcanvas5").className.toUpperCase() + "'wins!");
			terminate_game();
			return 0;
		}
	var numopen = 9;
	for(var i=1; i<10; i++){
		if(document.getElementById("newcanvas"+i.toString()).className == "x" || document.getElementById("newcanvas"+i.toString()).className == "o")
			numopen--;
	}
	if(numopen == 0){
		alert("Game Over - It's a tie!");
		return 0;
	}
	
	
}

function make_move(){
	if(this.className != "x" && this.className != "o" && this.className != "over"){
		var n = document.getElementById(this.id);
		var ntx=n.getContext('2d');
		if(turn%2 == 1)
			this.className = "x";
		else
			this.className = "o";
		turn++;
		check_win()
	}
}

function pickturn(){
	if(this.className != "x" && this.className != "o" && this.className != "over"){
		var difference = (this.id.substring(this.id.length - 1))%3;
		var amt = 0;
		if(difference == 1)
			amt = 0;
		else if(difference == 2)
			amt = 1;
		else
			amt = 2;
		
		if(turn%2 == 1){
			var n = document.getElementById(this.id);
			var ntx=n.getContext('2d');
			ntx.fillStyle='#0278CC';
			ntx.fillRect(3%3+amt,0,148,148);
			ntx.fillStyle='#000000';
			ntx.font = "134px Arial"
			ntx.fillText("X",30,125);
			ntx.fillStyle='#0278CC';	
		}
		else{
			var n = document.getElementById(this.id);
			var ntx=n.getContext('2d');
			ntx.fillStyle='#FF0000';
			ntx.fillRect(3%3+amt,0,148,148);
			ntx.fillStyle='#000000';
			ntx.font = "134px Arial"
			ntx.fillText("O",23,125);
			ntx.fillStyle='#FF0000';
		}
	}
}

function reset(){
	for(i=1;i<10;i++){
		var c = document.getElementById("newcanvas"+i.toString());
		c.className = i;
		var ctx=c.getContext('2d');
		ctx.fillStyle='#FFFFFF';
		ctx.fillRect((i-1)%3,0,148,148);
	}
}