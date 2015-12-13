"use strict";

module.exports = function(player,data) { // eslint-disable-line no-unused-vars
	player.health -= 1;
	player.timers.sobriety.time = 0;
	player.timers.sobriety.running = true;
};