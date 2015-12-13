"use strict";

module.exports = function(player,data) { // eslint-disable-line no-unused-vars
	player.animation.frame = 0;
	player.timers.center.running = false;
	player.timers.center.time = 0;
	player.animationIndex = 4;
};
