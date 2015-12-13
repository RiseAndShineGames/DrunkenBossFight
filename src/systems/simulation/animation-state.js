"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var animationArray = ["player-full-left","player-lean-left","player-idle","player-lean-right","player-full-right", "player-lean-right-idle","player-lean-left-idle"];
		var aimingModifier =["-left","-back","-right"];
		var aimingIndex = 2;
		if(data.input.mouse.x > entity.position.x +entity.size.width){
			aimingIndex = 2;
		}
		if(data.input.mouse.x< entity.position.x ){
			aimingIndex = 0;
		}
		if(data.input.mouse.x <= entity.position.x + entity.size.width && data.input.mouse.x >= entity.position.x){
			aimingIndex = 1;
		}
		var damagedModifier = "";
		if(entity.damaged === true){
			damagedModifier = "-d";
		}
		var oldname = entity.animation.name;
		entity.animation.name = animationArray[entity.animationIndex]+aimingModifier[aimingIndex]+damagedModifier;
		if(entity.animation.name !== oldname){
			entity.animation.frame = 0;
		}
		
	}, ["player"]);
};
