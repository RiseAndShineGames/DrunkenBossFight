"use strict";

module.exports = function(bg,data) { // eslint-disable-line no-unused-vars

	var seen = data.entities.get(bg,"seen") + 1;

	data.entities.set(bg,"seen",seen);

	if(seen<=6){
		data.entities.get(bg,"image").name = "s"+seen;
		data.entities.get(bg,"timers").changeBG.time = 0;
		data.entities.get(bg,"timers").changeBG.running = true;
	}else{
		data.switchScene("main");
	}
	
};