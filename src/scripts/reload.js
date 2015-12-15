"use strict";

module.exports = function(gun,data) { // eslint-disable-line no-unused-vars
	gun.loaded = true;
	gun.timers.reload.running = false;
	gun.timers.reload.time = 0;
};
