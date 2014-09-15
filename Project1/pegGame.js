board = [];
availablePegs = [];
CHOSE_PEG = 1;
CHOSE_EMPTY_SPOT = 2;
selectedPeg = null;
state = CHOSE_PEG; 


window.onload = function(){

		var c = document.createElement("canvas");
		c.setAttribute('id','boardCanvas');			
		c.setAttribute('width',700);	
		c.setAttribute('height',700);

		document.getElementById("gameBoard").appendChild(c);		//Add the canvas to the division
		c.onclick = advance;

		var ctx=c.getContext('2d');								//Get the context - needed for HTML5 manipulation
		ctx.fillStyle='#000000';								//Make it blank to begin with
		ctx.fillRect(0,0,700,700);							//Shape it
		makeBoard();
		drawBoard();
		document.getElementById("reset").onclick = reset;
}

function drawBoard(){
	var c = document.getElementById('boardCanvas');
	var ctx = c.getContext('2d');
	for (var i = 0; i < board.length; i++) {
		var some = board[i];
		if(some.inQuestion)
		{
			ctx.fillStyle = 'red';
		}
		else if(some.canJumpTo) 
		{
			ctx.fillStyle = 'yellow';
		}
		else if(some.pegIn)
		{
			ctx.fillStyle = 'blue';
		}
		else
		{
			ctx.fillStyle = 'green';
		}
		ctx.beginPath();
		ctx.arc(some.x,some.y,some.radious,0,2*Math.PI,false);
		ctx.fill();
		ctx.stroke();
	};
}

function makeBoard(){
	var c = document.getElementById('boardCanvas');
	var numberOfRows = 5;
	for (var i = 0; i < numberOfRows; i++) {
		for(var j = 0; j < i + 1; j++)
		{
			var spacing = c.width / (i+2);
			var peg = new Peg(spacing*j + spacing,100*(i+1),i,j);
			if((i==0 && j==0) )
			{
				peg.pegIn = false;
			}
			board.push(peg);
		};
	};
}


function Peg(x, y, rowID, columnID){
	this.x = x;
	this.y = y;
	this.radious = 10;
	this.row = rowID;
	this.column = columnID;
	this.pegIn = true;
	this.canJumpTo = false;
	this.inQuestion = false;
}

function findValidMoves(boardPosition)
{
	/*
	This function needs to be refactored but it works for now
	The triangle board is set up like this
	x
	xx
	xxx
	xxxx
	xxxxx

	we checks the rows which are the column positions
	we check the columns wich are the boards rows
	we check the \ diangle which is the row - column 
	*/
	if(!board[boardPosition].pegIn)
	{
		return;
	}
	var pegsAvailable = [];

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
		var peg = board[i];
		if(peg.row == board[boardPosition].row)
		{
			if(peg.column == farLeft && !peg.pegIn)
			{
				farLeftEmpty = i;
			}
			else if(peg.column == farRight && !peg.pegIn)
			{
				farRightEmpty = i;
			}
			else if(peg.column == left && peg.pegIn)
			{
				leftFull = i;
			}
			else if(peg.column == right && peg.pegIn)
			{
				rightFull = i;
			}
		}
	}
	if(farRightEmpty != -1 && rightFull != -1)
	{
		pegsAvailable.push(board[farRightEmpty]);
	}
	if((farLeftEmpty != -1) && (leftFull != -1))
	{
		pegsAvailable.push(board[farLeftEmpty]);
	}

	// check column aka
	var farTop = board[boardPosition].row-2;
	var farBottom = board[boardPosition].row+2;
	var top = board[boardPosition].row-1;
	var bottom = board[boardPosition].row+1;
	var farBottomEmpty = -1;
	var farTopEmpty = -1;
	var bottomFull = -1;
	var topFull = -1;
	for(var i = 0; i < board.length; i++)
	{
		var peg = board[i];
		if(peg.column == board[boardPosition].column)
		{
			if(peg.row == farTop && !peg.pegIn)
			{
				farTopEmpty = i;
			}
			else if(peg.row == farBottom && !peg.pegIn)
			{
				farBottomEmpty = i;
			}
			else if(peg.row == top && peg.pegIn)
			{
				topFull = i;
			}
			else if(peg.row == bottom && peg.pegIn)
			{
				bottomFull = i;
			}
		}
	}
	if(farBottomEmpty != -1 && bottomFull != -1)
	{
		pegsAvailable.push(board[farBottomEmpty]);
	}
	if(farTopEmpty != -1 && topFull != -1)
	{
		pegsAvailable.push(board[farTopEmpty]);
	}

	// check diagonal aka \
	var farTop = board[boardPosition].row-2;
	var farBottom = board[boardPosition].row+2;
	var top = board[boardPosition].row-1;
	var bottom = board[boardPosition].row+1;
	var farBottomEmpty = -1;
	var farTopEmpty = -1;
	var bottomFull = -1;
	var topFull = -1;
	for(var i = 0; i < board.length; i++)
	{
		var peg = board[i];
		if(peg.column - peg.row == board[boardPosition].column - board[boardPosition].row)
		{
			if(peg.row == farTop && !peg.pegIn)
			{
				farTopEmpty = i;
			}
			else if(peg.row == farBottom && !peg.pegIn)
			{
				farBottomEmpty = i;
			}
			else if(peg.row == top && peg.pegIn)
			{
				topFull = i;
			}
			else if(peg.row == bottom && peg.pegIn)
			{
				bottomFull = i;
			}
		}
	}
	if(farBottomEmpty != -1 && bottomFull != -1)
	{
		pegsAvailable.push(board[farBottomEmpty]);
	}
	if(farTopEmpty != -1 && topFull != -1)
	{
		pegsAvailable.push(board[farTopEmpty]);
	}

	return pegsAvailable;
}

function jump(from, to)
{
	/*
		Assign from.pegIn = false;
		Assign to.pegIn = true;
		Assign the pegInBetween.pegIn = false;
	*/
	var pegToRemoveRow = -1;
	var pegToRemoveColumn = -1;
	if(from.row == to.row)
	{
		pegToRemoveRow = from.row;
		pegToRemoveColumn = (from.column + to.column)/2;
	}
	else if(from.column == to.column)
	{
		pegToRemoveColumn = from.column;
		pegToRemoveRow = (from.row + to.row)/2;
	}
	else if(from.column-from.row == to.column-to.row)
	{
		pegToRemoveRow = (from.row + to.row)/2;
		pegToRemoveColumn = (from.column + to.column)/2;
	}
	else
	{
		return;
	}
	
	from.pegIn = false;
	from.inQuestion = false;
	to.pegIn = true;
	for(var i = 0; i < board.length; i++){
		if(board[i].row == pegToRemoveRow && board[i].column == pegToRemoveColumn)
		{
			board[i].pegIn = false;
		}
	};
}

function advance(e)
{
	var x = e.clientX - this.offsetLeft;
	var y = e.clientY - this.offsetTop;
	gameLogic(x,y);
}


function gameLogic(x,y)
{
	if(state == CHOSE_PEG)
	{
		for(var i = 0; i < 15; i++)
		{
			if((x-board[i].x)*(x-board[i].x) + (y-board[i].y)*(y-board[i].y) < board[i].radious*board[i].radious)
			{
				availablePegs = findValidMoves(i);
				if(availablePegs.length > 0)
				{
					selectedPeg = board[i];
					board[i].inQuestion = true;
					state = CHOSE_EMPTY_SPOT;
				}
				for(var j = 0; j < availablePegs.length; j++)
				{
					availablePegs[j].canJumpTo = true;
				}
				break;
			}
		}
	}
	else if(state == CHOSE_EMPTY_SPOT)
	{
		for(var i = 0; i < 15; i++)
		{
			if((x-board[i].x)*(x-board[i].x) + (y-board[i].y)*(y-board[i].y) < board[i].radious*board[i].radious)
			{
				state = CHOSE_PEG;
				if(board[i].canJumpTo)
				{
					jump(selectedPeg, board[i]);
					ereasePossibleMoves();
					checkWin();
				} 
				else if (!board[i].pegIn)
				{
					state = CHOSE_EMPTY_SPOT;
				}
				else
				{
					ereasePossibleMoves();
					gameLogic(x,y);
					return;
				}
			}
		}
	}
	drawBoard();
}

function ereasePossibleMoves()
{
	for(var i = 0; i < 15; i++)
	{
		board[i].canJumpTo = false;
		board[i].inQuestion = false;
	}
	pegsAvailable = [];
}

function checkWin()
{
	var numberOfPegsRemaining = 0;
	for(var i = 0; i < 15; i++)
	{
		if(board[i].pegIn)
		{
			numberOfPegsRemaining = numberOfPegsRemaining + 1;
		}
	}
	if(numberOfPegsRemaining == 1)
	{
		drawBoard();
		alert("YOU WIN!");
	}
}

function reset()
{
	board = [];
	state = CHOSE_PEG;
	makeBoard();
	drawBoard();
}