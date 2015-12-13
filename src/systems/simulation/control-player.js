"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		entity.velocity.x = 0;
		entity.velocity.y = 0;
		if(data.input.mouse.x > entity.position.x +entity.size.width){
			data.entities.entities[2].animation.name = "arm";
			if(data.entities.entities[2].match.offsetX<0){
				data.entities.entities[2].match.offsetX = 20
			}
		}
		if(data.input.mouse.x< entity.position.x ){
			data.entities.entities[2].animation.name = "arm-r";
				if(entity.animationIndex === 2){
					data.entities.entities[2].match.offsetX = 20-data.images.get("armReverse").width;
				}
				else if(entity.animationIndex ===0){
					data.entities.entities[2].match.offsetX = 40-data.images.get("armReverse").width;
				}
					else{
					data.entities.entities[2].match.offsetX = 40-data.images.get("armReverse").width;
				}

		}
		if(data.input.mouse.x <= entity.position.x + entity.size.width && data.input.mouse.x >= entity.position.x){
			
			data.entities.entities[2].animation.name = "arm-none";
		}
		if (data.input.button("left")) {
			entity.velocity.x = -0.4;
			if(entity.animationIndex !== 1 && entity.animationIndex !== 0){
				entity.animationIndex = 1;
				entity.timers.left.running =true;
				entity.timers.center.running =false;
				entity.timers.center.time= 0;
				entity.timers.right.running = false;
				entity.timers.right.time = 0;
				data.entities.entities[2].match.offsetX -= 10;

			}
			
		}
		if (data.input.button("right")) {
			entity.velocity.x = 0.4;
			if(entity.animationIndex !== 3 && entity.animationIndex !== 4){
				entity.animationIndex = 3;
				entity.timers.right.running =true;
				entity.timers.center.running =false;
				entity.timers.center.time= 0;
				entity.timers.left.running = false;
				entity.timers.left.time = 0;
				data.entities.entities[2].match.offsetX += 10;
			}

		}

		if(!data.input.button("left") && !data.input.button("right")){
			if(entity.animationIndex !== 2 && entity.animationIndex !== 5 && entity.animationIndex !== 6){
				entity.animationIndex = 2;
				entity.timers.center.running =true;
				entity.timers.right.running =false;
				entity.timers.right.time= 0;
				entity.timers.left.running = false;
				entity.timers.left.time = 0;
				data.entities.entities[2].match.offsetX = +20;
			}
		}
		if (data.input.button("up")) {
			entity.velocity.y = -0.4;
		}
		if (data.input.button("down")) {
			entity.velocity.y = 0.4;
		}
		
	}, ["player"]);
};
