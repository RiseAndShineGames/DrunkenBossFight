"use strict";
function fire(entity,entities,laserArray){
	var position = entities.get(entity,"position");

	var targetPosition =data.entities.get(1,"position");
	var targetSize = data.entities.get(1,"size");

	var targetVector ={
		"x": 0,
		"y": 0
	}
	if(position.x >= targetPosition.x + targetSize.width/2){
		targetVector.x = position.x - (targetPosition.x + targetSize.width/2);
	}else{
		targetVector.x =  (targetPosition.x + targetSize.width/2) - position.x;
	}

	if(position.y >= targetPosition.y + targetSize.height/2){
		targetVector.y = position.y - (targetPosition.y + targetSize.height/2);
	}else{
		targetVector.y =  (targetPosition.y + targetSize.height/2) - position.y;
	}

	var obj = {
		"Laser": true,
		"size":{
			"width":32,
			"height":3
		},
		"position":{
			"x":position.x,
			"y":position.y
		},
		"velocity": {
			"x": 1 *entities.get(6,"direction"),
			"y": 0
		},
		"image":{
			"name": "laser"
		},
	};
	laserArray.push(obj);
	entities.get(6,"timers").reload.running = true;
	entities.set(6,"loaded",false);
}

module.exports = function(ecs, data) {
	
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		if(data.input.mouse.consumePressed(0)){
			data.switchScene("main");
		}
	}, ["spawn"]);
};
