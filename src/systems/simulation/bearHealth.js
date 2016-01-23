"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var bearHealth = data.entities.get(entity, "health");
		var bearMaxHealth = data.entities.get(entity, "maxHealth");
		var healthImage = data.entities.get(4, "animation");
		if (bearHealth < 100 && bearHealth >= 80) {
		  healthImage.name = "bearHealth-1-hit";
		} else if ( bearHealth < 80 && bearHealth >= 60) { 
			healthImage.name = "bearHealth-2-hit";
		} else if ( bearHealth < 60 && bearHealth >= 40) { 
			healthImage.name = "bearHealth-3-hit";
		} else if ( bearHealth < 40 && bearHealth >= 0) { 
			healthImage.name = "bearHealth-4-hit";
		} else if ( bearHealth < 0 ) { 
			healthImage.name = "bearHealth-Dead";
		}
		console.log(bearHealth)
	}, "bear");
};