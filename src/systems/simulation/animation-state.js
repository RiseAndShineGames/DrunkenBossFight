"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var animationArray = ["player-full-left","player-lean-left","player-idle","player-lean-right","player-full-right", "player-lean-right-idle","player-lean-left-idle"];
		var aimingModifier =["-left","-back","-right"];
		var aimingIndex = 2;
		var position = data.entities.get(entity,"position");
		var size = data.entities.get(entity,"size");
		var animation = data.entities.get(entity,"animation");
		var bear = 3;
		var bearPosition = data.entities.get(bear, "position");
		var bearSize = data.entities.get(bear, "size");

		if(bearPosition.x + bearSize.width/2 > position.x +size.width){
			aimingIndex = 2;
		}
		if(bearPosition.x + bearSize.width/2< position.x ){
			aimingIndex = 0;
		}
		if(bearPosition.x + bearSize.width/2 <= position.x + size.width && bearPosition.x + bearSize.width/2 >= position.x){
			aimingIndex = 1;
		}
		var damagedModifier = "";
		if(entity.damaged === true){
			damagedModifier = "-d";
		}
		var oldname = animation.name;
		animation.name = animationArray[data.entities.get(entity,"animationIndex")]+aimingModifier[aimingIndex]+damagedModifier;
		if(animation.name !== oldname){
			animation.frame = 0;
		}
		
	}, "player");
};
