"use strict";

module.exports = function(bear, data) {
	var timers = data.entities.get(bear, "timers");
	var bearAnim = data.entities.get(bear,"animation");
	var bearVel = data.entities.get(bear,"velocity");
	var bearPos = data.entities.get(bear,"position");
	var bearSize = data.entities.get(bear,"size");
	var playerPos = data.entities.get(1,"position");
	var playerSize = data.entities.get(1,"size");
	var bearMovSpeed = 0.5;
	bearVel.x = 0;

	if ( bearPos.x > playerPos.x + playerSize.width ) {
		bearVel.x = -bearMovSpeed;
	} else if ( bearPos.x + bearSize.width < playerPos.x ) {
		bearVel.x = +bearMovSpeed;
	} else {
		bearVel.x = 0;
	}
	timers.wait.running = true;
};