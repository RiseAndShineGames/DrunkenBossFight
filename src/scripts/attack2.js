"use strict";
var angleToRotate = 5;
function normalize(p1,p2){
	var d = Math.sqrt( (p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y) );
	var unitVector = {};
	unitVector.x = (p1.x-p2.x)/d;
	unitVector.y = (p1.y-p2.y)/d;
	return unitVector;

}
function rotateVector(vector,angle){
	var radian = degreesToRadians(angle);
	var sine = Math.sin(radian);
	var cosine =Math.cos(radian);

	var rotatedAngle = {};
	rotatedAngle.x = vector.x*cosine - vector.y*sine;
	rotatedAngle.y = vector.x*sine + vector.y*cosine;
	return rotatedAngle;
}
function degreesToRadians(degrees){
	return degrees*Math.PI/180.0;
}
module.exports = function(entity,data) { // eslint-disable-line no-unused-vars
	var timers = data.entities.get(entity,"timers");
	var match = data.entities.get(entity,"match");
	var animation = data.entities.get(match.id,"animation");
	var playerPosition = data.entities.get(1,"position");
	var position = data.entities.get(entity,"position");
	var uv = normalize(playerPosition,position);

	for(var i = -2; i<=2;i++){
		var newV = rotateVector(uv,angleToRotate*i);
		var flame = data.instantiatePrefab("Flame");
		data.entities.set(flame,"position",{"x":position.x ,"y":position.y});
		data.entities.set(flame,"velocity",{"x":0.5*newV.x,"y":0.5*newV.y});
	}
	

	timers.reload.time = 0;
	timers.reload.running = true;
	animation.name="bear";
	
};