"use strict";

module.exports = function(player,data) { // eslint-disable-line no-unused-vars
	console.log("here");
	player.timers.center.running = false;
	player.timers.center.time = 0;
	player.animationIndex = 0;
};
