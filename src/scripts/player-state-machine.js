"use strict";

var states = {
	"idle": "player-idle",
	"forward-right-trans": "player-forward-right-trans",
	"forward-right": "player-forward-right",
	"trans-idle-right": "pleyer-trans-idle-right",
	"backward-right-trans": "player-backward-right-trans",
	"backward-right": "player-backward-right-trans",
	"trans-idle-right-b": "pleyer-trans-idle-right-b",
	"idle-left": "player-idle-left",
	"forward-left-trans": "player-forward-left-trans",
	"forward-left": "player-forward-left-trans",
	"trans-idle-left": "pleyer-trans-idle-left",
	"backward-left-trans": "player-backward-left-trans",
	"backward-left": "player-backward-left-trans",
	"trans-idle-left-b": "pleyer-trans-idle-left-b"
  }

module.exports = function(player,data) { // eslint-disable-line no-unused-vars
	switch(player.currentState){
		case 1:
			player.currentState = "bleh"
	}
};
