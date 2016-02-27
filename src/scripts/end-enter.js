"use strict";

module.exports = function(data) { // eslint-disable-line no-unused-vars
	var win = data.arguments.win;
	var bg = 0;
	var bgImage = data.entities.get(bg,"image");
	

	if(win == true){
		bgImage.name = "winScreen";

	}
};
