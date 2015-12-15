"use strict";

module.exports = function(bg,data) { // eslint-disable-line no-unused-vars
	
	console.log("here")
	bg.seen +=1;
	if(bg.seen<=6){
		bg.image.name = "s"+bg.seen;
		bg.timers.changeBG.time = 0;
		bg.timers.changeBG.running = true;
	}else{
		data.switchScene("main");
	}
	
};