/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://gamedevelopment.tutsplus.com/tutorials/finite-state-machines-theory-and-implementation--gamedev-11867
 */
var StackFSM = (function () {
    function StackFSM() {
        this.stack = [];
    }
    StackFSM.prototype.update = function () {
        var currentState = this.getCurrentState();
        var currentStateFunction = currentState.getFunc();
        if (currentStateFunction != null) {
            currentStateFunction();
        }
    };
    StackFSM.prototype.popState = function () {
        return this.stack.pop();
    };
    StackFSM.prototype.pushState = function (state) {
        if (this.getCurrentState() != state) {
            this.stack.push(state);
        }
    };
    StackFSM.prototype.getCurrentState = function () {
        return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
    };
    return StackFSM;
}());
exports.StackFSM = StackFSM;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var State = (function () {
    function State(name, func) {
        this.name = name;
        this.func = func;
    }
    State.prototype.getName = function () {
        return this.name;
    };
    State.prototype.getFunc = function () {
        return this.func;
    };
    return State;
}());
exports.State = State;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SeekBehavior_1 = __webpack_require__(25);
var WanderBehavior_1 = __webpack_require__(26);
var FleeBehavior_1 = __webpack_require__(21);
var PursuingBehavior_1 = __webpack_require__(24);
var EvadingBehavior_1 = __webpack_require__(20);
var PathFollowingBehavior_1 = __webpack_require__(22);
var PathPatrollingBehavior_1 = __webpack_require__(23);
var CollisionReactionBehavior_1 = __webpack_require__(19);
var CollisionAvoidanceBehavior_1 = __webpack_require__(18);
/**
 * Inspired by following posts
 *
 * @see https://gamedevelopment.tutsplus.com/tutorials/understanding-steering-behaviors-movement-manager--gamedev-4278
 * @see http://www.emanueleferonato.com/2016/02/01/understanding-steering-behavior-html5-example-using-phaser/
 */
var SteeringComputer = (function () {
    function SteeringComputer(host) {
        this.host = host;
        this.steering = new Phaser.Point(0, 0);
        this.seekBehavior = new SeekBehavior_1.SeekBehavior(host);
        this.wanderBehavior = new WanderBehavior_1.WanderBehavior(host);
        this.fleeBehavior = new FleeBehavior_1.FleeBehavior(host);
        this.pursuingBehavior = new PursuingBehavior_1.PursuingBehavior(host, this.seekBehavior);
        this.evadingBehavior = new EvadingBehavior_1.EvadingBehavior(host, this.fleeBehavior);
        this.pathFollowingBehavior = new PathFollowingBehavior_1.PathFollowingBehavior(host, this.seekBehavior);
        this.pathPatrollingBehavior = new PathPatrollingBehavior_1.PathPatrollingBehavior(host, this.seekBehavior);
        this.collisionReactionBehavior = new CollisionReactionBehavior_1.CollisionReactionBehavior(host);
        this.collisionAvoidanceBehavior = new CollisionAvoidanceBehavior_1.CollisionAvoidanceBehavior(host);
    }
    SteeringComputer.prototype.seek = function (target, slowingRadius) {
        if (slowingRadius === void 0) { slowingRadius = 20; }
        var force = this.seekBehavior.seek(target, slowingRadius);
        this.steering.add(force.x, force.y);
    };
    SteeringComputer.prototype.wander = function () {
        var force = this.wanderBehavior.wander();
        this.steering.add(force.x, force.y);
    };
    SteeringComputer.prototype.flee = function (target) {
        var force = this.fleeBehavior.flee(target);
        this.steering.add(force.x, force.y);
    };
    SteeringComputer.prototype.pursuing = function (target) {
        var force = this.pursuingBehavior.pursuing(target);
        this.steering.add(force.x, force.y);
    };
    SteeringComputer.prototype.evading = function (target) {
        var force = this.evadingBehavior.evading(target);
        this.steering.add(force.x, force.y);
    };
    SteeringComputer.prototype.pathFollowing = function (path, slowingRadius) {
        if (slowingRadius === void 0) { slowingRadius = 20; }
        var force = this.pathFollowingBehavior.followPath(path, slowingRadius);
        this.steering.add(force.x, force.y);
    };
    SteeringComputer.prototype.pathPatrolling = function (path, slowingRadius) {
        if (slowingRadius === void 0) { slowingRadius = 20; }
        var force = this.pathPatrollingBehavior.patrolPath(path, slowingRadius);
        this.steering.add(force.x, force.y);
    };
    SteeringComputer.prototype.reactToCollision = function (body) {
        var force = this.collisionReactionBehavior.reactToCollision(body);
        this.steering.add(force.x, force.y);
    };
    SteeringComputer.prototype.avoidCollision = function (body) {
        var force = this.collisionAvoidanceBehavior.avoidCollision();
        this.steering.add(force.x, force.y);
    };
    SteeringComputer.prototype.compute = function () {
        // Now we add boid direction to current boid velocity
        this.host.getVelocity().add(this.steering.x, this.steering.y);
        // we normalize the velocity
        this.host.getVelocity().normalize();
        // we set the magnitude to boid speed
        this.host.getVelocity().setMagnitude(this.host.getMaxVelocity().x);
        // TODO: fix the slow down for seek behavior but break velocity for the rest
        //this.host.getVelocity().setMagnitude(this.steering.getMagnitude());
    };
    SteeringComputer.prototype.reset = function () {
        this.steering = new Phaser.Point(0, 0);
    };
    return SteeringComputer;
}());
exports.SteeringComputer = SteeringComputer;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Bot = (function (_super) {
    __extends(Bot, _super);
    function Bot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bot.prototype.update = function () {
        this.brain.update();
        this.behavior.compute();
        this.updateAngle();
        this.brainText.update();
    };
    Bot.prototype.updateAngle = function () {
        this.angle = 180 + Phaser.Math.radToDeg(Phaser.Point.angle(this.getPosition(), new Phaser.Point(this.getPosition().x + this.getVelocity().x, this.getPosition().y + this.getVelocity().y)));
    };
    Bot.prototype.getVelocity = function () {
        return this.body.velocity;
    };
    Bot.prototype.getMaxVelocity = function () {
        return this.body.maxVelocity;
    };
    Bot.prototype.getPosition = function () {
        return this.body.position;
    };
    Bot.prototype.getMass = function () {
        return this.body.mass;
    };
    return Bot;
}(Phaser.Sprite));
exports.Bot = Bot;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BrainText = (function (_super) {
    __extends(BrainText, _super);
    function BrainText(game, x, y, text, style, bot, brain) {
        var _this = _super.call(this, game, x, y, text, style) || this;
        _this.stateColors = {
            'wander': '#93d9f4',
            'path following': '#00cd00',
            'patrolling': '#ee8400',
            'pursuing': '#2c23e2',
            'evading': '#ff4040'
        };
        _this.bot = bot;
        _this.brain = brain;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        game.add.existing(_this);
        return _this;
    }
    BrainText.prototype.update = function () {
        this.setText(this.brain.getCurrentState().getName());
        var color = this.stateColors[this.brain.getCurrentState().getName()];
        if (color == undefined) {
            color = '#FFFFFF';
        }
        var style = { font: "13px Arial", fill: color, boundsAlignH: "center", boundsAlignV: "top" };
        this.setStyle(style);
        this.game.physics.arcade.moveToXY(this, this.bot.body.x, this.bot.body.y - 20, this.bot.body.speed);
    };
    return BrainText;
}(Phaser.Text));
exports.BrainText = BrainText;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Building = (function (_super) {
    __extends(Building, _super);
    function Building() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Building.prototype.getPosition = function () {
        return this.body.position;
    };
    return Building;
}(Phaser.Sprite));
exports.Building = Building;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PhaserPointPath = (function () {
    function PhaserPointPath(nodes) {
        if (nodes === void 0) { nodes = []; }
        this.nodes = nodes;
    }
    PhaserPointPath.prototype.getNodes = function () {
        return this.nodes;
    };
    PhaserPointPath.prototype.lastNode = function () {
        return this.nodes.length > 0 ? this.nodes[this.nodes.length - 1] : null;
    };
    return PhaserPointPath;
}());
exports.PhaserPointPath = PhaserPointPath;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Position in the tilemap
 */
var TilePosition = (function () {
    function TilePosition(x, y) {
        this.x = x;
        this.y = y;
    }
    TilePosition.prototype.getX = function () {
        return this.x;
    };
    TilePosition.prototype.getY = function () {
        return this.y;
    };
    return TilePosition;
}());
exports.TilePosition = TilePosition;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Boot_1 = __webpack_require__(31);
var Preload_1 = __webpack_require__(34);
var Menu_1 = __webpack_require__(32);
var Play_1 = __webpack_require__(33);
var SimpleGame = (function (_super) {
    __extends(SimpleGame, _super);
    function SimpleGame() {
        var _this = _super.call(this, 1000, 500, Phaser.CANVAS, "content", null) || this;
        _this.state.add('Boot', Boot_1.default);
        _this.state.add('Preload', Preload_1.default);
        _this.state.add('Menu', Menu_1.default);
        _this.state.add('Play', Play_1.default);
        _this.state.start('Boot');
        return _this;
    }
    return SimpleGame;
}(Phaser.Game));
window.onload = function () {
    new SimpleGame();
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
*   EasyStar.js
*   github.com/prettymuchbryce/EasyStarJS
*   Licensed under the MIT license.
*
*   Implementation By Bryce Neal (@prettymuchbryce)
**/

var EasyStar = {}
var Instance = __webpack_require__(10);
var Node = __webpack_require__(11);
var Heap = __webpack_require__(12);

const CLOSED_LIST = 0;
const OPEN_LIST = 1;

module.exports = EasyStar;

var nextInstanceId = 1;

EasyStar.js = function() {
    var STRAIGHT_COST = 1.0;
    var DIAGONAL_COST = 1.4;
    var syncEnabled = false;
    var pointsToAvoid = {};
    var collisionGrid;
    var costMap = {};
    var pointsToCost = {};
    var directionalConditions = {};
    var allowCornerCutting = true;
    var iterationsSoFar;
    var instances = {};
    var instanceQueue = [];
    var iterationsPerCalculation = Number.MAX_VALUE;
    var acceptableTiles;
    var diagonalsEnabled = false;

    /**
    * Sets the collision grid that EasyStar uses.
    *
    * @param {Array|Number} tiles An array of numbers that represent
    * which tiles in your grid should be considered
    * acceptable, or "walkable".
    **/
    this.setAcceptableTiles = function(tiles) {
        if (tiles instanceof Array) {
            // Array
            acceptableTiles = tiles;
        } else if (!isNaN(parseFloat(tiles)) && isFinite(tiles)) {
            // Number
            acceptableTiles = [tiles];
        }
    };

    /**
    * Enables sync mode for this EasyStar instance..
    * if you're into that sort of thing.
    **/
    this.enableSync = function() {
        syncEnabled = true;
    };

    /**
    * Disables sync mode for this EasyStar instance.
    **/
    this.disableSync = function() {
        syncEnabled = false;
    };

    /**
     * Enable diagonal pathfinding.
     */
    this.enableDiagonals = function() {
        diagonalsEnabled = true;
    }

    /**
     * Disable diagonal pathfinding.
     */
    this.disableDiagonals = function() {
        diagonalsEnabled = false;
    }

    /**
    * Sets the collision grid that EasyStar uses.
    *
    * @param {Array} grid The collision grid that this EasyStar instance will read from.
    * This should be a 2D Array of Numbers.
    **/
    this.setGrid = function(grid) {
        collisionGrid = grid;

        //Setup cost map
        for (var y = 0; y < collisionGrid.length; y++) {
            for (var x = 0; x < collisionGrid[0].length; x++) {
                if (!costMap[collisionGrid[y][x]]) {
                    costMap[collisionGrid[y][x]] = 1
                }
            }
        }
    };

    /**
    * Sets the tile cost for a particular tile type.
    *
    * @param {Number} The tile type to set the cost for.
    * @param {Number} The multiplicative cost associated with the given tile.
    **/
    this.setTileCost = function(tileType, cost) {
        costMap[tileType] = cost;
    };

    /**
    * Sets the an additional cost for a particular point.
    * Overrides the cost from setTileCost.
    *
    * @param {Number} x The x value of the point to cost.
    * @param {Number} y The y value of the point to cost.
    * @param {Number} The multiplicative cost associated with the given point.
    **/
    this.setAdditionalPointCost = function(x, y, cost) {
        if (pointsToCost[y] === undefined) {
            pointsToCost[y] = {};
        }
        pointsToCost[y][x] = cost;
    };

    /**
    * Remove the additional cost for a particular point.
    *
    * @param {Number} x The x value of the point to stop costing.
    * @param {Number} y The y value of the point to stop costing.
    **/
    this.removeAdditionalPointCost = function(x, y) {
        if (pointsToCost[y] !== undefined) {
            delete pointsToCost[y][x];
        }
    }

    /**
    * Remove all additional point costs.
    **/
    this.removeAllAdditionalPointCosts = function() {
        pointsToCost = {};
    }

    /**
    * Sets a directional condition on a tile
    *
    * @param {Number} x The x value of the point.
    * @param {Number} y The y value of the point.
    * @param {Array.<String>} allowedDirections A list of all the allowed directions that can access
    * the tile.
    **/
    this.setDirectionalCondition = function(x, y, allowedDirections) {
        if (directionalConditions[y] === undefined) {
            directionalConditions[y] = {};
        }
        directionalConditions[y][x] = allowedDirections;
    };

    /**
    * Remove all directional conditions
    **/
    this.removeAllDirectionalConditions = function() {
        directionalConditions = {};
    };

    /**
    * Sets the number of search iterations per calculation.
    * A lower number provides a slower result, but more practical if you
    * have a large tile-map and don't want to block your thread while
    * finding a path.
    *
    * @param {Number} iterations The number of searches to prefrom per calculate() call.
    **/
    this.setIterationsPerCalculation = function(iterations) {
        iterationsPerCalculation = iterations;
    };

    /**
    * Avoid a particular point on the grid,
    * regardless of whether or not it is an acceptable tile.
    *
    * @param {Number} x The x value of the point to avoid.
    * @param {Number} y The y value of the point to avoid.
    **/
    this.avoidAdditionalPoint = function(x, y) {
        if (pointsToAvoid[y] === undefined) {
            pointsToAvoid[y] = {};
        }
        pointsToAvoid[y][x] = 1;
    };

    /**
    * Stop avoiding a particular point on the grid.
    *
    * @param {Number} x The x value of the point to stop avoiding.
    * @param {Number} y The y value of the point to stop avoiding.
    **/
    this.stopAvoidingAdditionalPoint = function(x, y) {
        if (pointsToAvoid[y] !== undefined) {
            delete pointsToAvoid[y][x];
        }
    };

    /**
    * Enables corner cutting in diagonal movement.
    **/
    this.enableCornerCutting = function() {
        allowCornerCutting = true;
    };

    /**
    * Disables corner cutting in diagonal movement.
    **/
    this.disableCornerCutting = function() {
        allowCornerCutting = false;
    };

    /**
    * Stop avoiding all additional points on the grid.
    **/
    this.stopAvoidingAllAdditionalPoints = function() {
        pointsToAvoid = {};
    };

    /**
    * Find a path.
    *
    * @param {Number} startX The X position of the starting point.
    * @param {Number} startY The Y position of the starting point.
    * @param {Number} endX The X position of the ending point.
    * @param {Number} endY The Y position of the ending point.
    * @param {Function} callback A function that is called when your path
    * is found, or no path is found.
    * @return {Number} A numeric, non-zero value which identifies the created instance. This value can be passed to cancelPath to cancel the path calculation.
    *
    **/
    this.findPath = function(startX, startY, endX, endY, callback) {
        // Wraps the callback for sync vs async logic
        var callbackWrapper = function(result) {
            if (syncEnabled) {
                callback(result);
            } else {
                setTimeout(function() {
                    callback(result);
                });
            }
        }

        // No acceptable tiles were set
        if (acceptableTiles === undefined) {
            throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");
        }
        // No grid was set
        if (collisionGrid === undefined) {
            throw new Error("You can't set a path without first calling setGrid() on EasyStar.");
        }

        // Start or endpoint outside of scope.
        if (startX < 0 || startY < 0 || endX < 0 || endY < 0 ||
        startX > collisionGrid[0].length-1 || startY > collisionGrid.length-1 ||
        endX > collisionGrid[0].length-1 || endY > collisionGrid.length-1) {
            throw new Error("Your start or end point is outside the scope of your grid.");
        }

        // Start and end are the same tile.
        if (startX===endX && startY===endY) {
            callbackWrapper([]);
            return;
        }

        // End point is not an acceptable tile.
        var endTile = collisionGrid[endY][endX];
        var isAcceptable = false;
        for (var i = 0; i < acceptableTiles.length; i++) {
            if (endTile === acceptableTiles[i]) {
                isAcceptable = true;
                break;
            }
        }

        if (isAcceptable === false) {
            callbackWrapper(null);
            return;
        }

        // Create the instance
        var instance = new Instance();
        instance.openList = new Heap(function(nodeA, nodeB) {
            return nodeA.bestGuessDistance() - nodeB.bestGuessDistance();
        });
        instance.isDoneCalculating = false;
        instance.nodeHash = {};
        instance.startX = startX;
        instance.startY = startY;
        instance.endX = endX;
        instance.endY = endY;
        instance.callback = callbackWrapper;

        instance.openList.push(coordinateToNode(instance, instance.startX,
            instance.startY, null, STRAIGHT_COST));

        var instanceId = nextInstanceId ++;
        instances[instanceId] = instance;
        instanceQueue.push(instanceId);
        return instanceId;
    };

    /**
     * Cancel a path calculation.
     *
     * @param {Number} instanceId The instance ID of the path being calculated
     * @return {Boolean} True if an instance was found and cancelled.
     *
     **/
    this.cancelPath = function(instanceId) {
        if (instanceId in instances) {
            delete instances[instanceId];
            // No need to remove it from instanceQueue
            return true;
        }
        return false;
    };

    /**
    * This method steps through the A* Algorithm in an attempt to
    * find your path(s). It will search 4-8 tiles (depending on diagonals) for every calculation.
    * You can change the number of calculations done in a call by using
    * easystar.setIteratonsPerCalculation().
    **/
    this.calculate = function() {
        if (instanceQueue.length === 0 || collisionGrid === undefined || acceptableTiles === undefined) {
            return;
        }
        for (iterationsSoFar = 0; iterationsSoFar < iterationsPerCalculation; iterationsSoFar++) {
            if (instanceQueue.length === 0) {
                return;
            }

            if (syncEnabled) {
                // If this is a sync instance, we want to make sure that it calculates synchronously.
                iterationsSoFar = 0;
            }

            var instanceId = instanceQueue[0];
            var instance = instances[instanceId];
            if (typeof instance == 'undefined') {
                // This instance was cancelled
                instanceQueue.shift();
                continue;
            }

            // Couldn't find a path.
            if (instance.openList.size() === 0) {
                instance.callback(null);
                delete instances[instanceId];
                instanceQueue.shift();
                continue;
            }

            var searchNode = instance.openList.pop();

            // Handles the case where we have found the destination
            if (instance.endX === searchNode.x && instance.endY === searchNode.y) {
                var path = [];
                path.push({x: searchNode.x, y: searchNode.y});
                var parent = searchNode.parent;
                while (parent!=null) {
                    path.push({x: parent.x, y:parent.y});
                    parent = parent.parent;
                }
                path.reverse();
                var ip = path;
                instance.callback(ip);
                delete instances[instanceId];
                instanceQueue.shift();
                continue;
            }

            searchNode.list = CLOSED_LIST;

            if (searchNode.y > 0) {
                checkAdjacentNode(instance, searchNode,
                    0, -1, STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y-1));
            }
            if (searchNode.x < collisionGrid[0].length-1) {
                checkAdjacentNode(instance, searchNode,
                    1, 0, STRAIGHT_COST * getTileCost(searchNode.x+1, searchNode.y));
            }
            if (searchNode.y < collisionGrid.length-1) {
                checkAdjacentNode(instance, searchNode,
                    0, 1, STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y+1));
            }
            if (searchNode.x > 0) {
                checkAdjacentNode(instance, searchNode,
                    -1, 0, STRAIGHT_COST * getTileCost(searchNode.x-1, searchNode.y));
            }
            if (diagonalsEnabled) {
                if (searchNode.x > 0 && searchNode.y > 0) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y-1) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x-1, searchNode.y))) {

                        checkAdjacentNode(instance, searchNode,
                            -1, -1, DIAGONAL_COST * getTileCost(searchNode.x-1, searchNode.y-1));
                    }
                }
                if (searchNode.x < collisionGrid[0].length-1 && searchNode.y < collisionGrid.length-1) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y+1) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x+1, searchNode.y))) {

                        checkAdjacentNode(instance, searchNode,
                            1, 1, DIAGONAL_COST * getTileCost(searchNode.x+1, searchNode.y+1));
                    }
                }
                if (searchNode.x < collisionGrid[0].length-1 && searchNode.y > 0) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y-1) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x+1, searchNode.y))) {

                        checkAdjacentNode(instance, searchNode,
                            1, -1, DIAGONAL_COST * getTileCost(searchNode.x+1, searchNode.y-1));
                    }
                }
                if (searchNode.x > 0 && searchNode.y < collisionGrid.length-1) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y+1) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x-1, searchNode.y))) {

                        checkAdjacentNode(instance, searchNode,
                            -1, 1, DIAGONAL_COST * getTileCost(searchNode.x-1, searchNode.y+1));
                    }
                }
            }

        }
    };

    // Private methods follow
    var checkAdjacentNode = function(instance, searchNode, x, y, cost) {
        var adjacentCoordinateX = searchNode.x+x;
        var adjacentCoordinateY = searchNode.y+y;

        if ((pointsToAvoid[adjacentCoordinateY] === undefined ||
             pointsToAvoid[adjacentCoordinateY][adjacentCoordinateX] === undefined) &&
            isTileWalkable(collisionGrid, acceptableTiles, adjacentCoordinateX, adjacentCoordinateY, searchNode)) {
            var node = coordinateToNode(instance, adjacentCoordinateX,
                adjacentCoordinateY, searchNode, cost);

            if (node.list === undefined) {
                node.list = OPEN_LIST;
                instance.openList.push(node);
            } else if (searchNode.costSoFar + cost < node.costSoFar) {
                node.costSoFar = searchNode.costSoFar + cost;
                node.parent = searchNode;
                instance.openList.updateItem(node);
            }
        }
    };

    // Helpers
    var isTileWalkable = function(collisionGrid, acceptableTiles, x, y, sourceNode) {
        var directionalCondition = directionalConditions[y] && directionalConditions[y][x];
        if (directionalCondition) {
            var direction = calculateDirection(sourceNode.x - x, sourceNode.y - y)
            var directionIncluded = function () {
                for (var i = 0; i < directionalCondition.length; i++) {
                    if (directionalCondition[i] === direction) return true
                }
                return false
            }
            if (!directionIncluded()) return false
        }
        for (var i = 0; i < acceptableTiles.length; i++) {
            if (collisionGrid[y][x] === acceptableTiles[i]) {
                return true;
            }
        }

        return false;
    };

    /**
     * -1, -1 | 0, -1  | 1, -1
     * -1,  0 | SOURCE | 1,  0
     * -1,  1 | 0,  1  | 1,  1
     */
    var calculateDirection = function (diffX, diffY) {
        if (diffX === 0 && diffY === -1) return EasyStar.TOP
        else if (diffX === 1 && diffY === -1) return EasyStar.TOP_RIGHT
        else if (diffX === 1 && diffY === 0) return EasyStar.RIGHT
        else if (diffX === 1 && diffY === 1) return EasyStar.BOTTOM_RIGHT
        else if (diffX === 0 && diffY === 1) return EasyStar.BOTTOM
        else if (diffX === -1 && diffY === 1) return EasyStar.BOTTOM_LEFT
        else if (diffX === -1 && diffY === 0) return EasyStar.LEFT
        else if (diffX === -1 && diffY === -1) return EasyStar.TOP_LEFT
        throw new Error('These differences are not valid: ' + diffX + ', ' + diffY)
    };

    var getTileCost = function(x, y) {
        return (pointsToCost[y] && pointsToCost[y][x]) || costMap[collisionGrid[y][x]]
    };

    var coordinateToNode = function(instance, x, y, parent, cost) {
        if (instance.nodeHash[y] !== undefined) {
            if (instance.nodeHash[y][x] !== undefined) {
                return instance.nodeHash[y][x];
            }
        } else {
            instance.nodeHash[y] = {};
        }
        var simpleDistanceToTarget = getDistance(x, y, instance.endX, instance.endY);
        if (parent!==null) {
            var costSoFar = parent.costSoFar + cost;
        } else {
            costSoFar = 0;
        }
        var node = new Node(parent,x,y,costSoFar,simpleDistanceToTarget);
        instance.nodeHash[y][x] = node;
        return node;
    };

    var getDistance = function(x1,y1,x2,y2) {
        if (diagonalsEnabled) {
            // Octile distance
            var dx = Math.abs(x1 - x2);
            var dy = Math.abs(y1 - y2);
            if (dx < dy) {
                return DIAGONAL_COST * dx + dy;
            } else {
                return DIAGONAL_COST * dy + dx;
            }
        } else {
            // Manhattan distance
            var dx = Math.abs(x1 - x2);
            var dy = Math.abs(y1 - y2);
            return (dx + dy);
        }
    };
}

EasyStar.TOP = 'TOP'
EasyStar.TOP_RIGHT = 'TOP_RIGHT'
EasyStar.RIGHT = 'RIGHT'
EasyStar.BOTTOM_RIGHT = 'BOTTOM_RIGHT'
EasyStar.BOTTOM = 'BOTTOM'
EasyStar.BOTTOM_LEFT = 'BOTTOM_LEFT'
EasyStar.LEFT = 'LEFT'
EasyStar.TOP_LEFT = 'TOP_LEFT'


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Represents a single instance of EasyStar.
 * A path that is in the queue to eventually be found.
 */
module.exports = function() {
    this.pointsToAvoid = {};
    this.startX;
    this.callback;
    this.startY;
    this.endX;
    this.endY;
    this.nodeHash = {};
    this.openList;
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
* A simple Node that represents a single tile on the grid.
* @param {Object} parent The parent node.
* @param {Number} x The x position on the grid.
* @param {Number} y The y position on the grid.
* @param {Number} costSoFar How far this node is in moves*cost from the start.
* @param {Number} simpleDistanceToTarget Manhatten distance to the end point.
**/
module.exports = function(parent, x, y, costSoFar, simpleDistanceToTarget) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.costSoFar = costSoFar;
    this.simpleDistanceToTarget = simpleDistanceToTarget;

    /**
    * @return {Number} Best guess distance of a cost using this node.
    **/
    this.bestGuessDistance = function() {
        return this.costSoFar + this.simpleDistanceToTarget;
    }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.8.0
(function() {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;


  /*
  Default comparison function to be used
   */

  defaultCmp = function(x, y) {
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };


  /*
  Insert item x in list a, and keep it sorted assuming a is sorted.
  
  If x is already in a, insert it to the right of the rightmost x.
  
  Optional args lo (default 0) and hi (default a.length) bound the slice
  of a to be searched.
   */

  insort = function(a, x, lo, hi, cmp) {
    var mid;
    if (lo == null) {
      lo = 0;
    }
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (lo < 0) {
      throw new Error('lo must be non-negative');
    }
    if (hi == null) {
      hi = a.length;
    }
    while (lo < hi) {
      mid = floor((lo + hi) / 2);
      if (cmp(x, a[mid]) < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
  };


  /*
  Push item onto heap, maintaining the heap invariant.
   */

  heappush = function(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }
    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };


  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */

  heappop = function(array, cmp) {
    var lastelt, returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    lastelt = array.pop();
    if (array.length) {
      returnitem = array[0];
      array[0] = lastelt;
      _siftup(array, 0, cmp);
    } else {
      returnitem = lastelt;
    }
    return returnitem;
  };


  /*
  Pop and return the current smallest value, and add the new item.
  
  This is more efficient than heappop() followed by heappush(), and can be
  more appropriate when using a fixed size heap. Note that the value
  returned may be larger than item! That constrains reasonable use of
  this routine unless written as part of a conditional replacement:
      if item > array[0]
        item = heapreplace(array, item)
   */

  heapreplace = function(array, item, cmp) {
    var returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    returnitem = array[0];
    array[0] = item;
    _siftup(array, 0, cmp);
    return returnitem;
  };


  /*
  Fast version of a heappush followed by a heappop.
   */

  heappushpop = function(array, item, cmp) {
    var _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (array.length && cmp(array[0], item) < 0) {
      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
      _siftup(array, 0, cmp);
    }
    return item;
  };


  /*
  Transform list into a heap, in-place, in O(array.length) time.
   */

  heapify = function(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    _ref1 = (function() {
      _results1 = [];
      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).reverse();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      i = _ref1[_i];
      _results.push(_siftup(array, i, cmp));
    }
    return _results;
  };


  /*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */

  updateItem = function(array, item, cmp) {
    var pos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    pos = array.indexOf(item);
    if (pos === -1) {
      return;
    }
    _siftdown(array, 0, pos, cmp);
    return _siftup(array, pos, cmp);
  };


  /*
  Find the n largest elements in a dataset.
   */

  nlargest = function(array, n, cmp) {
    var elem, result, _i, _len, _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    result = array.slice(0, n);
    if (!result.length) {
      return result;
    }
    heapify(result, cmp);
    _ref = array.slice(n);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      heappushpop(result, elem, cmp);
    }
    return result.sort(cmp).reverse();
  };


  /*
  Find the n smallest elements in a dataset.
   */

  nsmallest = function(array, n, cmp) {
    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (n * 10 <= array.length) {
      result = array.slice(0, n).sort(cmp);
      if (!result.length) {
        return result;
      }
      los = result[result.length - 1];
      _ref = array.slice(n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        if (cmp(elem, los) < 0) {
          insort(result, elem, 0, null, cmp);
          result.pop();
          los = result[result.length - 1];
        }
      }
      return result;
    }
    heapify(array, cmp);
    _results = [];
    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      _results.push(heappop(array, cmp));
    }
    return _results;
  };

  _siftdown = function(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    newitem = array[pos];
    while (pos > startpos) {
      parentpos = (pos - 1) >> 1;
      parent = array[parentpos];
      if (cmp(newitem, parent) < 0) {
        array[pos] = parent;
        pos = parentpos;
        continue;
      }
      break;
    }
    return array[pos] = newitem;
  };

  _siftup = function(array, pos, cmp) {
    var childpos, endpos, newitem, rightpos, startpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    endpos = array.length;
    startpos = pos;
    newitem = array[pos];
    childpos = 2 * pos + 1;
    while (childpos < endpos) {
      rightpos = childpos + 1;
      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
        childpos = rightpos;
      }
      array[pos] = array[childpos];
      pos = childpos;
      childpos = 2 * pos + 1;
    }
    array[pos] = newitem;
    return _siftdown(array, startpos, pos, cmp);
  };

  Heap = (function() {
    Heap.push = heappush;

    Heap.pop = heappop;

    Heap.replace = heapreplace;

    Heap.pushpop = heappushpop;

    Heap.heapify = heapify;

    Heap.updateItem = updateItem;

    Heap.nlargest = nlargest;

    Heap.nsmallest = nsmallest;

    function Heap(cmp) {
      this.cmp = cmp != null ? cmp : defaultCmp;
      this.nodes = [];
    }

    Heap.prototype.push = function(x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function() {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function() {
      return this.nodes[0];
    };

    Heap.prototype.contains = function(x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function(x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function(x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function() {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function(x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function() {
      return this.nodes = [];
    };

    Heap.prototype.empty = function() {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function() {
      return this.nodes.length;
    };

    Heap.prototype.clone = function() {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function() {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;

    Heap.prototype.top = Heap.prototype.peek;

    Heap.prototype.front = Heap.prototype.peek;

    Heap.prototype.has = Heap.prototype.contains;

    Heap.prototype.copy = Heap.prototype.clone;

    return Heap;

  })();

  (function(root, factory) {
    if (true) {
      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
      return module.exports = factory();
    } else {
      return root.Heap = factory();
    }
  })(this, function() {
    return Heap;
  });

}).call(this);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MapAnalyse = (function () {
    function MapAnalyse(indexes, tileSize, walkableIndexes, unwalkableIndexes) {
        this.tiles = indexes;
        this.tileSize = tileSize;
        this.walkableIndexes = walkableIndexes;
        this.unwalkableIndexes = unwalkableIndexes;
    }
    MapAnalyse.prototype.getTiles = function () {
        return this.tiles;
    };
    MapAnalyse.prototype.getTileSize = function () {
        return this.tileSize;
    };
    MapAnalyse.prototype.getWalkableIndexes = function () {
        return this.walkableIndexes;
    };
    MapAnalyse.prototype.getUnwalkableIndexes = function () {
        return this.unwalkableIndexes;
    };
    return MapAnalyse;
}());
exports.MapAnalyse = MapAnalyse;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MapAnalyse_1 = __webpack_require__(14);
var MapAnalyser = (function () {
    function MapAnalyser(tiles, tileSize) {
        this.tiles = tiles;
        this.tileSize = tileSize;
    }
    MapAnalyser.prototype.analyse = function () {
        var unwalkable = [
            1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 14, 15,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 42, 44, 45,
            // 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70
            // 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 90, 91, 92, 93, 94, 95, 96,
            // 97, 98, 99, 100, 101, 102, 103,
            104, 105, 106, 107, 108, 109, 110, 111,
            112, 113, 114, 116, 118, 120, 121, 122, 125, 126, 129, 130,
            147, 148, 149, 150, 152, 153, 154, 155, 157, 158, 160, 161,
        ];
        var maxIndex = 200;
        var walkable = [];
        for (var index = 1; index < maxIndex; index++) {
            walkable.push(index);
        }
        walkable = walkable.filter(function (x) { return unwalkable.indexOf(x) == -1; });
        return new MapAnalyse_1.MapAnalyse(this.tiles, this.tileSize, walkable, unwalkable);
    };
    return MapAnalyser;
}());
exports.MapAnalyser = MapAnalyser;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TilePositionPath_1 = __webpack_require__(17);
// TODO: how to fix or not fix the following?
var EasyStar = __webpack_require__(9);
var TilePosition_1 = __webpack_require__(7);
var PhaserPointPath_1 = __webpack_require__(6);
var PathFinder = (function () {
    function PathFinder(mapAnalyse) {
        this.mapAnalyse = mapAnalyse;
        var tiles = mapAnalyse.getTiles();
        var acceptableTiles = mapAnalyse.getWalkableIndexes();
        // cf https://github.com/prettymuchbryce/easystarjs
        this.easystar = new EasyStar.js();
        var grid = [];
        for (var i = 0; i < tiles.length; i++) {
            grid[i] = [];
            for (var j = 0; j < tiles[i].length; j++) {
                grid[i][j] = tiles[i][j].index;
            }
        }
        this.easystar.setGrid(grid);
        this.easystar.setAcceptableTiles(acceptableTiles);
        this.easystar.enableSync();
        this.easystar.enableDiagonals();
    }
    PathFinder.prototype.findTilePositionPath = function (start, end) {
        var foundPath = null;
        var pathCallback = function (path) {
            if (path === null) {
                console.log("path not found");
            }
            else {
                foundPath = new TilePositionPath_1.TilePositionPath(path);
            }
        };
        this.easystar.findPath(start.getX(), start.getY(), end.getX(), end.getY(), pathCallback);
        this.easystar.calculate();
        return foundPath;
    };
    PathFinder.prototype.findPhaserPointPath = function (start, end) {
        var foundPath = this.findTilePositionPath(this.convertToTilePosition(start), this.convertToTilePosition(end));
        if (foundPath) {
            var points = new Array();
            var nodes = foundPath.getNodes();
            for (var index = 0; index < nodes.length; index++) {
                var point = this.convertToPhaserPoint(nodes[index]);
                points.push(point);
            }
            return new PhaserPointPath_1.PhaserPointPath(points);
        }
        return null;
    };
    PathFinder.prototype.convertToTilePosition = function (point) {
        return new TilePosition_1.TilePosition(Math.ceil(point.x / this.mapAnalyse.getTileSize()) - 1, Math.ceil(point.y / this.mapAnalyse.getTileSize()) - 1);
    };
    PathFinder.prototype.convertToPhaserPoint = function (position) {
        // round to the center of the tile
        return new Phaser.Point(position.getX() * this.mapAnalyse.getTileSize() + this.mapAnalyse.getTileSize() / 2, position.getY() * this.mapAnalyse.getTileSize() + this.mapAnalyse.getTileSize() / 2);
    };
    return PathFinder;
}());
exports.PathFinder = PathFinder;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TilePosition_1 = __webpack_require__(7);
/**
 * Path of TilePosition
 */
var TilePositionPath = (function () {
    function TilePositionPath(rawPositions) {
        this.nodes = [];
        for (var i = 0; i < rawPositions.length; i++) {
            this.nodes[i] = new TilePosition_1.TilePosition(rawPositions[i].x, rawPositions[i].y);
        }
    }
    TilePositionPath.prototype.shift = function () {
        if (this.nodes.length > 0) {
            return this.nodes.shift();
        }
        return null;
    };
    TilePositionPath.prototype.length = function () {
        return this.nodes.length;
    };
    TilePositionPath.prototype.getNodes = function () {
        return this.nodes;
    };
    return TilePositionPath;
}());
exports.TilePositionPath = TilePositionPath;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://gamedevelopment.tutsplus.com/tutorials/understanding-steering-behaviors-collision-avoidance--gamedev-7777
 */
var CollisionAvoidanceBehavior = (function () {
    function CollisionAvoidanceBehavior(host) {
        this.host = host;
    }
    CollisionAvoidanceBehavior.prototype.avoidCollision = function () {
        var maxSeeAhead = 100;
        var maxAvoidForce = 100;
        var ahead = this.host.getPosition().clone();
        var velocity = this.host.getVelocity().clone().normalize();
        ahead.add(velocity.x, velocity.y);
        ahead.add(maxSeeAhead, maxSeeAhead); // TODO: multiply maxSeeAhead
        var ahead2 = ahead.clone();
        ahead2.subtract(maxSeeAhead / 2, maxSeeAhead / 2); // TODO: multiply maxSeeAhead multiply 0.5
        var avoidance = new Phaser.Point(0, 0);
        var mostThreatening = this.findMostThreateningObstacle();
        if (mostThreatening != null) {
            avoidance.x = ahead.x - mostThreatening.center.x;
            avoidance.y = ahead.y - mostThreatening.center.y;
            avoidance.normalize();
            avoidance.add(maxAvoidForce, maxAvoidForce); // TODO: scale by
            return avoidance;
        }
        return avoidance;
    };
    CollisionAvoidanceBehavior.prototype.findMostThreateningObstacle = function () {
        var mostThreatening = null;
        /*
        for (var i:int = 0; i < Game.instance.obstacles.length; i++) {
            var obstacle :Obstacle = Game.instance.obstacles[i];
            var collision :Boolean = lineIntersecsCircle(ahead, ahead2, obstacle);

            // "position" is the character's current position
            if (collision && (mostThreatening == null || distance(position, obstacle) < distance(position, mostThreatening))) {
                mostThreatening = obstacle;
            }
        }*/
        return mostThreatening;
    };
    return CollisionAvoidanceBehavior;
}());
exports.CollisionAvoidanceBehavior = CollisionAvoidanceBehavior;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CollisionReactionBehavior = (function () {
    function CollisionReactionBehavior(host) {
        this.host = host;
    }
    CollisionReactionBehavior.prototype.reactToCollision = function (body) {
        var avoidForce = new Phaser.Point(0, 0);
        var force = 20;
        if (body.blocked.up) {
            avoidForce.add(0, force);
        }
        if (body.blocked.down) {
            avoidForce.add(0, -force);
        }
        if (body.blocked.left) {
            avoidForce.add(force, 0);
        }
        if (body.blocked.right) {
            avoidForce.add(-force, 0);
        }
        return avoidForce;
    };
    return CollisionReactionBehavior;
}());
exports.CollisionReactionBehavior = CollisionReactionBehavior;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://gamedevelopment.tutsplus.com/tutorials/understanding-steering-behaviors-pursuit-and-evade--gamedev-2946
 */
var EvadingBehavior = (function () {
    function EvadingBehavior(host, fleeBehavior) {
        this.host = host;
        this.fleeBehavior = fleeBehavior;
    }
    EvadingBehavior.prototype.evading = function (target) {
        var distance = this.host.getPosition().distance(target.getPosition());
        var updatesAhead = distance / target.getMaxVelocity().x;
        var futurePosition = target.getPosition().clone();
        futurePosition.add(target.getVelocity().x * updatesAhead, target.getVelocity().y * updatesAhead);
        return this.fleeBehavior.flee(futurePosition);
    };
    return EvadingBehavior;
}());
exports.EvadingBehavior = EvadingBehavior;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FleeBehavior = (function () {
    function FleeBehavior(host) {
        this.host = host;
    }
    /**
     * Almost like the SeekBehavior excepts that the vector goes from the target to the boid (to flee away!)
     * @param target
     * @returns {Phaser.Point}
     */
    FleeBehavior.prototype.flee = function (target) {
        // direction vector is the straight direction from the target to the boid
        var force = new Phaser.Point(this.host.getPosition().x, this.host.getPosition().y);
        // now we subtract the target position
        force.subtract(target.x, target.y);
        // then we normalize it. A normalized vector has its length is 1, but it retains the same direction
        force.normalize();
        // time to set magnitude (length) to boid speed
        force.setMagnitude(this.host.getMaxVelocity().x);
        // now we subtract the current boid velocity
        force.subtract(this.host.getVelocity().x, this.host.getVelocity().y);
        // normalizing again
        force.normalize();
        return force;
    };
    return FleeBehavior;
}());
exports.FleeBehavior = FleeBehavior;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://gamedevelopment.tutsplus.com/tutorials/understanding-steering-behaviors-path-following--gamedev-8769
 */
var PathFollowingBehavior = (function () {
    function PathFollowingBehavior(host, seekBehavior) {
        this.host = host;
        this.seekBehavior = seekBehavior;
    }
    PathFollowingBehavior.prototype.followPath = function (path, slowingRadius) {
        if (slowingRadius === void 0) { slowingRadius = 0; }
        this.resetIfPathHasChanged(path);
        var target = null;
        if (path != null && path.getNodes().length > 0) {
            var nodes = path.getNodes();
            if (this.currentNodeIndex == null) {
                this.currentNodeIndex = 0;
            }
            target = nodes[this.currentNodeIndex];
            var distance = this.host.getPosition().distance(target);
            if (distance <= 20) {
                this.currentNodeIndex += 1;
                if (this.currentNodeIndex >= nodes.length) {
                    this.currentNodeIndex = nodes.length - 1;
                }
            }
        }
        return target != null ? this.seekBehavior.seek(target, slowingRadius) : new Phaser.Point(0, 0);
    };
    PathFollowingBehavior.prototype.resetIfPathHasChanged = function (path) {
        if (this.currentPath != path) {
            this.currentPath = path;
            this.currentNodeIndex = 0;
        }
    };
    return PathFollowingBehavior;
}());
exports.PathFollowingBehavior = PathFollowingBehavior;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://gamedevelopment.tutsplus.com/tutorials/understanding-steering-behaviors-path-following--gamedev-8769
 */
var PathPatrollingBehavior = (function () {
    function PathPatrollingBehavior(host, seekBehavior) {
        this.host = host;
        this.seekBehavior = seekBehavior;
        this.pathDirection = 1;
    }
    PathPatrollingBehavior.prototype.patrolPath = function (path, slowingRadius) {
        if (slowingRadius === void 0) { slowingRadius = 0; }
        this.resetIfPathHasChanged(path);
        var target = null;
        if (path != null && path.getNodes().length > 0) {
            var nodes = path.getNodes();
            if (this.currentNodeIndex == null) {
                this.currentNodeIndex = 0;
            }
            target = nodes[this.currentNodeIndex];
            var distance = this.host.getPosition().distance(target);
            if (distance <= 20) {
                this.currentNodeIndex += this.pathDirection;
                if (this.currentNodeIndex >= nodes.length) {
                    this.pathDirection = -1;
                    this.currentNodeIndex = nodes.length - 1;
                }
                else if (this.currentNodeIndex < 0) {
                    this.pathDirection = 1;
                    this.currentNodeIndex = 0;
                }
            }
        }
        return target != null ? this.seekBehavior.seek(target, slowingRadius) : new Phaser.Point(0, 0);
    };
    PathPatrollingBehavior.prototype.resetIfPathHasChanged = function (path) {
        if (this.currentPath != path) {
            this.currentPath = path;
            this.currentNodeIndex = 0;
        }
    };
    return PathPatrollingBehavior;
}());
exports.PathPatrollingBehavior = PathPatrollingBehavior;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://gamedevelopment.tutsplus.com/tutorials/understanding-steering-behaviors-pursuit-and-evade--gamedev-2946s
 */
var PursuingBehavior = (function () {
    function PursuingBehavior(host, seekBehavior) {
        this.host = host;
        this.seekBehavior = seekBehavior;
    }
    PursuingBehavior.prototype.pursuing = function (target) {
        var distance = this.host.getPosition().distance(target.getPosition());
        var updatesAhead = distance / target.getMaxVelocity().x;
        var futurePosition = target.getPosition().clone();
        futurePosition.add(target.getVelocity().x * updatesAhead, target.getVelocity().y * updatesAhead);
        return this.seekBehavior.seek(futurePosition);
    };
    return PursuingBehavior;
}());
exports.PursuingBehavior = PursuingBehavior;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SeekBehavior = (function () {
    function SeekBehavior(host) {
        this.host = host;
    }
    SeekBehavior.prototype.seek = function (target, slowingRadius) {
        if (slowingRadius === void 0) { slowingRadius = 0; }
        // direction vector is the straight direction from the boid to the target
        var direction = new Phaser.Point(target.x, target.y);
        // now we subtract the current boid position
        direction.subtract(this.host.getPosition().x, this.host.getPosition().y);
        // then we normalize it. A normalized vector has its length is 1, but it retains the same direction
        direction.normalize();
        // Check the distance to detect whether the character is inside the slowing area
        var distance = this.host.getPosition().distance(target);
        if (slowingRadius == 0 || distance > slowingRadius) {
            // time to set magnitude (length) to boid speed
            direction.setMagnitude(this.host.getMaxVelocity().x);
        }
        else {
            var ratio = distance / slowingRadius;
            if (ratio < 0.1) {
                direction.setMagnitude(0);
            }
            else {
                direction.setMagnitude(this.host.getMaxVelocity().x * ratio);
            }
        }
        // now we subtract the current boid velocity
        direction.subtract(this.host.getVelocity().x, this.host.getVelocity().y);
        // normalizing again
        direction.normalize();
        // finally we set the magnitude to boid force, which should be WAY lower than its velocity
        // TODO? direction.setMagnitude(this.force);
        return direction;
    };
    return SeekBehavior;
}());
exports.SeekBehavior = SeekBehavior;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WanderBehavior = (function () {
    function WanderBehavior(host) {
        this.host = host;
        this.wanderAngle = 0;
    }
    WanderBehavior.prototype.wander = function () {
        var circleDistance = 50;
        var circleRadius = 50;
        var angleChange = 180;
        // Calculate the circle center
        var circleCenter = this.host.getVelocity().clone();
        circleCenter.multiply(circleDistance, circleDistance);
        circleCenter.normalize();
        // Calculate the displacement force
        var displacement = new Phaser.Point(0, -1);
        displacement.multiply(circleRadius, circleRadius);
        displacement.normalize();
        // Randomly change the vector direction by making it change its current angle
        var distance = this.host.getPosition().distance(displacement);
        displacement.x = Math.cos(this.wanderAngle) * distance;
        displacement.y = Math.sin(this.wanderAngle) * distance;
        // Change wanderAngle just a bit, so it won't have the same value in the next game frame.
        this.wanderAngle += (Math.random() * -angleChange) - (angleChange * .5);
        // Finally calculate and return the wander force
        var wanderForce = circleCenter.add(displacement.x, displacement.y);
        wanderForce.normalize();
        // time to set magnitude (length) to boid speed
        wanderForce.setMagnitude(this.host.getMaxVelocity().x);
        wanderForce.normalize();
        return wanderForce;
    };
    return WanderBehavior;
}());
exports.WanderBehavior = WanderBehavior;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Building_1 = __webpack_require__(5);
var Base = (function (_super) {
    __extends(Base, _super);
    function Base(game, x, y, key, frame) {
        var _this = _super.call(this, game, x, y, key, frame) || this;
        _this.anchor.setTo(.5, .5);
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.allowGravity = false;
        _this.animations.add('idle', [0, 1, 2, 3, 5, 6, 7], 5, true);
        _this.animations.add('destroyed', [4], 5, true);
        _this.animations.play('idle');
        game.add.existing(_this);
        return _this;
    }
    return Base;
}(Building_1.Building));
exports.Base = Base;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BuildingRepository = (function () {
    function BuildingRepository() {
        this.building = [];
    }
    BuildingRepository.prototype.add = function (building) {
        this.building.push(building);
    };
    BuildingRepository.prototype.length = function () {
        return this.building.length;
    };
    BuildingRepository.prototype.get = function (index) {
        return this.building[index];
    };
    return BuildingRepository;
}());
exports.BuildingRepository = BuildingRepository;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Building_1 = __webpack_require__(5);
var Generator = (function (_super) {
    __extends(Generator, _super);
    function Generator(game, x, y, key, frame) {
        var _this = _super.call(this, game, x, y, key, frame) || this;
        _this.anchor.setTo(.5, .5);
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.allowGravity = false;
        _this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 5, true);
        _this.animations.add('destroyed', [15], 5, true);
        _this.animations.play('idle');
        game.add.existing(_this);
        return _this;
    }
    return Generator;
}(Building_1.Building));
exports.Generator = Generator;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Building_1 = __webpack_require__(5);
var Mine = (function (_super) {
    __extends(Mine, _super);
    function Mine(game, x, y, key, frame) {
        var _this = _super.call(this, game, x, y, key, frame) || this;
        _this.anchor.setTo(.5, .5);
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.allowGravity = false;
        _this.animations.add('build', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 5, true);
        _this.animations.add('idle', [17, 18, 19], 5, true);
        _this.animations.add('destroyed', [20], 5, true);
        _this.animations.play('idle');
        game.add.existing(_this);
        return _this;
    }
    return Mine;
}(Building_1.Building));
exports.Mine = Mine;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Boot = (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Boot.prototype.create = function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start('Preload');
    };
    return Boot;
}(Phaser.State));
exports.default = Boot;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Menu.prototype.create = function () {
        this.game.stage.backgroundColor = '#1b1128';
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);
        this.titleText = this.game.add.bitmapText(40, 100, 'carrier-command', 'PhaserJS SandBox', 27);
        this.subtitleText = this.game.add.bitmapText(40, 140, 'carrier-command', 'XXXX Game Jam #x by nidup', 10);
        this.startText = this.game.add.bitmapText(240, 450, 'carrier-command', 'Press space to start', 10);
    };
    Menu.prototype.startGame = function () {
        this.game.state.start('Play');
    };
    Menu.prototype.shutdown = function () {
        this.titleText.destroy();
        this.subtitleText.destroy();
        this.startText.destroy();
    };
    return Menu;
}(Phaser.State));
exports.default = Menu;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Builder_1 = __webpack_require__(36);
var MapAnalyser_1 = __webpack_require__(15);
var Scout_1 = __webpack_require__(38);
var BotRepository_1 = __webpack_require__(35);
var Tank_1 = __webpack_require__(39);
var Miner_1 = __webpack_require__(37);
var BuildingRepository_1 = __webpack_require__(28);
var Base_1 = __webpack_require__(27);
var Mine_1 = __webpack_require__(30);
var Generator_1 = __webpack_require__(29);
var Play = (function (_super) {
    __extends(Play, _super);
    function Play() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.debug = false;
        return _this;
    }
    Play.prototype.create = function () {
        if (this.debug) {
            this.game.time.advancedTiming = true;
        }
        this.game.stage.backgroundColor = '#000000';
        var tileSize = 20;
        var tileSpacing = 20;
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('GrasClif', 'GrasClif', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('Grass', 'Grass', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('Grass2', 'Grass2', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('GrasRoad', 'GrasRoad', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('GrassRDst', 'GrassRDst', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('Grs2CrtB', 'Grs2CrtB', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('Grs2Crtc', 'Grs2Crtc', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('Grs2Crtr', 'Grs2Crtr', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('Grs2Mnt', 'Grs2Mnt', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('Grs2Watr', 'Grs2Watr', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('Grss2Lav', 'Grss2Lav', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('GrssCrtr', 'GrssCrtr', tileSize, tileSize, 0, tileSpacing);
        this.map.addTilesetImage('GrssMisc', 'GrssMisc', tileSize, tileSize, 0, tileSpacing);
        var analyser = new MapAnalyser_1.MapAnalyser(this.map.layers[0].data, tileSize);
        var mapAnalyse = analyser.analyse();
        this.map.setCollision(mapAnalyse.getUnwalkableIndexes());
        this.layer = this.map.createLayer('Tile Layer 1');
        if (this.debug) {
            this.layer.debug = true;
        }
        this.layer.resizeWorld();
        this.game.physics.arcade.gravity.y = 350;
        this.buildings = new BuildingRepository_1.BuildingRepository();
        this.buildings.add(new Base_1.Base(this.game, 150, 200, 'Base', 0));
        this.buildings.add(new Mine_1.Mine(this.game, 800, 200, 'Mine', 0));
        this.buildings.add(new Generator_1.Generator(this.game, 100, 200, 'Generator', 0));
        this.bots = new BotRepository_1.BotRepository();
        this.bots.add(new Scout_1.Scout(this.game, 300, 300, 'Scout1', 0, this.bots));
        this.bots.add(new Scout_1.Scout(this.game, 50, 600, 'Scout1', 0, this.bots));
        this.bots.add(new Builder_1.Builder(this.game, 330, 370, 'Builder1', 0, mapAnalyse));
        this.bots.add(new Builder_1.Builder(this.game, 130, 170, 'Builder1', 0, mapAnalyse));
        this.bots.add(new Builder_1.Builder(this.game, 700, 370, 'Builder1', 0, mapAnalyse));
        this.bots.add(new Tank_1.Tank(this.game, 300, 340, 'Tank5', 0, this.bots));
        this.bots.add(new Miner_1.Miner(this.game, 70, 100, 'Miner', 0));
        this.game.camera.follow(this.bots.get(5));
    };
    Play.prototype.update = function () {
        if (this.game.input.mousePointer.isDown) {
            for (var i = 0; i < this.bots.length(); i++) {
                if (this.bots.get(i) instanceof Builder_1.Builder) {
                    this.bots.get(i).changePath(new Phaser.Point(this.game.input.x, this.game.input.y));
                }
            }
        }
        for (var i = 0; i < this.bots.length(); i++) {
            this.game.physics.arcade.collide(this.bots.get(i), this.layer); // TODO: vehicles block easily when moving
            this.bots.get(i).update();
            // TODO: handle vehicles collisions
            //this.game.physics.arcade.overlap(this.hero, this.vehicles[i], this.bite, null, this);
        }
    };
    Play.prototype.render = function () {
        if (this.debug) {
            // TODO: try https://github.com/samme/phaser-plugin-debug-arcade-physics ?
            //this.game.debug.body(this.bots.get(1));
            //this.game.debug.bodyInfo(this.bots.get(1), 20, 20);
            for (var i = 0; i < this.bots.length(); i++) {
                this.game.debug.body(this.bots.get(i));
            }
            this.game.debug.text("FPS: " + this.game.time.fps + " ", 2, 14, "#00ff00");
        }
    };
    return Play;
}(Phaser.State));
exports.default = Play;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Preload = (function (_super) {
    __extends(Preload, _super);
    function Preload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Preload.prototype.preload = function () {
        this.load.tilemap('level1', 'assets/tilemap/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('GrasClif', 'assets/terrain/GrasClif.png');
        this.load.image('Grass', 'assets/terrain/Grass.png');
        this.load.image('Grass2', 'assets/terrain/Grass2.png');
        this.load.image('GrasRoad', 'assets/terrain/GrasRoad.png');
        this.load.image('GrassRDst', 'assets/terrain/GrassRDst.png');
        this.load.image('Grs2CrtB', 'assets/terrain/Grs2CrtB.png');
        this.load.image('Grs2Crtc', 'assets/terrain/Grs2Crtc.png');
        this.load.image('Grs2Crtr', 'assets/terrain/Grs2Crtr.png');
        this.load.image('Grs2Mnt', 'assets/terrain/Grs2Mnt.png');
        this.load.image('Grs2Watr', 'assets/terrain/Grs2Watr.png');
        this.load.image('Grss2Lav', 'assets/terrain/Grss2Lav.png');
        this.load.image('GrssCrtr', 'assets/terrain/GrssCrtr.png');
        this.load.image('GrssMisc', 'assets/terrain/GrssMisc.png');
        this.load.spritesheet('Builder1', 'assets/vehicle/Builder1.png', 20, 20);
        this.load.spritesheet('Scout1', 'assets/vehicle/Scout1.png', 20, 20);
        this.load.spritesheet('Tank5', 'assets/vehicle/Tank5.png', 20, 20);
        this.load.spritesheet('Miner', 'assets/vehicle/Miner.png', 20, 20);
        this.load.spritesheet('Base', 'assets/building/Base.png', 60, 60);
        this.load.spritesheet('Mine', 'assets/building/Mine.png', 40, 60);
        this.load.spritesheet('Generator', 'assets/building/Generator.png', 40, 60);
        this.load.bitmapFont('carrier-command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
    };
    Preload.prototype.create = function () {
        this.game.state.start('Play'); // TODO: shortcuting "Menu" state :)
    };
    return Preload;
}(Phaser.State));
exports.default = Preload;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BotRepository = (function () {
    function BotRepository() {
        this.bots = [];
    }
    BotRepository.prototype.add = function (bot) {
        this.bots.push(bot);
    };
    BotRepository.prototype.enemiesOf = function (myself) {
        return this.bots.filter(function (bot) { return bot != myself; });
    };
    BotRepository.prototype.first = function () {
        return this.get(0);
    };
    BotRepository.prototype.length = function () {
        return this.bots.length;
    };
    BotRepository.prototype.get = function (index) {
        return this.bots[index];
    };
    return BotRepository;
}());
exports.BotRepository = BotRepository;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SteeringComputer_1 = __webpack_require__(2);
var Bot_1 = __webpack_require__(3);
var StackFSM_1 = __webpack_require__(0);
var PathFinder_1 = __webpack_require__(16);
var State_1 = __webpack_require__(1);
var BrainText_1 = __webpack_require__(4);
var Builder = (function (_super) {
    __extends(Builder, _super);
    function Builder(game, x, y, key, frame, mapAnalyse) {
        var _this = _super.call(this, game, x, y, key, frame) || this;
        _this.speed = 60;
        _this.pathFollowing = function () {
            if (_this.path && _this.getPosition().distance(_this.path.lastNode()) > 20) {
                _this.behavior.pathFollowing(_this.path);
                _this.behavior.reactToCollision(_this.body);
            }
            else {
                _this.path = null;
                _this.brain.popState();
                _this.brain.pushState(new State_1.State('wander', _this.wander));
            }
        };
        _this.wander = function () {
            if (_this.path == null) {
                _this.behavior.wander();
                _this.behavior.reactToCollision(_this.body);
            }
            else {
                _this.brain.popState();
                _this.brain.pushState(new State_1.State('path following', _this.pathFollowing));
            }
        };
        _this.anchor.setTo(.5, .5);
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.maxVelocity.set(_this.speed, _this.speed);
        _this.body.allowGravity = false;
        _this.body.collideWorldBounds = true;
        _this.body.setCircle(10, 0, 0);
        _this.animations.add('right', [5], 10, true);
        _this.animations.play('right');
        game.add.existing(_this);
        _this.behavior = new SteeringComputer_1.SteeringComputer(_this);
        _this.pathfinder = new PathFinder_1.PathFinder(mapAnalyse);
        _this.path = _this.pathfinder.findPhaserPointPath(_this.getPosition().clone(), new Phaser.Point(800, 200));
        _this.brain = new StackFSM_1.StackFSM();
        _this.brain.pushState(new State_1.State('path following', _this.pathFollowing));
        _this.brainText = new BrainText_1.BrainText(_this.game, _this.x, _this.y - 20, '', {}, _this, _this.brain);
        return _this;
    }
    // TODO: for debug purpose
    Builder.prototype.changePath = function (finalDestination) {
        var newPath = this.pathfinder.findPhaserPointPath(this.getPosition().clone(), finalDestination);
        if (newPath) {
            this.path = newPath;
        }
    };
    return Builder;
}(Bot_1.Bot));
exports.Builder = Builder;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SteeringComputer_1 = __webpack_require__(2);
var Bot_1 = __webpack_require__(3);
var StackFSM_1 = __webpack_require__(0);
var PhaserPointPath_1 = __webpack_require__(6);
var State_1 = __webpack_require__(1);
var BrainText_1 = __webpack_require__(4);
var Miner = (function (_super) {
    __extends(Miner, _super);
    function Miner(game, x, y, key, frame) {
        var _this = _super.call(this, game, x, y, key, frame) || this;
        _this.speed = 60;
        _this.pathPatrolling = function () {
            if (_this.path) {
                _this.behavior.pathPatrolling(_this.path);
            }
            else {
                _this.path = null;
                _this.brain.popState();
                _this.brain.pushState(new State_1.State('wander', _this.wander));
            }
        };
        _this.wander = function () {
            _this.behavior.wander();
            _this.behavior.reactToCollision(_this.body);
        };
        _this.anchor.setTo(.5, .5);
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.maxVelocity.set(_this.speed, _this.speed);
        _this.body.allowGravity = false;
        _this.body.collideWorldBounds = true;
        _this.body.setCircle(10, 0, 0);
        _this.animations.add('right', [4, 34], 2, true);
        _this.animations.play('right');
        game.add.existing(_this);
        _this.behavior = new SteeringComputer_1.SteeringComputer(_this);
        _this.path = new PhaserPointPath_1.PhaserPointPath([
            _this.getPosition().clone(),
            new Phaser.Point(400, 200),
            new Phaser.Point(400, 400),
            new Phaser.Point(200, 400)
        ]);
        _this.brain = new StackFSM_1.StackFSM();
        _this.brain.pushState(new State_1.State('patrolling', _this.pathPatrolling));
        _this.brainText = new BrainText_1.BrainText(_this.game, _this.x, _this.y - 20, '', {}, _this, _this.brain);
        return _this;
    }
    return Miner;
}(Bot_1.Bot));
exports.Miner = Miner;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SteeringComputer_1 = __webpack_require__(2);
var Bot_1 = __webpack_require__(3);
var StackFSM_1 = __webpack_require__(0);
var State_1 = __webpack_require__(1);
var BrainText_1 = __webpack_require__(4);
var Scout = (function (_super) {
    __extends(Scout, _super);
    function Scout(game, x, y, key, frame, bots) {
        var _this = _super.call(this, game, x, y, key, frame) || this;
        _this.speed = 90;
        _this.scope = 100;
        _this.wander = function () {
            var enemy = _this.closestEnemy();
            if (enemy !== null) {
                _this.brain.pushState(new State_1.State('evading', _this.evading));
            }
            else {
                _this.behavior.wander();
                //this.behavior.avoidCollision(this.body);
                _this.behavior.reactToCollision(_this.body);
            }
        };
        _this.evading = function () {
            var enemy = _this.closestEnemy();
            if (enemy !== null) {
                // TODO: flee makes something more natural when pursuing!
                // TODO: sometimes both bot and enemy does not move anymore!
                //this.behavior.evading(enemy);
                _this.behavior.flee(enemy.getPosition());
            }
            else {
                _this.brain.popState();
            }
        };
        _this.anchor.setTo(.5, .5);
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.maxVelocity.set(_this.speed, _this.speed);
        _this.body.allowGravity = false;
        _this.body.collideWorldBounds = true;
        _this.body.setCircle(10, 0, 0);
        _this.animations.add('right', [5], 10, true);
        _this.animations.play('right');
        game.add.existing(_this);
        _this.repository = bots;
        _this.behavior = new SteeringComputer_1.SteeringComputer(_this);
        _this.brain = new StackFSM_1.StackFSM();
        _this.brain.pushState(new State_1.State('wander', _this.wander));
        _this.brainText = new BrainText_1.BrainText(_this.game, _this.x, _this.y - 20, '', {}, _this, _this.brain);
        return _this;
    }
    Scout.prototype.closestEnemy = function () {
        var enemies = this.repository.enemiesOf(this);
        var closestEnemy = null;
        var closestDistance = this.scope * 10;
        for (var index = 0; index < enemies.length; index++) {
            var enemy = enemies[index];
            var distance = this.getPosition().distance(enemies[index].getPosition());
            if (distance < this.scope && distance < closestDistance) {
                closestEnemy = enemy;
                closestDistance = distance;
            }
        }
        return closestEnemy;
    };
    return Scout;
}(Bot_1.Bot));
exports.Scout = Scout;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SteeringComputer_1 = __webpack_require__(2);
var Bot_1 = __webpack_require__(3);
var StackFSM_1 = __webpack_require__(0);
var State_1 = __webpack_require__(1);
var BrainText_1 = __webpack_require__(4);
var Tank = (function (_super) {
    __extends(Tank, _super);
    function Tank(game, x, y, key, frame, bots) {
        var _this = _super.call(this, game, x, y, key, frame) || this;
        _this.speed = 50;
        _this.scope = 200;
        _this.wander = function () {
            var enemy = _this.closestEnemy();
            if (enemy !== null) {
                _this.brain.pushState(new State_1.State('pursuing', _this.pursuing));
            }
            else {
                _this.behavior.wander();
            }
        };
        _this.pursuing = function () {
            var enemy = _this.closestEnemy();
            if (enemy !== null) {
                _this.behavior.pursuing(enemy);
            }
            else {
                _this.brain.popState();
            }
        };
        _this.anchor.setTo(.5, .5);
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.maxVelocity.set(_this.speed, _this.speed);
        _this.body.allowGravity = false;
        _this.body.collideWorldBounds = true;
        _this.body.setCircle(10, 0, 0);
        _this.animations.add('right', [5], 10, true);
        _this.animations.play('right');
        game.add.existing(_this);
        _this.repository = bots;
        _this.behavior = new SteeringComputer_1.SteeringComputer(_this);
        _this.brain = new StackFSM_1.StackFSM();
        _this.brain.pushState(new State_1.State('wander', _this.wander));
        _this.brainText = new BrainText_1.BrainText(_this.game, _this.x, _this.y - 20, '', {}, _this, _this.brain);
        return _this;
    }
    Tank.prototype.closestEnemy = function () {
        var enemies = this.repository.enemiesOf(this);
        var closestEnemy = null;
        var closestDistance = this.scope * 10;
        for (var index = 0; index < enemies.length; index++) {
            var enemy = enemies[index];
            var distance = this.getPosition().distance(enemies[index].getPosition());
            if (distance < this.scope && distance < closestDistance) {
                closestEnemy = enemy;
                closestDistance = distance;
            }
        }
        return closestEnemy;
    };
    return Tank;
}(Bot_1.Bot));
exports.Tank = Tank;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ })
/******/ ]);