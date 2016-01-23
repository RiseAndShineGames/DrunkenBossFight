"use strict";
function normalize(p1,p2){
	var d = Math.sqrt( (p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y) );
	var unitVector = {};
	unitVector.x = (p1.x-p2.x)/d;
	unitVector.y = (p1.y-p2.y)/d;
	return unitVector;

}
module.exports = function(entity,data) { // eslint-disable-line no-unused-vars
	
	var timers = data.entities.get(entity,"timers");
	var match = data.entities.get(entity,"match");
	var animation = data.entities.get(match.id,"animation");

	//select attack
	var x = Math.floor(Math.random() * (2))+1;
	animation.name = "bear-attack";
	switch(x){
		
		case 2:
			timers.attack2.time= 0;
			timers.attack2.running= true;

			//change animation/ do something
			break;
		case 1:
			timers.attack1.time= 0;
			timers.attack1.running= true;

			//change animation/ do something
			break;
		default:
	}
	
};