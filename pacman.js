var start = document.getElementById('start')
var pacman = document.getElementById('pacman')
var ghost1 = document.getElementById('ghost1')
var ghost2 = document.getElementById('ghost2')
var ghost3 = document.getElementById('ghost3')
var ghost4 = document.getElementById('ghost4')
var gameContainer = document.getElementById('game-container')

var velocityY = 0
var velocityX = 0
var positionY = 24
var positionX = 24
var ghostVelocityY = [-1,-1,-1,-1] 
var ghostVelocityX = [0,0,0,0]
var ghostPositionY = [312,288,312,288]
var ghostPositionX = [336,312,312,336]
var cntfood = 0
var cntWall = 0
var collision = false
var Ghostcollision = false
var ghostSurround= [[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]]
var renderGhostMovement = true
var renderGhost = 100
var clientTop= 0
var clientLeft= 0

var level = "1111111111111111111111111111210000000000001100000000000012101111011111011011110111110121011110111110110111101111101210000000000000000000000000012101111011011111111011011110121011110110111111110110111101210000001100001100001100000012111111011111011011111011111121111110111110110111110111111200000001100000000001100000002111111011011111111011011111121111110000100000010000111111211111101101000000101101111112111111011011100111011011111120000000110000000000110000000211111101111101101111101111112111111011111011011111011111121000000110000110000110000001210111101101111111101101111012101111011011111111011011110121000000000000000000000000001210111101111101101111011111012101111011111011011110111110121000000000000110000000000001211111111111111111111111111112"

window.addEventListener('load', function(){
	ghost1.style.top = '312px'
	ghost1.style.left = '336px'
	ghost2.style.top = '288px'
	ghost2.style.left = '312px'
	ghost3.style.top = '312px'
	ghost3.style.left = '312px'
	ghost4.style.top = '288px'
	ghost4.style.left = '336px'
	renderWalls()	
})

window.addEventListener('keydown', function(e) {
	e = e || window.event;
	switch (e.keyCode) {

		case 37:
			velocityX = -1
			velocityY = 0
			pacman.style.transform = "scale(-1,1)"
		break;

		case 38:
			velocityX = 0
			velocityY = -1
			pacman.style.transform = "rotate(-90deg)"
		break;

		case 39:
			velocityX = 1
			velocityY = 0
			pacman.style.transform = "scale(1,1)"
		break;

		case 40:
			velocityX = 0
			velocityY = 1
			pacman.style.transform = "rotate(90deg)"
		break;
	}
})

function move() {
	setTimeout(function(){
			positionY = positionY + velocityY*24
			positionX = positionX + velocityX*24

		
				if ((positionY == 36*10 || positionY == 24*10) && positionX <0 ) {
			positionX= 27*24;
		} else if ((positionY == 36*10 || positionY == 24*10) && positionX >27*24) {
			positionX=0
		} 

		colision = wallCollision(positionX,positionY)

		if(colision){
			positionY = positionY - velocityY*24
			positionX = positionX - velocityX*24
		}

		pacman.style.top = positionY+'px'
		pacman.style.left = positionX+'px'
		for(var h=1; h<5; h++){
		var ghost = 'ghost'+(h)
		if (document.getElementById(ghost).style.top == pacman.style.top && document.getElementById(ghost).style.left ==positionX+'px')
			document.getElementById('game-over').style.display = 'flex'
		}
		colisionCheck()

		move()
	},60)
}

function wallCollision(xPos,yPos){
	var wallId
	var wallDiv
	for(var i = 1; i <= cntWall; i++){
		wallId = 'wall'+i
		wallDiv = document.getElementById(wallId)
		if(yPos+'px' == wallDiv.style.top && xPos+'px' == wallDiv.style.left){
			return true
			break;
		}
	}
}

function colisionCheck(){
	var foodId
	var foodDiv
	for(var i = 1; i <= cntfood; i++){
		foodId = 'food'+i
		foodDiv = document.getElementById(foodId)
		if(pacman.style.top == foodDiv.style.top && pacman.style.left == foodDiv.style.left){
			foodDiv.style.display = 'none'
			break;
		}
	}
}

function ghostPosition(){
	var wallId
	var wallDiv
	var comp
	for (var h = 0; h < 4; h++) {
	var pos=[[ghostPositionY[h],ghostPositionX[h]-24],[ghostPositionY[h]-24,ghostPositionX[h]],[ghostPositionY[h],ghostPositionX[h]+24],[ghostPositionY[h]+24,ghostPositionX[h]]]
	for(var j=0;j<4;j++){
		for(var i = 1; i < cntWall+1; i++){
			wallId = 'wall'+i
			wallDiv = document.getElementById(wallId)
			if( pos[j][0]+'px'== wallDiv.style.top && pos[j][1]+'px' == wallDiv.style.left){
				ghostSurround[h][j]=true
				break;
			}
			else 
				ghostSurround[h][j]=false
			}
		}
	}
}

function ghostMovement() {
	setTimeout(function(){
	ghostPosition()
	for (var h = 0; h < 4; h++) {
	var random = Math.floor(Math.random()*3.9999)
	switch (random) {
		case 0:
			if(ghostVelocityX[h]!=1 && ghostSurround[h][0]==false){
				ghostVelocityX[h] = -1 
				ghostVelocityY[h] = 0
			}
		break;

		case 1:
			if(ghostVelocityY[h]!=1 && ghostSurround[h][1]==false){
				ghostVelocityX[h] = 0
				ghostVelocityY[h] = -1
			}
		break;

		case 2:
			if(ghostVelocityX[h]!=-1 && ghostSurround[h][2]==false){
				ghostVelocityX[h] = 1
				ghostVelocityY[h] = 0
			}
		break;


		case 3:
			if(ghostVelocityY[h]!=-1 && ghostSurround[h][3]==false){
				ghostVelocityX[h] = 0
				ghostVelocityY[h] = 1
			}
		break;
	}

		if(ghostSurround[h][0]==true && ghostVelocityX[h]==-1){
		ghostVelocityY[h]=-1
		ghostVelocityX[h]=0
		}
		if(ghostSurround[h][1]==true && ghostVelocityY[h]==-1){
			ghostVelocityX[h]=1
			ghostVelocityY[h]=0
		}
		if(ghostSurround[h][2]==true && ghostVelocityX[h]==1){
			ghostVelocityY[h]=1
			ghostVelocityX[h]=0
		}
		if(ghostSurround[h][3]==true && ghostVelocityY[h]==1){
			ghostVelocityX[h]=0
			ghostVelocityY[h]=0
		}

		ghostPositionY[h] = ghostPositionY[h] + ghostVelocityY[h]*24
		ghostPositionX[h] = ghostPositionX[h] + ghostVelocityX[h]*24

		if ((ghostPositionY[h] == 36*10 || ghostPositionY[h] == 24*10) && ghostPositionX[h] <0 ) {
			ghostPositionX[h]= 27*24;
		} else if ((ghostPositionY[h] == 36*10 || ghostPositionY[h] == 24*10) && ghostPositionX[h] >27*24) {
			ghostPositionX[h]=0
		} 
		var ghost = 'ghost'+(h+1)
		document.getElementById(ghost).style.top = ghostPositionY[h]+'px'
		document.getElementById(ghost).style.left = ghostPositionX[h] +'px'
	}
	ghostSurround = [[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]]
	ghostMovement()
},renderGhost)
}

function renderWalls() {
	var wallTop=0
	var wallLeft=0
	for(var i=0;i<level.length;i++){
		var wall = document.createElement("DIV")
			wall.classList.add("wall")

			var food = document.createElement("DIV")
			food.classList.add("food")
		switch (level.charAt(i)) {
			case '0':
				cntfood++
				food.id = 'food'+cntfood
				foodId = 'food'+cntfood
				document.getElementById('game-container').appendChild(food)
				document.getElementById(foodId).style.top = wallTop+'px'
				document.getElementById(foodId).style.left = wallLeft+'px'
				wallLeft += 24
				break;
			case '1':
				cntWall++
				wall.id = 'wall'+cntWall
				wallId = 'wall'+cntWall
				document.getElementById('game-container').appendChild(wall)
				document.getElementById(wallId).style.top = wallTop+'px'
				document.getElementById(wallId).style.left = wallLeft+'px'
				wallLeft += 24
				break;
			case '2':
				wallTop += 24
				gameContainer.style.width = wallLeft+'px'
				wallLeft = 0
				break;
		}	
	}
	gameContainer.style.height = wallTop+'px'
}

start.addEventListener("click", function(){
	start.style.display = 'none'
	move()
	ghostMovement()
})


document.getElementById('restart').addEventListener("click", function(){
	location.reload()
})

