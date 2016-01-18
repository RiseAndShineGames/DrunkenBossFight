"use strict";

module.exports = function(bear, data) {
	var timers = data.entities.get(bear, "timers");
	data.entities.set(bear, "velocity", {
		"x": 0,
		"y": 0
	}); 
	timers.wait.time = 0;
	timers.wait.running = false;
	timers.move.time = 0;
	timers.move.running = true;
};