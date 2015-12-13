require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./scripts/main-enter":[function(require,module,exports){
"use strict";

module.exports = function(data) { // eslint-disable-line no-unused-vars
};

},{}],"./scripts/main-exit":[function(require,module,exports){
module.exports=require("./scripts/main-enter")
},{"./scripts/main-enter":"./scripts/main-enter"}],"./scripts/title-enter":[function(require,module,exports){
"use strict";
module.exports = function(data) { // eslint-disable-line no-unused-vars
	console.log(data)
};

},{}],"./scripts/title-exit":[function(require,module,exports){
module.exports=require("./scripts/main-enter")
},{"./scripts/main-enter":"./scripts/main-enter"}],1:[function(require,module,exports){
"use strict";

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var Splat = require("splat-ecs");

var animations = require("./data/animations");
var entities = require("./data/entities");

var images = new Splat.ImageLoader();
images.loadFromManifest(require("./data/images"));

var input = require("./data/inputs");

var scenes = require("./data/scenes");

var sounds = new Splat.SoundLoader();
sounds.loadFromManifest(require("./data/sounds"));

var systems = require("./data/systems");

var game = new Splat.Game(canvas, animations, entities, images, input, require, scenes, sounds, systems);

function percentLoaded() {
	if (images.totalImages + sounds.totalSounds === 0) {
		return 1;
	}
	return (images.loadedImages + sounds.loadedSounds) / (images.totalImages + sounds.totalSounds);
}
var loading = Splat.loadingScene(canvas, percentLoaded, game.scene);
loading.start(context);

},{"./data/animations":57,"./data/entities":58,"./data/images":59,"./data/inputs":60,"./data/scenes":61,"./data/sounds":62,"./data/systems":63,"splat-ecs":26}],"./systems/renderer/render-background":[function(require,module,exports){
"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
		context.fillStyle = "#fff";
		context.fillRect(0,0, data.canvas.width, data.canvas.height);
	}, []);
};
},{}],"./systems/renderer/render-buildings":[function(require,module,exports){
"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
		context.fillStyle = "#302f2c";
		context.drawImage(data.images.get("buildings"),0,5*data.canvas.height/9)
	}, []);
};
},{}],"./systems/renderer/render-player":[function(require,module,exports){
"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		context.fillStyle = entity.color;
	}, ["position", "size"]);
};

},{}],"./systems/renderer/render-title":[function(require,module,exports){
"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
		context.fillStyle = "#302f2c";
		context.drawImage(data.images.get("titlescreen"),0,0)
	}, []);
};
},{}],"./systems/simulation/control-player":[function(require,module,exports){
"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		entity.velocity.x = 0;
		entity.velocity.y = 0;
		if (data.input.button("left")) {
			entity.velocity.x = -0.5;
		}
		if (data.input.button("right")) {
			entity.velocity.x = 0.5;

		}
		if (data.input.button("up")) {
			entity.velocity.y = -0.5;
		}
		if (data.input.button("down")) {
			entity.velocity.y = 0.5;
		}
		if(data.input.mouse.x > entity.position.x +entity.size.width){
			entity.color = "purple";
		}
		if(data.input.mouse.x< entity.position.x ){
			entity.color = "yellow";
		}
		if(data.input.mouse.x <= entity.position.x + entity.size.width && data.input.mouse.x >= entity.position.x){
			entity.color = "blue";
		}
	}, ["player"]);
};

},{}],"./systems/simulation/start-game":[function(require,module,exports){
"use strict";

module.exports = function(ecs, data) {
	
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		if(data.input.mouse.consumePressed(0)){
			data.switchScene("main");
		}
	}, []);
};

},{}],2:[function(require,module,exports){
"use strict";

// converts a changing absolute value into a value relative to the previous value
module.exports = function() {
	var last = -1;
	return function(current) {
		if (last === -1) {
			last = current;
		}
		var delta = current - last;
		last = current;
		return delta;
	};
};

},{}],3:[function(require,module,exports){
"use strict";
/**
 * @namespace Splat.ads
 */

var platform = require("./platform");

if (platform.isEjecta()) {
	var adBanner = new window.Ejecta.AdBanner();

	var isLandscape = window.innerWidth > window.innerHeight;

	var sizes = {
		"iPhone": {
			"portrait": {
				"width": 320,
				"height": 50
			},
			"landscape": {
				"width": 480,
				"height": 32
			}
		},
		"iPad": {
			"portrait": {
				"width": 768,
				"height": 66
			},
			"landscape": {
				"width": 1024,
				"height": 66
			}
		}
	};

	var device = window.navigator.userAgent.indexOf("iPad") >= 0 ? "iPad" : "iPhone";
	var size = sizes[device][isLandscape ? "landscape" : "portrait"];

	module.exports = {
		/**
		 * Show an advertisement.
		 * @alias Splat.ads.show
		 * @param {boolean} isAtBottom true if the ad should be shown at the bottom of the screen. false if it should be shown at the top.
		 */
		"show": function(isAtBottom) {
			adBanner.isAtBottom = isAtBottom;
			adBanner.show();
		},
		/**
		 * Hide the current advertisement.
		 * @alias Splat.ads.hide
		 */
		"hide": function() {
			adBanner.hide();
		},
		/**
		 * The width of the ad that will show.
		 * @alias Splat.ads#width
		 */
		"width": size.width,
		/**
		 * The height of the ad that will show.
		 * @alias Splat.ads#height
		 */
		"height": size.height
	};
} else {
	module.exports = {
		"show": function() {},
		"hide": function() {},
		"width": 0,
		"height": 0,
	};
}

},{"./platform":32}],4:[function(require,module,exports){
"use strict";

var BinaryHeap = require("./binary_heap");

/**
 * Implements the [A* pathfinding algorithm]{@link http://en.wikipedia.org/wiki/A*_search_algorithm} on a 2-dimensional grid. You can use this to find a path between a source and destination coordinate while avoiding obstacles.
 * @constructor
 * @alias Splat.AStar
 * @param {isWalkable} isWalkable A function to test if a coordinate is walkable by the entity you're performing the pathfinding for.
 */
function AStar(isWalkable) {
	this.destX = 0;
	this.destY = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.openNodes = {};
	this.closedNodes = {};
	this.openHeap = new BinaryHeap(function(a, b) {
		return a.f - b.f;
	});
	this.isWalkable = isWalkable;
}
/**
 * The [A* heuristic]{@link http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html}, commonly referred to as h(x), that estimates how far a location is from the destination. This implementation is the [Manhattan method]{@link http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#manhattan-distance}, which is good for situations when the entity can travel in four directions. Feel free to replace this with a different heuristic implementation.
 * @param {number} x The x coordinate to estimate the distance to the destination.
 * @param {number} y The y coordinate to estimate the distance to the destination.
 */
AStar.prototype.heuristic = function(x, y) {
	// manhattan method
	var dx = Math.abs(x - this.destX) / this.scaleX;
	var dy = Math.abs(y - this.destY) / this.scaleY;
	return dx + dy;
};
/**
 * Make a node to track a given coordinate
 * @param {number} x The x coordinate of the node
 * @param {number} y The y coordinate of the node
 * @param {object} parent The parent node for the current node. This chain of parents eventually points back at the starting node.
 * @param {number} g The g(x) travel cost from the parent node to this node.
 * @private
 */
AStar.prototype.makeNode = function(x, y, parent, g) {
	g += parent.g;
	var h = this.heuristic(x, y);

	return {
		x: x,
		y: y,
		parent: parent,
		f: g + h,
		g: parent.g + g,
		h: h
	};
};
/**
 * Update the g(x) travel cost to a node if a new lower-cost path is found.
 * @param {string} key The key of the node on the open list.
 * @param {object} parent A parent node that may have a shorter path for the node specified in key.
 * @param {number} g The g(x) travel cost from parent to the node specified in key.
 * @private
 */
AStar.prototype.updateOpenNode = function(key, parent, g) {
	var node = this.openNodes[key];
	if (!node) {
		return false;
	}

	var newG = parent.g + g;

	if (newG >= node.g) {
		return true;
	}

	node.parent = parent;
	node.g = newG;
	node.f = node.g + node.h;

	var pos = this.openHeap.indexOf(node);
	this.openHeap.bubbleUp(pos);

	return true;
};
/**
 * Create a neighbor node to a parent node, and add it to the open list for consideration.
 * @param {string} key The key of the new neighbor node.
 * @param {number} x The x coordinate of the new neighbor node.
 * @param {number} y The y coordinate of the new neighbor node.
 * @param {object} parent The parent node of the new neighbor node.
 * @param {number} g The travel cost from the parent to the new parent node.
 * @private
 */
AStar.prototype.insertNeighbor = function(key, x, y, parent, g) {
	var node = this.makeNode(x, y, parent, g);
	this.openNodes[key] = node;
	this.openHeap.insert(node);
};
AStar.prototype.tryNeighbor = function(x, y, parent, g) {
	var key = makeKey(x, y);
	if (this.closedNodes[key]) {
		return;
	}
	if (!this.isWalkable(x, y)) {
		return;
	}
	if (!this.updateOpenNode(key, parent, g)) {
		this.insertNeighbor(key, x, y, parent, g);
	}
};
AStar.prototype.getNeighbors = function getNeighbors(parent) {
	var diagonalCost = 1.4;
	var straightCost = 1;
	this.tryNeighbor(parent.x - this.scaleX, parent.y - this.scaleY, parent, diagonalCost);
	this.tryNeighbor(parent.x, parent.y - this.scaleY, parent, straightCost);
	this.tryNeighbor(parent.x + this.scaleX, parent.y - this.scaleY, parent, diagonalCost);

	this.tryNeighbor(parent.x - this.scaleX, parent.y, parent, straightCost);
	this.tryNeighbor(parent.x + this.scaleX, parent.y, parent, straightCost);

	this.tryNeighbor(parent.x - this.scaleX, parent.y + this.scaleY, parent, diagonalCost);
	this.tryNeighbor(parent.x, parent.y + this.scaleY, parent, straightCost);
	this.tryNeighbor(parent.x + this.scaleX, parent.y + this.scaleY, parent, diagonalCost);
};

function generatePath(node) {
	var path = [];
	while (node.parent) {
		var ix = node.x;
		var iy = node.y;
		while (ix !== node.parent.x || iy !== node.parent.y) {
			path.unshift({x: ix, y: iy});

			var dx = node.parent.x - ix;
			if (dx > 0) {
				ix++;
			} else if (dx < 0) {
				ix--;
			}
			var dy = node.parent.y - iy;
			if (dy > 0) {
				iy++;
			} else if (dy < 0) {
				iy--;
			}
		}
		node = node.parent;
	}
	return path;
}

function makeKey(x, y) {
	return x + "," + y;
}

/**
 * Search for an optimal path between srcX, srcY and destX, destY, while avoiding obstacles.
 * @param {number} srcX The starting x coordinate
 * @param {number} srcY The starting y coordinate
 * @param {number} destX The destination x coordinate
 * @param {number} destY The destination y coordinate
 * @returns {Array} The optimal path, in the form of an array of objects that each have an x and y property.
 */
AStar.prototype.search = function aStar(srcX, srcY, destX, destY) {
	function scale(c, s) {
		var downscaled = (c / s) |0;
		return downscaled * s;
	}
	srcX = scale(srcX, this.scaleX);
	srcY = scale(srcY, this.scaleY);
	this.destX = scale(destX, this.scaleX);
	this.destY = scale(destY, this.scaleY);

	if (!this.isWalkable(this.destX, this.destY)) {
		return [];
	}

	var srcKey = makeKey(srcX, srcY);
	var srcNode = {
		x: srcX,
		y: srcY,
		g: 0,
		h: this.heuristic(srcX, srcY)
	};
	srcNode.f = srcNode.h;
	this.openNodes = {};
	this.openNodes[srcKey]  = srcNode;
	this.openHeap = new BinaryHeap(function(a, b) {
		return a.f - b.f;
	});
	this.openHeap.insert(srcNode);
	this.closedNodes = {};

	var node = this.openHeap.deleteRoot();
	while (node) {
		var key = makeKey(node.x, node.y);
		delete this.openNodes[key];
		this.closedNodes[key] = node;
		if (node.x === this.destX && node.y === this.destY) {
			return generatePath(node);
		}
		this.getNeighbors(node);
		node = this.openHeap.deleteRoot();
	}
	return [];
};

module.exports = AStar;

},{"./binary_heap":5}],5:[function(require,module,exports){
"use strict";

/**
 * An implementation of the [Binary Heap]{@link https://en.wikipedia.org/wiki/Binary_heap} data structure suitable for priority queues.
 * @constructor
 * @alias Splat.BinaryHeap
 * @param {compareFunction} cmp A comparison function that determines how the heap is sorted.
 */
function BinaryHeap(cmp) {
	/**
	 * The comparison function for sorting the heap.
	 * @member {compareFunction}
	 * @private
	 */
	this.cmp = cmp;
	/**
	 * The list of elements in the heap.
	 * @member {Array}
	 * @private
	 */
	this.array = [];
	/**
	 * The number of elements in the heap.
	 * @member {number}
	 * @readonly
	 */
	this.length = 0;
}
/**
 * Calculate the index of a node's parent.
 * @param {number} i The index of the child node
 * @returns {number}
 * @private
 */
BinaryHeap.prototype.parentIndex = function(i) {
	return ((i - 1) / 2) |0;
};
/**
 * Calculate the index of a parent's first child node.
 * @param {number} i The index of the parent node
 * @returns {number}
 * @private
 */
BinaryHeap.prototype.firstChildIndex = function(i) {
	return (2 * i) + 1;
};
/**
 * Bubble a node up the heap, stopping when it's value should not be sorted before its parent's value.
 * @param {number} pos The index of the node to bubble up.
 * @private
 */
BinaryHeap.prototype.bubbleUp = function(pos) {
	if (pos === 0) {
		return;
	}

	var data = this.array[pos];
	var parentIndex = this.parentIndex(pos);
	var parent = this.array[parentIndex];
	if (this.cmp(data, parent) < 0) {
		this.array[parentIndex] = data;
		this.array[pos] = parent;
		this.bubbleUp(parentIndex);
	}
};
/**
 * Store a new node in the heap.
 * @param {object} data The data to store
 */
BinaryHeap.prototype.insert = function(data) {
	this.array.push(data);
	this.length = this.array.length;
	var pos = this.array.length - 1;
	this.bubbleUp(pos);
};
/**
 * Bubble a node down the heap, stopping when it's value should not be sorted after its parent's value.
 * @param {number} pos The index of the node to bubble down.
 * @private
 */
BinaryHeap.prototype.bubbleDown = function(pos) {
	var left = this.firstChildIndex(pos);
	var right = left + 1;
	var largest = pos;
	if (left < this.array.length && this.cmp(this.array[left], this.array[largest]) < 0) {
		largest = left;
	}
	if (right < this.array.length && this.cmp(this.array[right], this.array[largest]) < 0) {
		largest = right;
	}
	if (largest !== pos) {
		var tmp = this.array[pos];
		this.array[pos] = this.array[largest];
		this.array[largest] = tmp;
		this.bubbleDown(largest);
	}
};
/**
 * Remove the heap's root node, and return it. The root node is whatever comes first as determined by the {@link compareFunction}.
 * @returns {data} The root node's data.
 */
BinaryHeap.prototype.deleteRoot = function() {
	var root = this.array[0];
	if (this.array.length <= 1) {
		this.array = [];
		this.length = 0;
		return root;
	}
	this.array[0] = this.array.pop();
	this.length = this.array.length;
	this.bubbleDown(0);
	return root;
};
/**
 * Search for a node in the heap.
 * @param {object} data The data to search for.
 * @returns {number} The index of the data in the heap, or -1 if it is not found.
 */
BinaryHeap.prototype.indexOf = function(data) {
	for (var i = 0; i < this.array.length; i++) {
		if (this.array[i] === data) {
			return i;
		}
	}
	return -1;
};

module.exports = BinaryHeap;

},{}],6:[function(require,module,exports){
"use strict";
/** @module buffer */

var platform = require("./platform");

/**
 * Make an invisible {@link canvas}.
 * @param {number} width The width of the canvas
 * @param {number} height The height of the canvas
 * @returns {external:canvas} A canvas DOM element
 * @private
 */
function makeCanvas(width, height) {
	var c = document.createElement("canvas");
	c.width = width;
	c.height = height;
	// when retina support is enabled, context.getImageData() reads from the wrong pixel causing NinePatch to break
	if (platform.isEjecta()) {
		c.retinaResolutionEnabled = false;
	}
	return c;
}

/**
 * Make an invisible canvas buffer, and draw on it.
 * @param {number} width The width of the buffer
 * @param {number} height The height of the buffer
 * @param {drawCallback} drawFun The callback that draws on the buffer
 * @returns {external:canvas} The drawn buffer
 */
function makeBuffer(width, height, drawFun) {
	var canvas = makeCanvas(width, height);
	var ctx = canvas.getContext("2d");
	// when image smoothing is enabled, the image gets blurred and the pixel data isn't correct even when the image shouldn't be scaled which breaks NinePatch
	if (platform.isEjecta()) {
		ctx.imageSmoothingEnabled = false;
	}
	drawFun(ctx);
	return canvas;
}

/**
 * Make a horizonally-flipped copy of a buffer or image.
 * @param {external:canvas|external:image} buffer The original image
 * @return {external:canvas} The flipped buffer
 */
function flipBufferHorizontally(buffer) {
	return makeBuffer(buffer.width, buffer.height, function(context) {
		context.scale(-1, 1);
		context.drawImage(buffer, -buffer.width, 0);
	});
}

/**
 * Make a vertically-flipped copy of a buffer or image.
 * @param {external:canvas|external:image} buffer The original image
 * @return {external:canvas} The flipped buffer
 */
function flipBufferVertically(buffer) {
	return makeBuffer(buffer.width, buffer.height, function(context) {
		context.scale(1, -1);
		context.drawImage(buffer, 0, -buffer.height);
	});
}
/**
 * Make a copy of a buffer that is rotated 90 degrees clockwise.
 * @param {external:canvas|external:image} buffer The original image
 * @return {external:canvas} The rotated buffer
 */
function rotateClockwise(buffer) {
	var w = buffer.height;
	var h = buffer.width;
	var w2 = Math.floor(w / 2);
	var h2 = Math.floor(h / 2);
	return makeBuffer(w, h, function(context) {
		context.translate(w2, h2);
		context.rotate(Math.PI / 2);
		context.drawImage(buffer, -h2, -w2);
	});
}
/**
 * Make a copy of a buffer that is rotated 90 degrees counterclockwise.
 * @param {external:canvas|external:image} buffer The original image
 * @return {external:canvas} The rotated buffer
 */
function rotateCounterclockwise(buffer) {
	var w = buffer.height;
	var h = buffer.width;
	var w2 = Math.floor(w / 2);
	var h2 = Math.floor(h / 2);
	return makeBuffer(w, h, function(context) {
		context.translate(w2, h2);
		context.rotate(-Math.PI / 2);
		context.drawImage(buffer, -h2, -w2);
	});
}

module.exports = {
	makeBuffer: makeBuffer,
	flipBufferHorizontally: flipBufferHorizontally,
	flipBufferVertically: flipBufferVertically,
	rotateClockwise: rotateClockwise,
	rotateCounterclockwise: rotateCounterclockwise
};

},{"./platform":32}],7:[function(require,module,exports){
"use strict";

module.exports = function animation(name, loop) {
	return {
		name: name,
		time: 0,
		frame: 0,
		loop: loop,
		speed: 1
	};
};

},{}],8:[function(require,module,exports){
"use strict";

module.exports = function position(x, y) {
	return { x: x, y: y };
};

},{}],9:[function(require,module,exports){
"use strict";

module.exports = function friction(x, y) {
	return { x: x, y: y };
};

},{}],10:[function(require,module,exports){
"use strict";

module.exports = function image(name, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight) {
	return {
		name: name,
		sourceX: sourceX,
		sourceY: sourceY,
		sourceWidth: sourceWidth,
		sourceHeight: sourceHeight,
		destinationX: destinationX,
		destinationY: destinationY,
		destinationWidth: destinationWidth,
		destinationHeight: destinationHeight
	};
};

},{}],11:[function(require,module,exports){
"use strict";

module.exports = function movement2d(accel, max) {
	return {
		up: false,
		down: false,
		left: false,
		right: false,
		upAccel: -accel,
		downAccel: accel,
		leftAccel: -accel,
		rightAccel: accel,
		upMax: -max,
		downMax: max,
		leftMax: -max,
		rightMax: max
	};
};

},{}],12:[function(require,module,exports){
"use strict";

module.exports = function playableArea(x, y, width, height) {
	return { x: x, y: y, width: width, height: height };
};

},{}],13:[function(require,module,exports){
"use strict";

module.exports = function playerController2d(up, down, left, right) {
	return { up: up, down: down, left: left, right: right };
};

},{}],14:[function(require,module,exports){
module.exports=require(8)
},{"/home/aquisenberry/Development/games/DrunkenBossFight/node_modules/splat-ecs/lib/components/camera.js":8}],15:[function(require,module,exports){
"use strict";

module.exports = function size(width, height) {
	return { width: width, height: height };
};

},{}],16:[function(require,module,exports){
"use strict";

module.exports = function timers() {
	return {};
};

},{}],17:[function(require,module,exports){
"use strict";

module.exports = function velocity(x, y) {
	return { x: x, y: y };
};

},{}],18:[function(require,module,exports){
"use strict";

function EntityPool() {
	this.nextId = 0;
	this.entities = {};
}
EntityPool.prototype.add = function() {
	var id = this.nextId;
	this.nextId++;
	var entity = { id: id };
	this.entities[id] = entity;
	return entity;
};
EntityPool.prototype.save = function() {
	return objectValues(this.entities);
};
EntityPool.prototype.load = function(data) {
	this.entities = data.reduce(function(entities, entity) {
		entities[entity.id] = entity;
		if (this.nextId <= entity.id) {
			this.nextId = entity.id + 1;
		}
		return entities;
	}.bind(this), this.entities);
};

function objectValues(obj) {
	return Object.keys(obj).map(function(key) {
		return obj[key];
	});
}

module.exports = EntityPool;

},{}],19:[function(require,module,exports){
"use strict";

var timeAccumulator = require("time-accumulator");

module.exports = function(entities, simulation, simulationStepTime, renderer, context) {
	var run = timeAccumulator(simulationStepTime);
	var timeDelta = require("./absolute-to-relative")();
	var running = true;

	function render(time) {
		if (!running) {
			return;
		}

		var elapsed = timeDelta(time);
		run(elapsed, function(elapsed) {
			simulation.run(entities.entities, elapsed);
		});

		context.save();
		renderer.run(entities.entities, context, elapsed);
		context.restore();

		if (running) {
			window.requestAnimationFrame(render);
		}
	}
	window.requestAnimationFrame(render);

	return function() {
		running = false;
	};
};

},{"./absolute-to-relative":2,"time-accumulator":56}],20:[function(require,module,exports){
"use strict";

var Input = require("./input");
var Scene = require("./scene");
var systems = require("./systems");

function clone(obj) {
	if (obj === undefined) {
		return undefined;
	}
	return JSON.parse(JSON.stringify(obj));
}

function Game(canvas, animations, entities, images, input, require, scenes, sounds, systems) {
	this.animations = animations;
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.entities = entities;
	this.images = images;
	this.input = new Input(input, canvas);
	this.require = require;
	this.scenes = scenes;
	this.sounds = sounds;
	this.systems = systems;

	this.makeScenes(scenes);
}
Game.prototype.makeScenes = function(sceneList) {
	Object.keys(sceneList).forEach(function(scene) {
		if (sceneList[scene].first) {
			this.scene =  this.makeScene(scene, sceneList[scene], {});
		}
	}.bind(this));
};
Game.prototype.makeScene = function(name, sceneData, sceneArgs) {
	var scene = new Scene();
	scene.entities.load(clone(this.entities[name]));

	var data = this.makeSceneData(scene.entities, sceneArgs);
	this.installSystems(name, this.systems.simulation, scene.simulation, data);
	this.installSystems(name, this.systems.renderer, scene.renderer, data);

	if (typeof sceneData.onEnter === "string") {
		var enterScript = this.loadScript(sceneData.onEnter);
		if (typeof enterScript === "function") {
			enterScript = enterScript.bind(scene, data);
		}
		scene.onEnter = enterScript;
	}
	if (typeof sceneData.onExit === "string") {
		var exitScript = this.loadScript(sceneData.onExit);
		if (typeof exitScript === "function") {
			exitScript = exitScript.bind(scene, data);
		}
		scene.onExit = exitScript;
	}

	return scene;
};
Game.prototype.makeSceneData = function(entities, sceneArgs) {
	return {
		animations: this.animations,
		arguments: sceneArgs || {},
		canvas: this.canvas,
		context: this.context,
		entities: entities,
		images: this.images,
		input: this.input,
		require: this.loadScript.bind(this),
		sounds: this.sounds,
		switchScene: this.switchScene.bind(this)
	};
};
Game.prototype.installSystems = function(scene, systems, ecs, data) {
	systems.forEach(function(system) {
		if (system.scenes.indexOf(scene) === -1) {
			return;
		}
		var script = this.loadScript(system.name);
		if (script === undefined) {
			console.error("failed to load script", system.name);
		}
		script(ecs, data);
	}.bind(this));
};
Game.prototype.loadScript = function(script) {
	if (script.indexOf("splatjs:") === 0) {
		var names = script.substr(8).split(".");

		return names.reduce(function(obj, name) {
			return obj[name];
		}, systems);
	} else {
		return this.require(script);
	}
};
Game.prototype.switchScene = function(name, sceneArgs) {
	if (this.scene !== undefined) {
		this.scene.stop();
	}
	this.scene = this.makeScene(name, this.scenes[name], sceneArgs);
	this.scene.start(this.context);
};

module.exports = Game;

},{"./input":23,"./scene":34,"./systems":36}],21:[function(require,module,exports){
"use strict";

var platform = require("./platform");

if (platform.isEjecta()) {
	var iap = new window.Ejecta.IAPManager();

	module.exports = {
		"get": function(sku, callback) {
			iap.getProducts([sku], function(err, products) {
				if (err) {
					callback(err);
					return;
				}
				callback(undefined, products[0]);
			});
		},
		"buy": function(product, quantity, callback) {
			product.purchase(quantity, callback);
		},
		"restore": function(callback) {
			iap.restoreTransactions(function(err, transactions) {
				if (err) {
					callback(err);
					return;
				}
				callback(undefined, transactions.map(function(transaction) {
					return transaction.productId;
				}));
			});
		}
	};
} else if (platform.isChromeApp()) {
	// FIXME: needs google's buy.js included
	// https://developer.chrome.com/webstore/payments-iap
	module.exports = {
		"get": function(sku, callback) {
			window.google.payments.inapp.getSkuDetails({
				"parameters": {
					"env": "prod"
				},
				"sku": sku,
				"success": function(response) {
					callback(undefined, response.response.details.inAppProducts[0]);
				},
				"failure": function(response) {
					callback(response);
				}
			});
		},
		"buy": function(product, quantity, callback) { // jshint ignore:line
			window.google.payments.inapp.buy({
				"parameters": {
					"env": "prod"
				},
				"sku": product.sku,
				"success": function(response) {
					callback(undefined, response);
				},
				"failure": function(response) {
					callback(response);
				}
			});
		},
		"restore": function(callback) {
			window.google.payments.inapp.getPurchases({
				"success": function(response) {
					callback(undefined, response.response.details.map(function(detail) {
						return detail.sku;
					}));
				},
				"failure": function(response) {
					callback(response);
				}
			});
		}
	};
} else {
	module.exports = {
		"get": function(sku, callback) { // jshint ignore:line
			callback(undefined, undefined);
		},
		"buy": function(product, quantity, callback) { // jshint ignore:line
			callback(undefined);
		},
		"restore": function(callback) {
			callback(undefined, []);
		}
	};
}

},{"./platform":32}],22:[function(require,module,exports){
"use strict";

/**
 * Loads {@link external:image}s and lets you know when they're all available. An instance of ImageLoader is available as {@link Splat.Game#images}.
 * @constructor
 */
function ImageLoader(onLoad) {
	/**
	 * The key-value object that stores named {@link external:image}s
	 * @member {object}
	 * @private
	 */
	this.images = {};
	/**
	 * The total number of images to be loaded.
	 * @member {number}
	 * @private
	 */
	this.totalImages = 0;
	/**
	 * The number of images that have loaded completely.
	 * @member {number}
	 * @private
	 */
	this.loadedImages = 0;
	/**
	 * The names of all the images that were requested to be loaded.
	 * @member {Array}
	 * @private
	 */
	this.names = [];
	/**
	 * A callback to be called once all images are loaded.
	 * @member {Array}
	 * @private
	 */
	this.onLoad = onLoad;
}
/**
 * Load an {@link external:image}.
 * @param {string} name The name you want to use when you {@link ImageLoader#get} the {@link external:image}
 * @param {string} path The path of the {@link external:image}.
 */
ImageLoader.prototype.load = function(name, path) {
	// only load an image once
	if (this.names.indexOf(name) > -1) {
		return;
	}
	this.names.push(name);

	this.totalImages++;

	var img = new Image();
	var self = this;
	img.addEventListener("load", function() {
		self.loadedImages++;
		self.images[name] = img;
		if (self.allLoaded() && self.onLoad) {
			self.onLoad();
		}
	});
	img.addEventListener("error", function() {
		console.error("Error loading image " + path);
	});
	img.src = path;
};
ImageLoader.prototype.loadFromManifest = function(manifest) {
	var keys = Object.keys(manifest);
	var self = this;
	keys.forEach(function(key) {
		self.load(key, manifest[key]);
	});
};

/**
 * Test if all {@link external:image}s have loaded.
 * @returns {boolean}
 */
ImageLoader.prototype.allLoaded = function() {
	return this.totalImages === this.loadedImages;
};
/**
 * Retrieve a loaded {@link external:image}.
 * @param {string} name The name given to the image during {@link ImageLoader#load}.
 * @returns {external:image}
 */
ImageLoader.prototype.get = function(name) {
	return this.images[name];
};

module.exports = ImageLoader;

},{}],23:[function(require,module,exports){
"use strict";

var Keyboard = require("game-keyboard");
var keyMap = require("game-keyboard/key_map").US;
var keyboard = new Keyboard(keyMap);
var Mouse = require("./mouse");

function Input(config, canvas) {
	this.config = config;
	this.mouse = new Mouse(canvas);
}
Input.prototype.button = function(name) {
	var input = this.config[name];
	if (input === undefined) {
		console.error("No such button: " + name);
		return false;
	}
	if (input.type !== "button") {
		console.error("\"" + name + "\" is not a button");
		return false;
	}
	for (var i = 0; i < input.inputs.length; i++) {
		var physicalInput = input.inputs[i];
		var device = physicalInput.device;
		if (device === "keyboard") {
			var key = physicalInput.key;
			if (keyboard.isPressed(key)) {
				return true;
			}
		}
		if (device === "touch") {
			for (var j = 0; j < this.mouse.touches.length; j++) {
				var t = this.mouse.touches[j];
				if (t.x >= physicalInput.x && t.x < physicalInput.x + physicalInput.width && t.y >= physicalInput.y && t.y < physicalInput.y + physicalInput.height) {
					return true;
				}
			}
		}
	}
	return false;
};

module.exports = Input;

},{"./mouse":28,"game-keyboard":53,"game-keyboard/key_map":54}],24:[function(require,module,exports){
"use strict";
/**
 * @namespace Splat.leaderboards
 */

var platform = require("./platform");

if (platform.isEjecta()) {
	var gameCenter = new window.Ejecta.GameCenter();
	gameCenter.softAuthenticate();

	var authFirst = function(action) {
		if (gameCenter.authed) {
			action();
		} else {
			gameCenter.authenticate(function(err) {
				if (err) {
					return;
				}
				action();
			});
		}
	};

	module.exports = {
		/**
		 * Report that an achievement was achieved.
		 * @alias Splat.leaderboards.reportAchievement
		 * @param {string} id The name of the achievement.
		 * @param {int} percent The percentage of the achievement that is completed in the range of 0-100.
		 */
		"reportAchievement": function(id, percent) {
			authFirst(function() {
				gameCenter.reportAchievement(id, percent);
			});
		},
		/**
		 * Report that a score was achieved on a leaderboard.
		 * @alias Splat.leaderboards.reportScore
		 * @param {string} leaderboard The name of the leaderboard the score is on.
		 * @param {int} score The score that was achieved.
		 */
		"reportScore": function(leaderboard, score) {
			authFirst(function() {
				gameCenter.reportScore(leaderboard, score);
			});
		},
		/**
		 * Show the achievements screen.
		 * @alias Splat.leaderboards.showAchievements
		 */
		"showAchievements": function() {
			authFirst(function() {
				gameCenter.showAchievements();
			});
		},
		/**
		 * Show a leaderboard screen.
		 * @alias Splat.leaderboards.showLeaderboard
		 * @param {string} name The name of the leaderboard to show.
		 */
		"showLeaderboard": function(name) {
			authFirst(function() {
				gameCenter.showLeaderboard(name);
			});
		}
	};
} else {
	module.exports = {
		"reportAchievement": function() {},
		"reportScore": function() {},
		"showAchievements": function() {},
		"showLeaderboard": function() {}
	};
}


},{"./platform":32}],25:[function(require,module,exports){
"use strict";

var Scene = require("./scene");

module.exports = function(canvas, percentLoaded, nextScene) {
	var scene = new Scene();
	scene.renderer.add(function(entities, context) { // jshint ignore:line
		context.fillStyle = "#000000";
		context.fillRect(0, 0, canvas.width, canvas.height);

		var quarterWidth = Math.floor(canvas.width / 4);
		var halfWidth = Math.floor(canvas.width / 2);
		var halfHeight = Math.floor(canvas.height / 2);

		context.fillStyle = "#ffffff";
		context.fillRect(quarterWidth, halfHeight - 15, halfWidth, 30);

		context.fillStyle = "#000000";
		context.fillRect(quarterWidth + 3, halfHeight - 12, halfWidth - 6, 24);

		context.fillStyle = "#ffffff";
		var barWidth = (halfWidth - 6) * percentLoaded();
		context.fillRect(quarterWidth + 3, halfHeight - 12, barWidth, 24);

		if (percentLoaded() === 1) {
			scene.stop();
			nextScene.start(context);
		}
	});
	return scene;
};

},{"./scene":34}],26:[function(require,module,exports){
"use strict";

var buffer = require("./buffer");

/**
 * @namespace Splat
 */
module.exports = {
	makeBuffer: buffer.makeBuffer,
	flipBufferHorizontally: buffer.flipBufferHorizontally,
	flipBufferVertically: buffer.flipBufferVertically,

	ads: require("./ads"),
	AStar: require("./astar"),
	BinaryHeap: require("./binary_heap"),
	EntityPool: require("./entity-pool"),
	Game: require("./game"),
	iap: require("./iap"),
	ImageLoader: require("./image_loader"),
	Input: require("./input"),
	leaderboards: require("./leaderboards"),
	loadingScene: require("./loading-scene"),
	math: require("./math"),
	openUrl: require("./openUrl"),
	NinePatch: require("./ninepatch"),
	Particles: require("./particles"),
	saveData: require("./save_data"),
	Scene: require("./scene"),
	SoundLoader: require("./sound_loader"),

	components: {
		animation: require("./components/animation"),
		camera: require("./components/camera"),
		friction: require("./components/friction"),
		image: require("./components/image"),
		movement2d: require("./components/movement-2d"),
		playableArea: require("./components/playable-area"),
		playerController2d: require("./components/player-controller-2d"),
		position: require("./components/position"),
		size: require("./components/size"),
		timers: require("./components/timers"),
		velocity: require("./components/velocity"),
	},
	systems: require("./systems")
};

},{"./ads":3,"./astar":4,"./binary_heap":5,"./buffer":6,"./components/animation":7,"./components/camera":8,"./components/friction":9,"./components/image":10,"./components/movement-2d":11,"./components/playable-area":12,"./components/player-controller-2d":13,"./components/position":14,"./components/size":15,"./components/timers":16,"./components/velocity":17,"./entity-pool":18,"./game":20,"./iap":21,"./image_loader":22,"./input":23,"./leaderboards":24,"./loading-scene":25,"./math":27,"./ninepatch":29,"./openUrl":30,"./particles":31,"./save_data":33,"./scene":34,"./sound_loader":35,"./systems":36}],27:[function(require,module,exports){
"use strict";

/**
 * Oscillate between -1 and 1 given a value and a period. This is basically a simplification on using Math.sin().
 * @alias Splat.math.oscillate
 * @param {number} current The current value of the number you want to oscillate.
 * @param {number} period The period, or how often the number oscillates. The return value will oscillate between -1 and 1, depending on how close current is to a multiple of period.
 * @returns {number} A number between -1 and 1.
 * @example
Splat.math.oscillate(0, 100); // returns 0
Splat.math.oscillate(100, 100); // returns 0-ish
Splat.math.oscillate(50, 100); // returns 1
Splat.math.oscillate(150, 100); // returns -1
Splat.math.oscillate(200, 100); // returns 0-ish
 */
function oscillate(current, period) {
	return Math.sin(current / period * Math.PI);
}

/**
 * @namespace Splat.math
 */
module.exports = {
	oscillate: oscillate,
	/**
	 * A seedable pseudo-random number generator. Currently a Mersenne Twister PRNG.
	 * @constructor
	 * @alias Splat.math.Random
	 * @param {number} [seed] The seed for the PRNG.
	 * @see [mersenne-twister package at github]{@link https://github.com/boo1ean/mersenne-twister}
	 * @example
var rand = new Splat.math.Random(123);
var val = rand.random();
	 */
	Random: require("mersenne-twister")
};

},{"mersenne-twister":55}],28:[function(require,module,exports){
"use strict";

var platform = require("./platform");

// prevent springy scrolling on ios
document.ontouchmove = function(e) {
	e.preventDefault();
};

// prevent right-click on desktop
window.oncontextmenu = function() {
	return false;
};

var relMouseCoords = function(canvas, event) {
	var x = event.pageX - canvas.offsetLeft + document.body.scrollLeft;
	var y = event.pageY - canvas.offsetTop + document.body.scrollTop;

	// scale based on ratio of canvas internal dimentions to css dimensions
	if (canvas.style.width.length) {
		x *= canvas.width / canvas.style.width.substring(0, canvas.style.width.indexOf("p"));
	}
	if (canvas.style.height.length) {
		y *= canvas.height / canvas.style.height.substring(0, canvas.style.height.indexOf("p"));
	}

	return {x:x, y:y};
};

function relMouseCoordsEjecta(canvas, event) {
	var ratioX = canvas.width / window.innerWidth;
	var ratioY = canvas.height / window.innerHeight;
	var x = event.pageX * ratioX;
	var y = event.pageY * ratioY;
	return {x:x, y:y};
}

if (platform.isEjecta()) {
	relMouseCoords = relMouseCoordsEjecta;
}

/**
 * Mouse and touch input handling. An instance of Mouse is available as {@link Splat.Game#mouse}.
 *
 * The first touch will emulates a mouse press with button 0.
 * This means you can use the mouse ({@link Mouse#isPressed}/{@link Mouse#consumePressed}) APIs and your game will work on touch screens (as long as you only need the left button.
 *
 * A mouse press will emulate a touch if the device does not support touch.
 * This means you can use {@link Mouse#touches}, and your game will still work on a PC with a mouse.
 * Also, if you call {@link Mouse#consumePressed} with button 0, it will add a `consumed:true` field to all current touches. This will help you prevent processing a touch multiple times.
 *
 * @constructor
 * @param {external:canvas} canvas The canvas to listen for events on.
 */
function Mouse(canvas) {
	/**
	 * The x coordinate of the cursor relative to the left side of the canvas.
	 * @member {number}
	 */
	this.x = 0;
	/**
	 * The y coordinate of the cursor relative to the top of the canvas.
	 * @member {number}
	 */
	this.y = 0;
	/**
	 * The current button states.
	 * @member {Array}
	 * @private
	 */
	this.buttons = [0, 0, 0];

	/**
	 * An array of the current touches on a touch screen device. Each touch has a `x`, `y`, and `id` field.
	 * @member {Array}
	 */
	this.touches = [];

	/**
	 * A function that is called when a mouse button or touch is released.
	 * @callback onmouseupHandler
	 * @param {number} x The x coordinate of the mouse or touch that was released.
	 * @param {number} y The y coordinate of the mouse or touch that was released.
	 */
	/**
	 * A function that will be called when a mouse button is released, or a touch has stopped.
	 * This is useful for opening a URL with {@link Splat.openUrl} to avoid popup blockers.
	 * @member {onmouseupHandler}
	 */
	this.onmouseup = undefined;

	var self = this;
	canvas.addEventListener("mousedown", function(event) {
		var m = relMouseCoords(canvas, event);
		self.x = m.x;
		self.y = m.y;
		self.buttons[event.button] = 2;
		updateTouchFromMouse();
	});
	canvas.addEventListener("mouseup", function(event) {
		var m = relMouseCoords(canvas, event);
		self.x = m.x;
		self.y = m.y;
		self.buttons[event.button] = 0;
		updateTouchFromMouse();
		if (self.onmouseup) {
			self.onmouseup(self.x, self.y);
		}
	});
	canvas.addEventListener("mousemove", function(event) {
		var m = relMouseCoords(canvas, event);
		self.x = m.x;
		self.y = m.y;
		updateTouchFromMouse();
	});

	function updateTouchFromMouse() {
		if (self.supportsTouch()) {
			return;
		}
		var idx = touchIndexById("mouse");
		if (self.isPressed(0)) {
			if (idx !== undefined) {
				var touch = self.touches[idx];
				touch.x = self.x;
				touch.y = self.y;
			} else {
				self.touches.push({
					id: "mouse",
					x: self.x,
					y: self.y
				});
			}
		} else if (idx !== undefined) {
			self.touches.splice(idx, 1);
		}
	}
	function updateMouseFromTouch(touch) {
		self.x = touch.x;
		self.y = touch.y;
		if (self.buttons[0] === 0) {
			self.buttons[0] = 2;
		}
	}
	function touchIndexById(id) {
		for (var i = 0; i < self.touches.length; i++) {
			if (self.touches[i].id === id) {
				return i;
			}
		}
		return undefined;
	}
	function eachChangedTouch(event, onChangeFunc) {
		var touches = event.changedTouches;
		for (var i = 0; i < touches.length; i++) {
			onChangeFunc(touches[i]);
		}
	}
	canvas.addEventListener("touchstart", function(event) {
		eachChangedTouch(event, function(touch) {
			var t = relMouseCoords(canvas, touch);
			t.id = touch.identifier;
			if (self.touches.length === 0) {
				t.isMouse = true;
				updateMouseFromTouch(t);
			}
			self.touches.push(t);
		});
	});
	canvas.addEventListener("touchmove", function(event) {
		eachChangedTouch(event, function(touch) {
			var idx = touchIndexById(touch.identifier);
			var t = self.touches[idx];
			var coords = relMouseCoords(canvas, touch);
			t.x = coords.x;
			t.y = coords.y;
			if (t.isMouse) {
				updateMouseFromTouch(t);
			}
		});
	});
	canvas.addEventListener("touchend", function(event) {
		eachChangedTouch(event, function(touch) {
			var idx = touchIndexById(touch.identifier);
			var t = self.touches.splice(idx, 1)[0];
			if (t.isMouse) {
				if (self.touches.length === 0) {
					self.buttons[0] = 0;
				} else {
					self.touches[0].isMouse = true;
					updateMouseFromTouch(self.touches[0]);
				}
			}
			if (self.onmouseup) {
				self.onmouseup(t.x, t.y);
			}
		});
	});
}
/**
 * Test whether the device supports touch events. This is useful to customize messages to say either "click" or "tap".
 * @returns {boolean}
 */
Mouse.prototype.supportsTouch = function() {
	return "ontouchstart" in window || navigator.msMaxTouchPoints;
};
/**
 * Test if a mouse button is currently pressed.
 * @param {number} button The button number to test. Button 0 is typically the left mouse button, as well as the first touch location.
 * @param {number} [x] The left edge of a rectangle to restrict the test to. If the mouse position is outside of this rectangle, the button will not be considered pressed.
 * @param {number} [y] The top edge of a rectangle to restrict the test to. If the mouse position is outside of this rectangle, the button will not be considered pressed.
 * @param {number} [width] The width of a rectangle to restrict the test to. If the mouse position is outside of this rectangle, the button will not be considered pressed.
 * @param {number} [height] The height of a rectangle to restrict the test to. If the mouse position is outside of this rectangle, the button will not be considered pressed.
 * @returns {boolean}
 */
Mouse.prototype.isPressed = function(button, x, y, width, height) {
	var b = this.buttons[button] >= 1;
	if (arguments.length > 1 && (this.x < x || this.x > x + width || this.y < y || this.y > y + height)) {
		b = false;
	}
	return b;
};
/**
 * Test if a mouse button is currently pressed, and was newly pressed down since the last call to consumePressed.
 * If you call this with button 0, it will add a `consumed:true` field to all current touches. This will help you prevent processing a touch multiple times.
 * @param {number} button The button number to test.
 * @param {number} [x] The left edge of a rectangle to restrict the test to. If the mouse position is outside of this rectangle, the button will not be considered pressed.
 * @param {number} [y] The top edge of a rectangle to restrict the test to. If the mouse position is outside of this rectangle, the button will not be considered pressed.
 * @param {number} [width] The width of a rectangle to restrict the test to. If the mouse position is outside of this rectangle, the button will not be considered pressed.
 * @param {number} [height] The height of a rectangle to restrict the test to. If the mouse position is outside of this rectangle, the button will not be considered pressed.
 * @returns {boolean}
 */
Mouse.prototype.consumePressed = function(button, x, y, width, height) {
	var b = this.buttons[button] === 2;
	if (arguments.length > 1 && (this.x < x || this.x > x + width || this.y < y || this.y > y + height)) {
		b = false;
	}
	if (b) {
		this.buttons[button] = 1;
		if (button === 0) {
			for (var i = 0; i < this.touches.length; i++) {
				this.touches[i].consumed = true;
			}
		}
	}
	return b;
};

module.exports = Mouse;

},{"./platform":32}],29:[function(require,module,exports){
"use strict";

var buffer = require("./buffer");

function getContextForImage(image) {
	var ctx;
	buffer.makeBuffer(image.width, image.height, function(context) {
		context.drawImage(image, 0, 0, image.width, image.height);
		ctx = context;
	});
	return ctx;
}

/**
 * A stretchable image that has borders.
 * Similar to the [Android NinePatch]{@link https://developer.android.com/guide/topics/graphics/2d-graphics.html#nine-patch}, but it only has the lines on the bottom and right edges to denote the stretchable area.
 * A NinePatch is a normal picture, but has an extra 1-pixel wide column on the right edge and bottom edge. The extra column contains a black line that denotes the tileable center portion of the image. The lines are used to divide the image into nine tiles that can be automatically repeated to stretch the picture to any size without distortion.
 * @constructor
 * @alias Splat.NinePatch
 * @param {external:image} image The source image to make stretchable.
 */
function NinePatch(image) {
	this.img = image;
	var imgw = image.width - 1;
	var imgh = image.height - 1;

	var context = getContextForImage(image);
	var firstDiv = imgw;
	var secondDiv = imgw;
	var pixel;
	var alpha;
	for (var x = 0; x < imgw; x++) {
		pixel = context.getImageData(x, imgh, 1, 1).data;
		alpha = pixel[3];
		if (firstDiv === imgw && alpha > 0) {
			firstDiv = x;
		}
		if (firstDiv < imgw && alpha === 0) {
			secondDiv = x;
			break;
		}
	}
	this.w1 = firstDiv;
	this.w2 = secondDiv - firstDiv;
	this.w3 = imgw - secondDiv;

	firstDiv = secondDiv = imgh;
	for (var y = 0; y < imgh; y++) {
		pixel = context.getImageData(imgw, y, 1, 1).data;
		alpha = pixel[3];
		if (firstDiv === imgh && alpha > 0) {
			firstDiv = y;
		}
		if (firstDiv < imgh && alpha === 0) {
			secondDiv = y;
			break;
		}
	}
	this.h1 = firstDiv;
	this.h2 = secondDiv - firstDiv;
	this.h3 = imgh - secondDiv;
}
/**
 * Draw the image stretched to a given rectangle.
 * @param {external:CanvasRenderingContext2D} context The drawing context.
 * @param {number} x The left side of the rectangle.
 * @param {number} y The top of the rectangle.
 * @param {number} width The width of the rectangle.
 * @param {number} height The height of the rectangle.
 */
NinePatch.prototype.draw = function(context, x, y, width, height) {
	x = x|0;
	y = y|0;
	width = width |0;
	height = height |0;
	var cx, cy, w, h;

	for (cy = y + this.h1; cy < y + height - this.h3; cy += this.h2) {
		for (cx = x + this.w1; cx < x + width - this.w3; cx += this.w2) {
			w = Math.min(this.w2, x + width - this.w3 - cx);
			h = Math.min(this.h2, y + height - this.h3 - cy);
			context.drawImage(this.img, this.w1, this.h1, w, h, cx, cy, w, h);
		}
	}
	for (cy = y + this.h1; cy < y + height - this.h3; cy += this.h2) {
		h = Math.min(this.h2, y + height - this.h3 - cy);
		if (this.w1 > 0) {
			context.drawImage(this.img, 0,                 this.h1, this.w1, h, x,                   cy, this.w1, h);
		}
		if (this.w3 > 0) {
			context.drawImage(this.img, this.w1 + this.w2, this.h1, this.w3, h, x + width - this.w3, cy, this.w3, h);
		}
	}
	for (cx = x + this.w1; cx < x + width - this.w3; cx += this.w2) {
		w = Math.min(this.w2, x + width - this.w3 - cx);
		if (this.h1 > 0) {
			context.drawImage(this.img, this.w1, 0,                 w, this.h1, cx, y,                    w, this.h1);
		}
		if (this.h3 > 0) {
			context.drawImage(this.img, this.w1, this.w1 + this.w2, w, this.h3, cx, y + height - this.h3, w, this.h3);
		}
	}
	if (this.w1 > 0 && this.h1 > 0) {
		context.drawImage(this.img, 0, 0, this.w1, this.h1, x, y, this.w1, this.h1);
	}
	if (this.w3 > 0 && this.h1 > 0) {
		context.drawImage(this.img, this.w1 + this.w2, 0, this.w3, this.h1, x + width - this.w3, y, this.w3, this.h1);
	}
	if (this.w1 > 0 && this.h3 > 0) {
		context.drawImage(this.img, 0, this.h1 + this.h2, this.w1, this.h3, x, y + height - this.h3, this.w1, this.h3);
	}
	if (this.w3 > 0 && this.h3 > 0) {
		context.drawImage(this.img, this.w1 + this.w2, this.h1 + this.h2, this.w3, this.h3, x + width - this.w3, y + height - this.h3, this.w3, this.h3);
	}
};

module.exports = NinePatch;

},{"./buffer":6}],30:[function(require,module,exports){
"use strict";

var platform = require("./platform");

/**
 * Open a url in a new window.
 * @alias Splat.openUrl
 * @param {string} url The url to open in a new window.
 */
module.exports = function(url) {
	window.open(url);
};

if (platform.isEjecta()) {
	module.exports = function(url) {
		window.ejecta.openURL(url);
	};
}

},{"./platform":32}],31:[function(require,module,exports){
"use strict";

function Particles(max, setupParticle, drawParticle) {
	this.particles = [];
	this.setupParticle = setupParticle;
	this.drawParticle = drawParticle;
	for (var i = 0; i < max; i++) {
		var particle = {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			enabled: false,
			age: 0
		};
		this.setupParticle(particle);
		this.particles.push(particle);
	}
	this.gravity = 0.1;
	this.maxAge = 1000;
}
Particles.prototype.move = function(elapsedMillis) {
	for (var i = 0; i < this.particles.length; i++) {
		var particle = this.particles[i];
		if (!particle.enabled) {
			continue;
		}
		particle.age += elapsedMillis;
		if (particle.age > this.maxAge) {
			particle.enabled = false;
			continue;
		}
		particle.x += particle.vx * elapsedMillis;
		particle.y += particle.vy * elapsedMillis;
		particle.vy += this.gravity;
	}
};
Particles.prototype.draw = function(context) {
	for (var i = 0; i < this.particles.length; i++) {
		var particle = this.particles[i];
		if (!particle.enabled) {
			continue;
		}
		this.drawParticle(context, particle);
	}
};
Particles.prototype.add = function(quantity, x, y, velocity, config) {
	var self = this;
	function setupParticle(particle) {
		particle.enabled = true;
		particle.age = 0;
		particle.x = x;
		particle.y = y;
		particle.vx = (Math.random() - 0.5) * velocity;
		particle.vy = (Math.random() - 0.5) * velocity;
		self.setupParticle(particle, config);
	}

	var particle;
	for (var i = 0; i < this.particles.length; i++) {
		particle = this.particles[i];
		if (particle.enabled) {
			continue;
		}
		if (quantity < 1) {
			return;
		}
		quantity--;
		setupParticle(particle);
	}

	// sort oldest first
	this.particles.sort(function(a, b) {
		return b.age - a.age;
	});

	for (i = 0; i < quantity; i++) {
		particle = this.particles[i];
		setupParticle(particle);
	}
};
Particles.prototype.reset = function() {
	for (var i = 0; i < this.particles.length; i++) {
		this.particles[i].enabled = false;
	}
};

module.exports = Particles;

},{}],32:[function(require,module,exports){
"use strict";

module.exports = {
	isChromeApp: function() {
		return window.chrome && window.chrome.app && window.chrome.app.runtime;
	},
	isEjecta: function() {
		return window.ejecta;
	}
};

},{}],33:[function(require,module,exports){
"use strict";
/**
 * @namespace Splat.saveData
 */

var platform = require("./platform");

function cookieGet(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length === 2) {
		return parts.pop().split(";").shift();
	} else {
		throw "cookie " + name + " was not found";
	}
}

function cookieSet(name, value) {
	var expire = new Date();
	expire.setTime(expire.getTime() + 1000 * 60 * 60 * 24 * 365);
	var cookie = name + "=" + value + "; expires=" + expire.toUTCString() + ";";
	document.cookie = cookie;
}

function getMultiple(getSingleFunc, keys, callback) {
	if (typeof keys === "string") {
		keys = [keys];
	}

	try
	{
		var data = keys.map(function(key) {
			return [key, getSingleFunc(key)];
		}).reduce(function(accum, pair) {
			accum[pair[0]] = pair[1];
			return accum;
		}, {});

		callback(undefined, data);
	}
	catch (e) {
		callback(e);
	}
}

function setMultiple(setSingleFunc, data, callback) {
	try {
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				setSingleFunc(key, data[key]);
			}
		}
		callback();
	}
	catch (e) {
		callback(e);
	}
}

var cookieSaveData = {
	"get": getMultiple.bind(undefined, cookieGet),
	"set": setMultiple.bind(undefined, cookieSet)
};

function localStorageGet(name) {
	return window.localStorage.getItem(name);
}

function localStorageSet(name, value) {
	window.localStorage.setItem(name, value.toString());
}

var localStorageSaveData = {
	"get": getMultiple.bind(undefined, localStorageGet),
	"set": setMultiple.bind(undefined, localStorageSet)
};

/**
 * A function that is called when save data has finished being retrieved.
 * @callback saveDataGetFinished
 * @param {error} err If defined, err is the error that occurred when retrieving the data.
 * @param {object} data The key-value pairs of data that were previously saved.
 */
/**
 * Retrieve data previously stored with {@link Splat.saveData.set}.
 * @alias Splat.saveData.get
 * @param {string | Array} keys A single key or array of key names of data items to retrieve.
 * @param {saveDataGetFinished} callback A callback that is called with the data when it has been retrieved.
 */
function chromeStorageGet(keys, callback) {
	window.chrome.storage.sync.get(keys, function(data) {
		if (window.chrome.runtime.lastError) {
			callback(window.chrome.runtime.lastError);
		} else {
			callback(undefined, data);
		}
	});
}

/**
 * A function that is called when save data has finished being stored.
 * @callback saveDataSetFinished
 * @param {error} err If defined, err is the error that occurred when saving the data.
 */
/**
 * Store data for later.
 * @alias Splat.saveData.set
 * @param {object} data An object containing key-value pairs of data to save.
 * @param {saveDataSetFinished} callback A callback that is called when the data has finished saving.
 */
function chromeStorageSet(data, callback) {
	window.chrome.storage.sync.set(data, function() {
		callback(window.chrome.runtime.lastError);
	});
}

var chromeStorageSaveData = {
	"get": chromeStorageGet,
	"set": chromeStorageSet,
};

if (platform.isChromeApp()) {
	module.exports = chromeStorageSaveData;
} else if (window.localStorage) {
	module.exports = localStorageSaveData;
} else {
	module.exports = cookieSaveData;
}

},{"./platform":32}],34:[function(require,module,exports){
"use strict";

var ECS = require("entity-component-system");
var EntityPool = require("./entity-pool");
var gameLoop = require("./game-loop");

function Scene() {
	this.simulation = new ECS();
	this.renderer = new ECS();
	this.entities = new EntityPool();
	this.simulationStepTime = 5;
}
Scene.prototype.start = function(context) {
	if (this._stop) {
		return;
	}
	if (typeof this.onEnter === "function") {
		this.onEnter();
	}
	this._stop = gameLoop(this.entities, this.simulation, this.simulationStepTime, this.renderer, context);
};
Scene.prototype.stop = function() {
	if (!this._stop) {
		return;
	}
	this._stop();
	delete this._stop;

	if (typeof this.onExit === "function") {
		this.onExit();
	}
};

module.exports = Scene;

},{"./entity-pool":18,"./game-loop":19,"entity-component-system":52}],35:[function(require,module,exports){
"use strict";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

/**
 * Loads sound files and lets you know when they're all available. An instance of SoundLoader is available as {@link Splat.Game#sounds}.
 * This implementation uses the Web Audio API, and if that is not available it automatically falls back to the HTML5 &lt;audio&gt; tag.
 * @constructor
 */
function SoundLoader(onLoad) {
	/**
	 * The key-value object that stores named sounds.
	 * @member {object}
	 * @private
	 */
	this.sounds = {};
	/**
	 * The total number of sounds to be loaded.
	 * @member {number}
	 * @private
	 */
	this.totalSounds = 0;
	/**
	 * The number of sounds that have loaded completely.
	 * @member {number}
	 * @private
	 */
	this.loadedSounds = 0;
	/**
	 * A flag signifying if sounds have been muted through {@link SoundLoader#mute}.
	 * @member {boolean}
	 * @private
	 */
	this.muted = false;
	/**
	 * A key-value object that stores named looping sounds.
	 * @member {object}
	 * @private
	 */
	this.looping = {};

	/**
	 * The Web Audio API AudioContext
	 * @member {external:AudioContext}
	 * @private
	 */
	this.context = new window.AudioContext();

	this.gainNode = this.context.createGain();
	this.gainNode.connect(this.context.destination);
	this.volume = this.gainNode.gain.value;
	this.onLoad = onLoad;
}
/**
 * Load an audio file.
 * @param {string} name The name you want to use when you {@link SoundLoader#play} the sound.
 * @param {string} path The path of the sound file.
 */
SoundLoader.prototype.load = function(name, path) {
	var self = this;

	if (this.totalSounds === 0) {
		// safari on iOS mutes sounds until they're played in response to user input
		// play a dummy sound on first touch
		var firstTouchHandler = function() {
			window.removeEventListener("click", firstTouchHandler);
			window.removeEventListener("keydown", firstTouchHandler);
			window.removeEventListener("touchstart", firstTouchHandler);

			var source = self.context.createOscillator();
			source.connect(self.gainNode);
			source.start(0);
			source.stop(0);

			if (self.firstPlay) {
				self.play(self.firstPlay, self.firstPlayLoop);
			} else {
				self.firstPlay = "workaround";
			}
		};
		window.addEventListener("click", firstTouchHandler);
		window.addEventListener("keydown", firstTouchHandler);
		window.addEventListener("touchstart", firstTouchHandler);
	}

	this.totalSounds++;

	var request = new XMLHttpRequest();
	request.open("GET", path, true);
	request.responseType = "arraybuffer";
	request.addEventListener("readystatechange", function() {
		if (request.readyState !== 4) {
			return;
		}
		if (request.status !== 200 && request.status !== 0) {
			console.error("Error loading sound " + path);
			return;
		}
		self.context.decodeAudioData(request.response, function(buffer) {
			self.sounds[name] = buffer;
			self.loadedSounds++;
			if (self.allLoaded() && self.onLoad) {
				self.onLoad();
			}
		}, function(err) {
			console.error("Error decoding audio data for " + path + ": " + err);
		});
	});
	request.addEventListener("error", function() {
		console.error("Error loading sound " + path);
	});
	try {
		request.send();
	} catch (e) {
		console.error("Error loading sound", path, e);
	}
};
SoundLoader.prototype.loadFromManifest = function(manifest) {
	var keys = Object.keys(manifest);
	var self = this;
	keys.forEach(function(key) {
		self.load(key, manifest[key]);
	});
};
/**
 * Test if all sounds have loaded.
 * @returns {boolean}
 */
SoundLoader.prototype.allLoaded = function() {
	return this.totalSounds === this.loadedSounds;
};
/**
 * Play a sound.
 * @param {string} name The name given to the sound during {@link SoundLoader#load}
 * @param {boolean} [loop=false] A flag denoting whether the sound should be looped. To stop a looped sound use {@link SoundLoader#stop}.
 */
SoundLoader.prototype.play = function(name, loop) {
	if (loop && this.looping[name]) {
		return;
	}
	if (!this.firstPlay) {
		// let the iOS user input workaround handle it
		this.firstPlay = name;
		this.firstPlayLoop = loop;
		return;
	}
	var snd = this.sounds[name];
	if (snd === undefined) {
		console.error("Unknown sound: " + name);
	}
	var source = this.context.createBufferSource();
	source.buffer = snd;
	source.connect(this.gainNode);
	if (loop) {
		source.loop = true;
		this.looping[name] = source;
	}
	source.start(0);
};
/**
 * Stop playing a sound. This currently only stops playing a sound that was looped earlier, and doesn't stop a sound mid-play. Patches welcome.
 * @param {string} name The name given to the sound during {@link SoundLoader#load}
 */
SoundLoader.prototype.stop = function(name) {
	if (!this.looping[name]) {
		return;
	}
	this.looping[name].stop(0);
	delete this.looping[name];
};
/**
 * Silence all sounds. Sounds keep playing, but at zero volume. Call {@link SoundLoader#unmute} to restore the previous volume level.
 */
SoundLoader.prototype.mute = function() {
	this.gainNode.gain.value = 0;
	this.muted = true;
};
/**
 * Restore volume to whatever value it was before {@link SoundLoader#mute} was called.
 */
SoundLoader.prototype.unmute = function() {
	this.gainNode.gain.value = this.volume;
	this.muted = false;
};
/**
 * Set the volume of all sounds.
 * @param {number} gain The desired volume level. A number between 0.0 and 1.0, with 0.0 being silent, and 1.0 being maximum volume.
 */
SoundLoader.prototype.setVolume = function(gain) {
	this.volume = gain;
	this.gainNode.gain  = gain;
	this.muted = false;
};
/**
 * Test if the volume is currently muted.
 * @return {boolean} True if the volume is currently muted.
 */
SoundLoader.prototype.isMuted = function() {
	return this.muted;
};

function AudioTagSoundLoader(onLoad) {
	this.sounds = {};
	this.totalSounds = 0;
	this.loadedSounds = 0;
	this.muted = false;
	this.looping = {};
	this.volume = new Audio().volume;
	this.onLoad = onLoad;
}
AudioTagSoundLoader.prototype.load = function(name, path) {
	this.totalSounds++;

	var audio = new Audio();
	var self = this;
	audio.addEventListener("error", function() {
		console.error("Error loading sound " + path);
	});
	audio.addEventListener("canplaythrough", function() {
		self.sounds[name] = audio;
		self.loadedSounds++;
		if (self.allLoaded() && self.onLoad) {
			self.onLoad();
		}
	});
	audio.volume = this.volume;
	audio.src = path;
	audio.load();
};
AudioTagSoundLoader.prototype.loadFromManifest = function(manifest) {
	var keys = Object.keys(manifest);
	var self = this;
	keys.forEach(function(key) {
		self.load(key, manifest[key]);
	});
};
AudioTagSoundLoader.prototype.allLoaded = function() {
	return this.totalSounds === this.loadedSounds;
};
AudioTagSoundLoader.prototype.play = function(name, loop) {
	if (loop && this.looping[name]) {
		return;
	}
	var snd = this.sounds[name];
	if (snd === undefined) {
		console.error("Unknown sound: " + name);
	}
	if (loop) {
		snd.loop = true;
		this.looping[name] = snd;
	}
	snd.play();
};
AudioTagSoundLoader.prototype.stop = function(name) {
	var snd = this.looping[name];
	if (!snd) {
		return;
	}
	snd.loop = false;
	snd.pause();
	snd.currentTime = 0;
	delete this.looping[name];
};
function setAudioTagVolume(sounds, gain) {
	for (var name in sounds) {
		if (sounds.hasOwnProperty(name)) {
			sounds[name].volume = gain;
		}
	}
}
AudioTagSoundLoader.prototype.mute = function() {
	setAudioTagVolume(this.sounds, 0);
	this.muted = true;
};
AudioTagSoundLoader.prototype.unmute = function() {
	setAudioTagVolume(this.sounds, this.volume);
	this.muted = false;
};
AudioTagSoundLoader.prototype.setVolume = function(gain) {
	this.volume = gain;
	setAudioTagVolume(this.sounds, gain);
	this.muted = false;
};
AudioTagSoundLoader.prototype.isMuted = function() {
	return this.muted;
};


function FakeSoundLoader(onLoad) {
	this.onLoad = onLoad;
}
FakeSoundLoader.prototype.load = function() {
	if (this.onLoad) {
		this.onLoad();
	}
};
FakeSoundLoader.prototype.loadFromManifest = function() {};
FakeSoundLoader.prototype.allLoaded = function() { return true; };
FakeSoundLoader.prototype.play = function() {};
FakeSoundLoader.prototype.stop = function() {};
FakeSoundLoader.prototype.mute = function() {};
FakeSoundLoader.prototype.unmute = function() {};
FakeSoundLoader.prototype.setVolume = function() {};
FakeSoundLoader.prototype.isMuted = function() {
	return true;
};

if (window.AudioContext) {
	module.exports = SoundLoader;
} else if (window.Audio) {
	module.exports = AudioTagSoundLoader;
} else {
	console.log("This browser doesn't support the Web Audio API or the HTML5 audio tag.");
	module.exports = FakeSoundLoader;
}

},{}],36:[function(require,module,exports){
"use strict";

module.exports = {
	advanceAnimations: require("./systems/advance-animations"),
	advanceTimers: require("./systems/advance-timers"),
	applyFriction: require("./systems/apply-friction"),
	applyMovement2d: require("./systems/apply-movement-2d"),
	applyVelocity: require("./systems/apply-velocity"),
	boxCollider: require("./systems/box-collider"),
	centerPosition: require("./systems/center-position"),
	clearScreen: require("./systems/clear-screen"),
	constrainToPlayableArea: require("./systems/constrain-to-playable-area"),
	controlPlayer: require("./systems/control-player"),
	drawFrameRate: require("./systems/draw-frame-rate"),
	drawImage: require("./systems/draw-image"),
	drawRectangles: require("./systems/draw-rectangles"),
	followParent: require("./systems/follow-parent"),
	viewport: require("./systems/viewport"),
};

},{"./systems/advance-animations":37,"./systems/advance-timers":38,"./systems/apply-friction":39,"./systems/apply-movement-2d":40,"./systems/apply-velocity":41,"./systems/box-collider":42,"./systems/center-position":43,"./systems/clear-screen":44,"./systems/constrain-to-playable-area":45,"./systems/control-player":46,"./systems/draw-frame-rate":47,"./systems/draw-image":48,"./systems/draw-rectangles":49,"./systems/follow-parent":50,"./systems/viewport":51}],37:[function(require,module,exports){
"use strict";

function setOwnPropertiesDeep(src, dest) {
	var props = Object.keys(src);
	for (var i = 0; i < props.length; i++) {
		var prop = props[i];
		var val = src[prop];
		if (typeof val === "object") {
			if (!dest[prop]) {
				dest[prop] = {};
			}
			setOwnPropertiesDeep(val, dest[prop]);
		} else {
			dest[prop] = val;
		}
	}
}

module.exports = function advanceAnimations(ecs, data) {
	ecs.addEach(function(entity, elapsed) {
		if (entity.animation === undefined) {
			return;
		}
		var animation = data.animations[entity.animation.name];
		if (animation === undefined) {
			return;
		}

		entity.animation.time += elapsed * entity.animation.speed;
		while (entity.animation.time > animation[entity.animation.frame].time) {
			entity.animation.time -= animation[entity.animation.frame].time;
			entity.animation.frame++;
			if (entity.animation.frame >= animation.length) {
				if (entity.animation.loop) {
					entity.animation.frame = 0;
				} else {
					entity.animation.frame--;
				}
			}
		}
		setOwnPropertiesDeep(animation[entity.animation.frame].properties, entity);
	}, ["animation"]);
};

},{}],38:[function(require,module,exports){
"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) {
		var names = Object.keys(entity.timers);

		names.forEach(function(name) {
			var timer = entity.timers[name];
			if (!timer.running) {
				return;
			}

			timer.time += elapsed;

			if (timer.time > timer.max) {
				timer.running = false;
				timer.time = 0;

				if (timer.script !== undefined) {
					var script = data.require(timer.script);
					script(entity, data);
				}
			}
		});
	}, ["timers"]);
};

},{}],39:[function(require,module,exports){
"use strict";

module.exports = function(ecs) {
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		entity.velocity.x *= entity.friction.x;
		entity.velocity.y *= entity.friction.y;
	}, ["velocity", "friction"]);
};

},{}],40:[function(require,module,exports){
"use strict";

module.exports = function(ecs) {
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		if (entity.movement2d.up && entity.velocity.y > entity.movement2d.upMax) {
			entity.velocity.y += entity.movement2d.upAccel;
		}
		if (entity.movement2d.down && entity.velocity.y < entity.movement2d.downMax) {
			entity.velocity.y += entity.movement2d.downAccel;
		}
		if (entity.movement2d.left && entity.velocity.x > entity.movement2d.leftMax) {
			entity.velocity.x += entity.movement2d.leftAccel;
		}
		if (entity.movement2d.right && entity.velocity.x < entity.movement2d.rightMax) {
			entity.velocity.x += entity.movement2d.rightAccel;
		}
	}, ["velocity", "movement2d"]);
};

},{}],41:[function(require,module,exports){
"use strict";

module.exports = function(ecs) {
	ecs.addEach(function(entity, elapsed) {
		entity.position.x += entity.velocity.x * elapsed;
		entity.position.y += entity.velocity.y * elapsed;
	}, ["position", "velocity"]);
};

},{}],42:[function(require,module,exports){
"use strict";

var gridSize = 64;

function toGrid(i) {
	return Math.floor(i / gridSize);
}
function keys(entity) {
	var x1 = toGrid(entity.position.x);
	var x2 = toGrid(entity.position.x + entity.size.width);

	var y1 = toGrid(entity.position.y);
	var y2 = toGrid(entity.position.y + entity.size.height);

	var k = [];
	for (var x = x1; x <= x2; x++) {
		for (var y = y1; y <= y2; y++) {
			k.push(x + "," + y);
		}
	}
	return k;
}

function add(hash, entity, key) {
	if (!hash[key]) {
		hash[key] = [entity];
		return;
	}
	for (var i = 0; i < hash[key].length; i++) {
		var peer = hash[key][i];
		// FIXME: when an entity's collisions are removed, it stays forever in the hash. this needs to get cleaned up somehow.
		if (peer.collisions === undefined) {
			continue;
		}
		if (collides(entity, peer)) {
			entity.collisions.push(peer.id);
			peer.collisions.push(entity.id);
		}
	}
	hash[key].push(entity);
}

function remove(hash, entity, key) {
	var list = hash[key];
	var pos = list.indexOf(entity);
	if (pos === -1) {
		return;
	}
	list.splice(pos, 1);
}

function collides(b, a) {
	return a.position.x + a.size.width > b.position.x &&
		a.position.x < b.position.x + b.size.width &&
		a.position.y + a.size.height > b.position.y &&
		a.position.y < b.position.y + b.size.height;
}

module.exports = function(ecs, data) {
	var spatialHash = {};

	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		function notCurrentEntityId(id) {
			return id !== entity.id;
		}
		if (entity.collisionKeys === undefined || entity.velocity !== undefined) {
			var oldKeys = entity.collisionKeys || [];
			entity.collisionKeys = keys(entity);

			if (entity.velocity !== undefined || !areArraysSame(oldKeys, entity.collisionKeys)) {
				for (var i = 0; i < oldKeys.length; i++) {
					remove(spatialHash, entity, oldKeys[i]);
				}
				for (i = 0; i < entity.collisions.length; i++) {
					var peer = data.entities.entities[entity.collisions[i]];
					peer.collisions = peer.collisions.filter(notCurrentEntityId);
				}
				entity.collisions = [];
				for (i = 0; i < entity.collisionKeys.length; i++) {
					add(spatialHash, entity, entity.collisionKeys[i]);
				}
			}
		}
	}, ["position", "size", "collisions"]);
};

function areArraysSame(a, b) {
	if (a.length !== b.length) {
		return false;
	}
	for (var i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
}

},{}],43:[function(require,module,exports){
"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		// FIXME: doesn't work with cameras yet.
		if (entity.center.x) {
			entity.position.x = Math.floor(data.canvas.width / 2);
			if (entity.size) {
				entity.position.x -= Math.floor(entity.size.width / 2);
			}
		}
		if (entity.center.y) {
			entity.position.y = Math.floor(data.canvas.height / 2);
			if (entity.size) {
				entity.position.y -= Math.floor(entity.size.height / 2);
			}
		}
	}, ["position", "center"]);
};

},{}],44:[function(require,module,exports){
"use strict";

module.exports = function(ecs, data) {
	ecs.add(function(entities, context) { // jshint ignore:line
		context.clearRect(0, 0, data.canvas.width, data.canvas.height);
	});
};

},{}],45:[function(require,module,exports){
"use strict";

module.exports = function(ecs) {
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		if (entity.position.x < entity.playableArea.x) {
			entity.position.x = entity.playableArea.x;
		}
		if (entity.position.x + entity.size.width > entity.playableArea.x + entity.playableArea.width) {
			entity.position.x = entity.playableArea.x + entity.playableArea.width - entity.size.width;
		}
		if (entity.position.y < entity.playableArea.y) {
			entity.position.y = entity.playableArea.y;
		}
		if (entity.position.y + entity.size.height > entity.playableArea.y + entity.playableArea.height) {
			entity.position.y = entity.playableArea.y + entity.playableArea.height - entity.size.height;
		}
	}, ["position", "size", "playableArea"]);
};

},{}],46:[function(require,module,exports){
"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		entity.movement2d.up = data.input.button(entity.playerController2d.up);
		entity.movement2d.down = data.input.button(entity.playerController2d.down);
		entity.movement2d.left = data.input.button(entity.playerController2d.left);
		entity.movement2d.right = data.input.button(entity.playerController2d.right);
	}, ["movement2d", "playerController2d"]);
};

},{}],47:[function(require,module,exports){
"use strict";

module.exports = function(ecs, data) {
	ecs.add(function(entities, context, elapsed) { // jshint ignore:line
		var fps = Math.floor(1000 / elapsed);

		context.font = "24px mono";
		if (fps < 30) {
			context.fillStyle = "red";
		} else if (fps < 50) {
			context.fillStyle = "yellow";
		} else {
			context.fillStyle = "green";
		}

		var msg = fps + " FPS";
		var w = context.measureText(msg).width;
		context.fillText(msg, data.canvas.width - w - 50, 50);
	});
};

},{}],48:[function(require,module,exports){
"use strict";

function drawEntity(data, entity, context) {
	var image = data.images.get(entity.image.name);
	if (!image) {
		console.error("No such image", entity.image.name);
		return;
	}
	try {
		context.drawImage(
			image,
			entity.image.sourceX,
			entity.image.sourceY,
			entity.image.sourceWidth,
			entity.image.sourceHeight,
			entity.image.destinationX + entity.position.x,
			entity.image.destinationY + entity.position.y,
			entity.image.destinationWidth,
			entity.image.destinationHeight
		);
	} catch (e) {
		console.error("Error drawing image", entity.image.name, e);
	}
}
module.exports = function(ecs, data) {
	
	ecs.add(function(entities, context) {
		var keys = Object.keys(entities);
		keys.sort(function(a, b) {
			var za = (entities[a].zindex || { zindex: 0 }).zindex;
			var zb = (entities[b].zindex || { zindex: 0 }).zindex;
			var ya = (entities[a].position || { y: 0 }).y;
			var yb = (entities[b].position || { y: 0 }).y;
			return za - zb || ya - yb;
		});

		for (var i = 0; i < keys.length; i++) {
			var entity = entities[keys[i]];
			if (entity.image === undefined || entity.position === undefined) {
				continue;
			}
			drawEntity(data, entity, context);
		}
	});
	
};

},{}],49:[function(require,module,exports){
"use strict";

module.exports = function(ecs) {
	ecs.addEach(function(entity, context) {
		if (entity.strokeStyle) {
			context.strokeStyle = entity.strokeStyle;
		}
		context.strokeRect(Math.floor(entity.position.x), Math.floor(entity.position.y), entity.size.width, entity.size.height);
	}, ["position", "size"]);
};

},{}],50:[function(require,module,exports){
"use strict";

function distanceSquared(x1, y1, x2, y2) {
	return ((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2));
}

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		var x1 = entity.position.x + (entity.size.width / 2);
		var y1 = entity.position.y + (entity.size.height / 2);

		var parent = data.entities.entities[entity.follow.id];
		if (parent === undefined) {
			return;
		}
		var x2 = parent.position.x + (parent.size.width / 2);
		var y2 = parent.position.y + (parent.size.height / 2);

		var angle = Math.atan2(y2 - y1, x2 - x1);
		if (entity.rotation !== undefined) {
			entity.rotation.angle = angle - (Math.PI / 2);
		}

		var distSquared = distanceSquared(x1, y1, x2, y2);
		if (distSquared < entity.follow.distance * entity.follow.distance) {
			return;
		}

		var toMove = Math.sqrt(distSquared) - entity.follow.distance;

		entity.position.x += toMove * Math.cos(angle);
		entity.position.y += toMove * Math.sin(angle);
	}, ["position", "follow"]);
};

},{}],51:[function(require,module,exports){
"use strict";

var x = 0;
var y = 0;

module.exports = {
	moveToCamera: function(ecs) {
		ecs.add(function(entities, context) { // jshint ignore:line
			x = 0;
			y = 0;
		});
		ecs.addEach(function(entity, context) {
			var dx = Math.floor(entity.position.x + entity.camera.x) - x;
			var dy = Math.floor(entity.position.y + entity.camera.y) - y;
			x += dx;
			y += dy;
			context.translate(-dx, -dy);
		}, ["camera", "position"]);
	},
	reset: function(ecs) {
		ecs.addEach(function(entity, context) { // jshint ignore:line
			context.translate(x, y);
			x = 0;
			y = 0;
		}, ["camera", "position"]);
	}
};

},{}],52:[function(require,module,exports){
"use strict";

function EntityComponentSystem() {
	this.systems = [];
	this.now = function() {
		return 0;
	};
}
EntityComponentSystem.prototype.add = function(code) {
	this.systems.push(code);
};
EntityComponentSystem.prototype.addEach = function(code, requirements) {
	this.systems.push(function(entities) {
		var args = arguments;
		var keys = Object.keys(entities);
		for (var i = 0; i < keys.length; i++) {
			var entity = entities[keys[i]];
			if (requirements && !entityHasComponents(requirements, entity)) {
				continue;
			}
			args[0] = entity;
			code.apply(undefined, args);
		}
	});
};
EntityComponentSystem.prototype.run = function() {
	var args = arguments;
	var times = [];
	for (var i = 0; i < this.systems.length; i++) {
		var start = this.now();
		this.systems[i].apply(undefined, args);
		times.push(this.now() - start);
	}
	return times;
};

function entityHasComponents(components, entity) {
	for (var i = 0; i < components.length; i++) {
		if (!entity.hasOwnProperty(components[i])) {
			return false;
		}
	}
	return true;
}

module.exports = EntityComponentSystem;

},{}],53:[function(require,module,exports){
"use strict";

/**
 * Keyboard input handling.
 * @constructor
 * @param {module:KeyMap} keymap A map of keycodes to descriptive key names.
 */
function Keyboard(keyMap) {
	/**
	 * The current key states.
	 * @member {object}
	 * @private
	 */
	this.keys = {};

	var self = this;
	for (var kc in keyMap) {
		if (keyMap.hasOwnProperty(kc)) {
			this.keys[keyMap[kc]] = 0;
		}
	}
	window.addEventListener("keydown", function(event) {
		if (keyMap.hasOwnProperty(event.keyCode)) {
			if (self.keys[keyMap[event.keyCode]] === 0) {
				self.keys[keyMap[event.keyCode]] = 2;
			}
			return false;
		}
	});
	window.addEventListener("keyup", function(event) {
		if (keyMap.hasOwnProperty(event.keyCode)) {
			self.keys[keyMap[event.keyCode]] = 0;
			return false;
		}
	});
}
/**
 * Test if a key is currently pressed.
 * @param {string} name The name of the key to test
 * @returns {boolean}
 */
Keyboard.prototype.isPressed = function(name) {
	return this.keys[name] >= 1;
};
/**
 * Test if a key is currently pressed, also making it look like the key was unpressed.
 * This makes is so multiple successive calls will not return true unless the key was repressed.
 * @param {string} name The name of the key to test
 * @returns {boolean}
 */
Keyboard.prototype.consumePressed = function(name) {
	var p = this.keys[name] === 2;
	if (p) {
		this.keys[name] = 1;
	}
	return p;
};

module.exports = Keyboard;

},{}],54:[function(require,module,exports){
/**
 * Keyboard code mappings that map keycodes to key names. A specific named map should be given to {@link Keyboard}.
 * @module KeyMap
 */
module.exports = {
	"US": {
		8: "backspace",
		9: "tab",
		13: "enter",
		16: "shift",
		17: "ctrl",
		18: "alt",
		19: "pause/break",
		20: "capslock",
		27: "escape",
		32: "space",
		33: "pageup",
		34: "pagedown",
		35: "end",
		36: "home",
		37: "left",
		38: "up",
		39: "right",
		40: "down",
		45: "insert",
		46: "delete",
		48: "0",
		49: "1",
		50: "2",
		51: "3",
		52: "4",
		53: "5",
		54: "6",
		55: "7",
		56: "8",
		57: "9",
		65: "a",
		66: "b",
		67: "c",
		68: "d",
		69: "e",
		70: "f",
		71: "g",
		72: "h",
		73: "i",
		74: "j",
		75: "k",
		76: "l",
		77: "m",
		78: "n",
		79: "o",
		80: "p",
		81: "q",
		82: "r",
		83: "s",
		84: "t",
		85: "u",
		86: "v",
		87: "w",
		88: "x",
		89: "y",
		90: "z",
		91: "leftwindow",
		92: "rightwindow",
		93: "select",
		96: "numpad-0",
		97: "numpad-1",
		98: "numpad-2",
		99: "numpad-3",
		100: "numpad-4",
		101: "numpad-5",
		102: "numpad-6",
		103: "numpad-7",
		104: "numpad-8",
		105: "numpad-9",
		106: "multiply",
		107: "add",
		109: "subtract",
		110: "decimalpoint",
		111: "divide",
		112: "f1",
		113: "f2",
		114: "f3",
		115: "f4",
		116: "f5",
		117: "f6",
		118: "f7",
		119: "f8",
		120: "f9",
		121: "f10",
		122: "f11",
		123: "f12",
		144: "numlock",
		145: "scrolllock",
		186: "semicolon",
		187: "equals",
		188: "comma",
		189: "dash",
		190: "period",
		191: "forwardslash",
		192: "graveaccent",
		219: "openbracket",
		220: "backslash",
		221: "closebraket",
		222: "singlequote"
	}
};

},{}],55:[function(require,module,exports){
/*
  https://github.com/banksean wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.
  
  If you want to use this as a substitute for Math.random(), use the random()
  method like so:
  
  var m = new MersenneTwister();
  var randomNumber = m.random();
  
  You can also call the other genrand_{foo}() methods on the instance.
 
  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:
 
  var m = new MersenneTwister(123);
 
  and that will always produce the same random sequence.
 
  Sean McCullough (banksean@gmail.com)
*/
 
/* 
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.
 
   Before using, initialize the state by using init_seed(seed)  
   or init_by_array(init_key, key_length).
 
   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.                          
 
   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:
 
     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
 
     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
 
     3. The names of its contributors may not be used to endorse or promote 
        products derived from this software without specific prior written 
        permission.
 
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
 
   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/
 
var MersenneTwister = function(seed) {
	if (seed == undefined) {
		seed = new Date().getTime();
	} 

	/* Period parameters */  
	this.N = 624;
	this.M = 397;
	this.MATRIX_A = 0x9908b0df;   /* constant vector a */
	this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
	this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

	this.mt = new Array(this.N); /* the array for the state vector */
	this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

	this.init_seed(seed);
}  

/* initializes mt[N] with a seed */
/* origin name init_genrand */
MersenneTwister.prototype.init_seed = function(s) {
	this.mt[0] = s >>> 0;
	for (this.mti=1; this.mti<this.N; this.mti++) {
		var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
		this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
		+ this.mti;
		/* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
		/* In the previous versions, MSBs of the seed affect   */
		/* only MSBs of the array mt[].                        */
		/* 2002/01/09 modified by Makoto Matsumoto             */
		this.mt[this.mti] >>>= 0;
		/* for >32 bit machines */
	}
}

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
	var i, j, k;
	this.init_seed(19650218);
	i=1; j=0;
	k = (this.N>key_length ? this.N : key_length);
	for (; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
		+ init_key[j] + j; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++; j++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
		if (j>=key_length) j=0;
	}
	for (k=this.N-1; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
		- i; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
	}

	this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */ 
}

/* generates a random number on [0,0xffffffff]-interval */
/* origin name genrand_int32 */
MersenneTwister.prototype.random_int = function() {
	var y;
	var mag01 = new Array(0x0, this.MATRIX_A);
	/* mag01[x] = x * MATRIX_A  for x=0,1 */

	if (this.mti >= this.N) { /* generate N words at one time */
		var kk;

		if (this.mti == this.N+1)  /* if init_seed() has not been called, */
			this.init_seed(5489);  /* a default initial seed is used */

		for (kk=0;kk<this.N-this.M;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		for (;kk<this.N-1;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
		this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

		this.mti = 0;
	}

	y = this.mt[this.mti++];

	/* Tempering */
	y ^= (y >>> 11);
	y ^= (y << 7) & 0x9d2c5680;
	y ^= (y << 15) & 0xefc60000;
	y ^= (y >>> 18);

	return y >>> 0;
}

/* generates a random number on [0,0x7fffffff]-interval */
/* origin name genrand_int31 */
MersenneTwister.prototype.random_int31 = function() {
	return (this.random_int()>>>1);
}

/* generates a random number on [0,1]-real-interval */
/* origin name genrand_real1 */
MersenneTwister.prototype.random_incl = function() {
	return this.random_int()*(1.0/4294967295.0); 
	/* divided by 2^32-1 */ 
}

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function() {
	return this.random_int()*(1.0/4294967296.0); 
	/* divided by 2^32 */
}

/* generates a random number on (0,1)-real-interval */
/* origin name genrand_real3 */
MersenneTwister.prototype.random_excl = function() {
	return (this.random_int() + 0.5)*(1.0/4294967296.0); 
	/* divided by 2^32 */
}

/* generates a random number on [0,1) with 53-bit resolution*/
/* origin name genrand_res53 */
MersenneTwister.prototype.random_long = function() { 
	var a=this.random_int()>>>5, b=this.random_int()>>>6; 
	return(a*67108864.0+b)*(1.0/9007199254740992.0); 
} 

/* These real versions are due to Isaku Wada, 2002/01/09 added */

module.exports = MersenneTwister;

},{}],56:[function(require,module,exports){
module.exports = function(rate) {
	var accum = 0;
	return function(time, callback) {
		accum += time;
		while (accum >= rate) {
			accum -= rate;
			callback(rate);
		}
	};
};

},{}],57:[function(require,module,exports){
module.exports={
	"bg": [
	  {
	   "time": 100,
	   "properties": {
	    "image": {
	     "name": "bg",
	     "sourceX": 0,
	     "sourceY": 0,
	     "sourceWidth": 1136,
	     "sourceHeight": 640
	    }
	   }
	  }
	 ],
	 "player-idle":[
	 	{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 375,
	 				"sourceY":875,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 375,
	 				"sourceY":1000,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		}
	 ],
	 "player-lean-right":[
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 500,
	 				"sourceY":875,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 500,
	 				"sourceY":1000,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 625,
	 				"sourceY":875,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 625,
	 				"sourceY":1000,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		}
	 ],
	 "player-full-right":[
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 750,
	 				"sourceY":875,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 750,
	 				"sourceY":1000,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		}
	 ],
	 "player-lean-left":[
	 	{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 125,
	 				"sourceY":875,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 125,
	 				"sourceY":1000,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 250,
	 				"sourceY":875,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 250,
	 				"sourceY":1000,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		}
	 ],
	 "player-full-left":[
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 0,
	 				"sourceY":875,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 0,
	 				"sourceY":1000,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		}

	 ],
	 "player-damage-i":[
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{

	 				"name": "player",
	 				"sourceX": 0,
	 				"sourceY":0,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 					"name": "player",
	 				"sourceX": 0,
	 				"sourceY":125,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 				
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 125,
	 				"sourceY":0,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 125,
	 				"sourceY":125,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 250,
	 				"sourceY":0,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 250,
	 				"sourceY":125,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 375,
	 				"sourceY":0,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 375,
	 				"sourceY":125,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 500,
	 				"sourceY":0,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 500,
	 				"sourceY":125,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 625,
	 				"sourceY":0,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 625,
	 				"sourceY":125,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 750,
	 				"sourceY":0,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 750,
	 				"sourceY":125,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		}
	 ],
	 "player-i":[
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 0,
	 				"sourceY":250,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 0,
	 				"sourceY":375,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 125,
	 				"sourceY":250,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 125,
	 				"sourceY":375,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 250,
	 				"sourceY":250,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 250,
	 				"sourceY":375,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 375,
	 				"sourceY":250,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 375,
	 				"sourceY":375,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 500,
	 				"sourceY":250,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 500,
	 				"sourceY":375,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 625,
	 				"sourceY":250,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 625,
	 				"sourceY":375,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 750,
	 				"sourceY":250,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 750,
	 				"sourceY":375,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		}
	 ],
	 "player-back":[
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 0,
	 				"sourceY":500,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 125,
	 				"sourceY":500,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},	
	 ],
	 "player-back-damaged":[
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 250,
	 				"sourceY":500,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 375,
	 				"sourceY":500,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},	
	 ],
	 "player-damaged":[
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 0,
	 				"sourceY":625,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 0,
	 				"sourceY":750,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 125,
	 				"sourceY":625,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 125,
	 				"sourceY":750,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 250,
	 				"sourceY":625,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 250,
	 				"sourceY":750,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 375,
	 				"sourceY":625,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 375,
	 				"sourceY":750,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 500,
	 				"sourceY":625,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 500,
	 				"sourceY":750,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 625,
	 				"sourceY":625,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 625,
	 				"sourceY":750,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 750,
	 				"sourceY":625,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 750,
	 				"sourceY":750,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		}
	 ],
	 "player":[
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 0,
	 				"sourceY":875,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 0,
	 				"sourceY":1000,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 125,
	 				"sourceY":875,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 125,
	 				"sourceY":1000,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 250,
	 				"sourceY":875,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 250,
	 				"sourceY":1000,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 375,
	 				"sourceY":875,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 375,
	 				"sourceY":1000,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 500,
	 				"sourceY":875,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 500,
	 				"sourceY":1000,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 625,
	 				"sourceY":875,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 625,
	 				"sourceY":1000,
	 				"sourceWidth":97,
	 				"sourceHeight":115
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 750,
	 				"sourceY":875,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		},
	 		{
	 			"time" : 50,
	 			"properties" : {
	 				"image":{
	 				"name": "player",
	 				"sourceX": 750,
	 				"sourceY":1000,
	 				"sourceWidth":100,
	 				"sourceHeight":96
	 				}
	 			}
	 		}
	 ]
}
},{}],58:[function(require,module,exports){
module.exports={
  "title": [
    {
      "id": 0,
      "name": "background"
      
    }
  ],
 "main": [
    {
     "id": 1,
     "name": "player",
     "player": true,
     "position": {
      "x": 100,
      "y": 100
     },
     "size": {
      "width": 97,
      "height": 125
     },
     "velocity": {
      "x": 0,
      "y": 0
     },
     "animationIndex" : 2,
     "damaged": false,
     "animation": {
      "time": 100,
      "frame": 0,
      "loop": true,
      "speed": 1,
      "name": "player-idle"
     },
     "image": {
      "name": "player",
      "sourceX": 0,
      "sourceY": 0,
      "sourceWidth": 0,
      "sourceHeight": 0,
      "destinationX": 0,
      "destinationY": 0,
      "destinationWidth": 60,
      "destinationHeight": 80
     },
     "timers":{
      "center": {
        "running":false,
        "time": 0,
        "max": 100,
        "script": "scripts/player-state-machine"
      },
      "left":{
        "running":false,
        "time": 0,
        "max": 200,
        "script": "scripts/player-state-machine"
      },
      "right":{
        "running":false,
        "time": 0,
        "max": 200,
        "script": "scripts/player-state-machine"
      }
    }
    },
    {
      "id": 0,
      "name": "background",
      "position": {
        "x": 0,
        "y": 0
      },
      "animation": {
        "time": 0,
        "frame": 0,
        "loop": true,
        "speed": 1,
        "name": "bg"
      },
      "image": {
        "name":"bg",
        "sourceX": 0,
        "sourceY": 0,
        "sourceWidth": 0,
        "sourceHeight": 0,
        "destinationX": 0,
        "destinationY": 0,
        "destinationWidth": 1136,
        "destinationHeight": 640
      },
      "zindex": -1
    }
  ]

}

},{}],59:[function(require,module,exports){
module.exports={
	"aim": "images/range_33pxapart.png",
	"bg": "images/background.png",
	"buildings": "images/buildings.png",
	"beermug":"images/beermug.png",
	"player": "images/hero_sprites.png",
	"titlescreen": "images/title.png"
}
},{}],60:[function(require,module,exports){
module.exports={
 "up": {
  "type": "button",
  "inputs": [
   {
    "device": "keyboard",
    "key": "w"
   },
   {
    "device": "keyboard",
    "key": "up"
   }
  ]
 },
 "down": {
  "type": "button",
  "inputs": [
   {
    "device": "keyboard",
    "key": "s"
   },
   {
    "device": "keyboard",
    "key": "down"
   }
  ]
 },
 "left": {
  "type": "button",
  "inputs": [
   {
    "device": "keyboard",
    "key": "a"
   },
   {
    "device": "keyboard",
    "key": "left"
   }
  ]
 },
 "right": {
  "type": "button",
  "inputs": [
   {
    "device": "keyboard",
    "key": "d"
   },
   {
    "device": "keyboard",
    "key": "right"
   }
  ]
 }
}

},{}],61:[function(require,module,exports){
module.exports={
	"title":{
		"first":true,
		"onEnter": "./scripts/title-enter",
		"onExit": "./scripts/title-exit"
	},
 	"main": {
  	"first": false,
  	"onEnter": "./scripts/main-enter",
  	"onExit": "./scripts/main-exit"
 	}
}

},{}],62:[function(require,module,exports){
module.exports={}
},{}],63:[function(require,module,exports){
module.exports={
 "simulation": [
  {
   "name": "splatjs:advanceTimers",
   "scenes": [
    "main"
   ]
  },
  {
   "name": "splatjs:advanceAnimations",
   "scenes": [
    "main"
   ]
  },
  {
   "name": "./systems/simulation/control-player",
   "scenes": [
    "main"
   ]
  },
  {
   "name": "./systems/simulation/start-game",
   "scenes": [
    "title"
   ]
  },
  {
   "name": "splatjs:applyVelocity",
   "scenes": [
    "main"
   ]
  },
  {
   "name": "splatjs:followParent",
   "scenes": [
    "main"
   ]
  },
  {
   "name": "splatjs:boxCollider",
   "scenes": [
    "main"
   ]
  }
 ],
 "renderer": [
  {
   "name": "splatjs:clearScreen",
   "scenes": [
    "main"
   ]
  },
  {
    "name": "./systems/renderer/render-title",
    "scenes":[
      "title"
    ]
  },
  {
    "name": "./systems/renderer/render-background",
    "scenes":[
      "main"
    ]
  },
  {
   "name": "splatjs:viewport.moveToCamera",
   "scenes": [
    "main"
   ]
  },
  {
   "name": "splatjs:drawImage",
   "scenes": [
    "main"
   ]
  },
  {
   "name": "./systems/renderer/render-player",
   "scenes": [
    "main"
   ]
  },
  {
    "name":"./systems/renderer/render-buildings",
    "scenes":[
      "main"
    ]
  },
  {
   "name": "splatjs:viewport.reset",
   "scenes": [
    "main"
   ]
  }
 ]
}

},{}]},{},[1]);
