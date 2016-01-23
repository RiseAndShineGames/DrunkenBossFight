"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var entityCollisions = data.entities.get(entity, "collisions");
		var bearHealth = data.entities.get(entity, "health");
		var bearMaxHealth = data.entities.get(entity, "maxHealth");
		var healthI = 20;
		for (var i = 0; i < entityCollisions.length ; i++) {
		   var other = entityCollisions[i];
		   if ( data.entities.get(other, "Laser") ) {
		   		bearHealth -= healthI;
		   		data.entities.set(entity, "health", bearHealth);
		   		data.entities.destroy(other);
		   }
		}
	}, "bear");
};