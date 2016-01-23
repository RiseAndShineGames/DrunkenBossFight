"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var entityCollisions = data.entities.get(entity, "collisions");
		var bear = 3;
		var bearHealth = data.entities.get(bear, "health");
		var bearMaxHealth = data.entities.get(bear, "maxHealth");
		var healthI = 5;
		for (var i = 0; i < entityCollisions.length ; i++) {
		   var other = entityCollisions[i];
		   if ( data.entities.get(other, "Laser") ) {
		   		bearHealth -= healthI;
		   		data.entities.set(bear, "health", bearHealth);
		   		data.entities.destroy(other);
		   }
		}
	}, "bearHitbox");
};