"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var health = data.entities.get(entity, "health");
		if (health <= 0) {
			//change game state to lost
			//play ending
			console.log('lose')
			data.switchScene('end',{"win": false});
		}	
		
	}, "player");
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var health = data.entities.get(entity, "health");
		if (health <= 0) {
			//change game state to win
			//play ending
			data.switchScene('end',{"win": true});
		}
		
	}, "bear");
};
