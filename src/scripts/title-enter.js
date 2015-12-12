"use strict";
var utilities = require('./utilities');
var structures = {
	"Title": function Title(canvas,titleWords,tagLine, instructions){
		var entity= {};
		entity.title = true;
		entity.titleY = canvas.height/3;
		entity.titleWords = titleWords;
		entity.tagLineY=2*canvas.height/3;
		entity.tagLine = tagLine;
		entity.instructionsY = 2*canvas.height/3 + 50;
		entity.instructions = instructions;
	}
}

function buildTitle(data,titleWords,tagLine){
	var titleEntity = utilities.generateEntity(structures.Title(data.canvas,titleWords,tagLine),data.entities);
	return titleEntity;
}
module.exports = function(data) { // eslint-disable-line no-unused-vars
	console.log("here");
};
