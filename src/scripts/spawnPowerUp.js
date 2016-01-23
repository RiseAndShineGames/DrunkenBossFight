"use strict";

module.exports = function(entity, data) {
	var veiwportWidth = data.canvas.width;
	var veiwportHeight = data.canvas.height;
	var timers = data.entities.get(entity, "timers");
	var maxX, maxY, minX, minY;
	minX = 20;
	minY = 100;
	maxX = 1100;
	maxY = 400;
	var mug = data.instantiatePrefab("beerMugRefill");
	var x = Math.floor(Math.random() * (maxX-minX))+minX;
	var y = Math.floor(Math.random() * (maxY-minY))+minY;
	data.entities.set(mug, "position", {"x":x,"y":y});
	timers.powerUpSpawn.time = 0;
	timers.powerUpSpawn.running = true;
};