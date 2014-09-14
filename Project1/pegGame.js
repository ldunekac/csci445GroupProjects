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
		if(board[i].inQuestion) 
		{
			ctx.fillStyle = 'blue';
		}
		else if(board[i].pegIn)
		{
			ctx.fillStyle = 'yellow';
		}
		else
		{
			ctx.fillStyle = 'green';
		}
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
			var peg = new Peg(spacing*j + spacing,100*(i+1),i,j);
			if(j==0)
				peg.pegIn = false;
			board.push(peg);
		};
	};
}


function Peg(x, y, rowID, columnID)
{
	this.x = x;
	this.y = y;
	this.radious = 10;
	this.row = rowID;
	this.column = columnID;
	this.pegIn = true;
	this.inQuestion = false;
}

function showMoves(e)
{
	var x = e.clientX - this.offsetLeft;
	var y = e.clientY - this.offsetTop;
	for(var i = 0; i < 15; i++)
	{
		if((x-board[i].x)*(x-board[i].x) + (y-board[i].y)*(y-board[i].y) < board[i].radious*board[i].radious)
		{
			findValidMoves(i);
		}
	}
	drawBoard();
}

function findValidMoves(boardPosition)
{
	// check row
	var farLeft = board[boardPosition].column-2;
	var farRight = board[boardPosition].column+2;
	var left = board[boardPosition].column-1;
	var right = board[boardPosition].column+1;
	var farRightEmpty = -1;
	var farLeftEmpty = -1;
	var rightFull = -1;
	var leftFull = -1;
	for(var i = 0; i < board.length; i++)
	{
		if(board[i].row == board[boardPosition].row)
		{
			if(board[i].column == farLeft && !board[i].pegIn)
			{
				farLeftEmpty = i;
			}
			else if(board[i].column == farRight && !board[i].pegIn)
			{
				farRightEmpty = i;
			}
			else if(board[i].column == left && board[i].pegIn)
			{
				rightFull = i;
			}
			else if(board[i].column == right && board[i].pegIn)
			{
				leftFull = i;
			}
		}
	}
	if(farRightEmpty != -1 && rightFull != -1)
	{
		board[farRightEmpty].inQuestion = true;
	}
	if(farLeftEmpty != -1 && farLeft != -1)
	{
		board[farRightEmpty].inQuestion = true;
	}




	// check column aka /
	// check diagonal aka \
}