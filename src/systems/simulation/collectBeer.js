"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var entityCollisions = data.entities.get(entity, "collisions");
		var playerHealth = data.entities.get(entity, "health");
		var playerMaxHealth = data.entities.get(entity, "maxHealth");
		var healthI = 25;
		for (var i = 0; i < entityCollisions.length ; i++) {
		   var other = entityCollisions[i];
		   if ( data.entities.get(other, "beerMugRefill") ) {
		   		if ( playerHealth + healthI <= playerMaxHealth ) {
		   			playerHealth += healthI;
		   		} else {
		   			playerHealth = playerMaxHealth;
		   		}
		   		data.entities.set(entity, "health", playerHealth);
		   		data.entities.destroy(other);
		   }
		}
	}, "player");
};
