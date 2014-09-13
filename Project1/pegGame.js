board = [];

window.onload = function(){

		var c = document.createElement("canvas");
		c.setAttribute('id','boardCanvas');			
		c.setAttribute('width',700);	
		c.setAttribute('height',700);

		document.getElementById("gameBoard").appendChild(c);		//Add the canvas to the division
		c.onclick = showMoves;
		//Make some HTML5 modifications to each canvas
		var ctx=c.getContext('2d');								//Get the context - needed for HTML5 manipulation
		ctx.fillStyle='#000000';								//Make it blank to begin with
		ctx.fillRect(0,0,700,700);							//Shape it
		makeBoard();
		drawBoard();
}

function drawBoard()
{
	var c = document.getElementById('boardCanvas');
	var ctx = c.getContext('2d');
	for (var i = 0; i < board.length; i++) {
		
		if(board[i].pegIn)
			ctx.fillStyle = 'blue';
		else
			ctx.fillStyle = 'green';
		
		ctx.beginPath();
		ctx.arc(board[i].x,board[i].y,board[i].radious,0,2*Math.PI,false);
		ctx.fill();
		ctx.stroke();
	};
}

function makeBoard()
{
	var c = document.getElementById('boardCanvas');
	var numberOfRows = 5;
	for (var i = 0; i < numberOfRows; i++) {
		for(var j = 0; j < i + 1; j++)
		{
			var spacing = c.width / (i+2);
			var peg = new Peg(spacing*j + spacing,100*(i+1),i);
			if(j==0)
				peg.pegIn = false;
			board.push(peg);
		};
	};
}


function Peg(x,y,rowID)
{
	this.x = x;
	this.y = y;
	this.radious = 10;
	this.rowID = rowID;
	this.pegIn = true;
}

function showMoves(e)
{
	var xpos = e.clientX;
	var ypos = y.clientY;
}