"use strict";
function generateEntity(obj, entities){
	var entity = entities.add();
	for (var prop in obj){
		if(obj.hasOwnProperty(prop)){
			entity[prop] = obj[prop];
		}
	}
	return entity;
}
function fire(data,laserArray){
	
	var position = data.entities.get(6,"position");
	var laser = data.instantiatePrefab("Laser");
	data.entities.set(laser,"position",{"x": position.x, "y": position.y});
	data.entities.set(laser,"velocity",{"x": 1*data.entities.get(6,"direction"), "y": 0});
				console.log();

	// var obj = {
	// 	"Laser": true,
	// 	"size":{
	// 		"width":32,
	// 		"height":3
	// 	},
	// 	"position":{
	// 		"x":position.x,
	// 		"y":position.y
	// 	},
	// 	"velocity": {
	// 		"x": 1 *data.entities.get(6,"direction"),
	// 		"y": 0
	// 	},
	// 	"image":{
	// 		"name": "laser"
	// 	},
	// };
	// laserArray.push(obj);
	data.entities.get(6,"timers").reload.running = true;
	data.entities.set(6,"loaded",false);
}

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var armAnim = data.entities.get(2,"animation");
		var armMatch = data.entities.get(2,"match");
		var velocity = data.entities.get(entity,"velocity");
		var position = data.entities.get(entity,"position");
		var size = data.entities.get(entity,"size");
		var laserSpawnerDirection = data.entities.get(6,"direction");
		var animationIndex = data.entities.get(entity,"animationIndex");
		var timers = data.entities.get(entity,"timers");
		var shots = data.entities.get(entity,"shots");
		var bear = 3;
		var bearPosition = data.entities.get(bear, "position");
		var bearSize = data.entities.get(bear, "size");


		velocity.x = 0;
		velocity.y = 0;
		if(bearPosition.x + bearSize.width/2 > position.x + size.width){
			armAnim.name = "arm";
			if(armMatch.offsetX<0){
				armMatch.offsetX = 20;
			}
			data.entities.set(6,"direction",1);
		}
		if(bearPosition.x + bearSize.width/2 < position.x ){
			armAnim.name = "arm-r";
				if(animationIndex === 2){
					armMatch.offsetX = 20-data.images.get("armReverse").width;
				}
				else if(animationIndex ===0){
					armMatch.offsetX = 40-data.images.get("armReverse").width;
				}
				else{
					armMatch.offsetX = 40-data.images.get("armReverse").width;
				}

			data.entities.set(6,"direction",-1);

		}
		if(bearPosition.x + bearSize.width/2 <= position.x + size.width && bearPosition.x + bearSize.width/2 >= position.x){
			
			armAnim.name = "arm-none";
		}
		if (data.input.button("left")) {
			velocity.x = -0.4;
			if(animationIndex !== 1 && animationIndex !== 0){
				animationIndex = 1;
				if(!timers.left.running){

					armMatch.offsetX -= 10;
				}
				timers.left.running =true;
				timers.center.running =false;
				timers.center.time= 0;
				timers.right.running = false;
				timers.right.time = 0;
			}
			
		}
		if (data.input.button("right")) {
			velocity.x = 0.4;
			if(animationIndex !== 3 && animationIndex !== 4){
				animationIndex = 3;
				if(!timers.right.running){

					armMatch.offsetX += 10;
				}
				timers.right.running =true;
				timers.center.running =false;
				timers.center.time= 0;
				timers.left.running = false;
				timers.left.time = 0;
			}

		}

		if(!data.input.button("left") && !data.input.button("right")){
			if(animationIndex !== 2 && animationIndex !== 5 && animationIndex !== 6){
				animationIndex = 2;
				timers.center.running =true;
				timers.right.running =false;
				timers.right.time= 0;
				timers.left.running = false;
				timers.left.time = 0;
				if(bearPosition.x + bearSize.width/2 > position.x+size.width){
					armMatch.offsetX = 20;
				}
				if (bearPosition.x + bearSize.width/2 < position.x){
					armMatch.offsetX = 20-data.images.get("armReverse").width;
				}
			}
		}
		if (data.input.button("up")) {
			velocity.y = -0.4;
		}
		if (data.input.button("down")) {
			velocity.y = 0.4;
		}

		if(data.input.button("action") || data.input.mouse.consumePressed(0)){
			if(data.entities.get(6,"loaded")){
				fire(data,shots);
			}
		}
		if(position.x+size.width>= data.entities.get(100,"size").width){
			position.x= data.entities.get(100,"size").width - size.width;
		}
		if(position.x<= 0){
			position.x= 0;
		}
		if(position.y + size.height>= data.entities.get(100,"size").height*(4/5)){
			position.y = data.entities.get(100,"size").height*(4/5) - size.height;
		}
		if(position.y<= data.entities.get(100,"size").height/10){
			position.y= data.entities.get(100,"size").height/10;
		}
		if(data.entities.get(entity,"health") <=0){
			data.switchScene("end");
		}
		// //Move Lasers
		// 	for(var j = 0; j< shots.length;j++){
		// 		var old = shots[j].position.x;
		// 		shots[j].position.x += shots[j].velocity.x*elapsed;
		// 	}
		


	}, "player");
};
