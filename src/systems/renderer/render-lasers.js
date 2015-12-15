"use strict";
module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
		
		
		for(var entity in entities){
			if(entities[entity].player){
				entities[entity].shots.forEach(function(shot,index){
					context.drawImage(data.images.get(shot.image.name),shot.position.x,shot.position.y,shot.size.width,shot.size.height);
				});
			}

		}
		
		
	}, ["player"]);
};