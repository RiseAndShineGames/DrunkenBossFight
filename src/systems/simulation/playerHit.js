"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function (entity, elapsed) { // eslint-disable-line no-unused-vars
		var entityCollisions = data.entities.get(entity, "collisions");
		var playerHealth = data.entities.get(entity, "health");
		var damage = 5;

		for (var i = 0; i < entityCollisions.length; i++) {
			var other = entityCollisions[i];
			if (data.entities.get(other, "Flame")) {
				data.entities.destroy(other);
				data.entities.set(entity, "health", playerHealth - damage);
				console.log("hit");
			}
		}
	}, "player");
};