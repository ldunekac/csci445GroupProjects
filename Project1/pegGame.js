/*
Wonderful!

Globals
board 

Common functions

getPegAt(x,y)
	-- Will return the peg that is at the absolute location of the click

getValidMoves(peg)
	-- You cliked on the peg and the pegs returned will be the vaid location the peg can jump to
	-- This will also chane the color of the valid move loaction

jump(peg, location) -- This is a move
	-- move the peg to that location and remove the peg inbetween
	-- add the current state to the list of previous states

reset()
	-- reset the current global board

undo()
	-- set the pervious state to the global state


*/