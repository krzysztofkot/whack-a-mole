// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"assets/mole.svg":[function(require,module,exports) {
module.exports = "/mole.c2d9a5ee.svg";
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./scss/main.scss");

var _mole = _interopRequireDefault(require("./assets/mole.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameLevel = function GameLevel(rows, cols, gameSpeed) {
  _classCallCheck(this, GameLevel);

  this.rows = rows;
  this.cols = cols;
  this.gameSpeed = gameSpeed;
  this.fields = this.rows * this.cols;
};

var UIController = /*#__PURE__*/function () {
  function UIController() {
    _classCallCheck(this, UIController);

    this.popup = document.querySelector(".popup");
    this.root = document.documentElement;
    this.board = document.querySelector(".game__board");
    this.countdownContainer = document.querySelector(".countdown");
    this.gamePoints = document.querySelector(".stats__points");
    this.gameTime = document.querySelector(".stats__time");
    this.highscores = document.querySelector(".highscores");
    this.countdownEl = document.querySelector(".countdown__timer");
    this.highscoresPoints = document.querySelector(".highscores__score");
  }

  _createClass(UIController, [{
    key: "displayCountdownTime",
    value: function displayCountdownTime(time) {
      this.countdownEl.textContent = time;
    }
  }, {
    key: "displayPoints",
    value: function displayPoints(points) {
      this.gamePoints.textContent = points;
    }
  }, {
    key: "displayTimeLeft",
    value: function displayTimeLeft(time) {
      this.gameTime.textContent = time;
    }
  }, {
    key: "displayHighscores",
    value: function displayHighscores(points) {
      this.highscoresPoints.textContent = points;
    }
  }, {
    key: "toggleHighscores",
    value: function toggleHighscores() {
      this.highscores.classList.toggle("hidden");
    }
  }, {
    key: "togglePopup",
    value: function togglePopup() {
      this.popup.classList.toggle("hidden");
    }
  }, {
    key: "setProperty",
    value: function setProperty(property, value) {
      this.root.style.setProperty("--".concat(property), "".concat(value.toString()));
    }
  }, {
    key: "setGameSpeed",
    value: function setGameSpeed(property, value) {
      this.root.style.setProperty("--".concat(property), "".concat(value, "ms"));
    }
  }, {
    key: "generateBoard",
    value: function generateBoard(fields) {
      var template = "<li class=\"game__field\" data-active=\"false\">\n      <img src=\"".concat(_mole.default, "\" alt=\"Whack a mole\" />\n      <figcaption class=\"hole\">&nbsp;</figcaption>\n    </li>");

      for (var i = 0; i < fields; i++) {
        this.board.insertAdjacentHTML("beforeend", template);
      }
    }
  }, {
    key: "removeBoard",
    value: function removeBoard() {
      this.board.textContent = "";
    }
  }, {
    key: "toggleCountdown",
    value: function toggleCountdown() {
      this.countdownContainer.classList.toggle("hidden");
    }
  }, {
    key: "queryBoardFields",
    value: function queryBoardFields() {
      this.boardFields = document.querySelectorAll(".game__field");
    }
  }, {
    key: "toggleMole",
    value: function toggleMole(fieldNumber) {
      this.boardFields[fieldNumber].querySelector("img").classList.toggle("active");
    }
  }, {
    key: "toggleMoleState",
    value: function toggleMoleState(mole) {
      var state = this.boardFields[mole].dataset.active;
      this.boardFields[mole].dataset.active = state === "false" ? "true" : "false";
    }
  }, {
    key: "removeMoleState",
    value: function removeMoleState(mole) {
      this.boardFields[mole].dataset.active = "false";
    }
  }, {
    key: "toggleMoleAndState",
    value: function toggleMoleAndState(mole) {
      this.toggleMole(mole);
      this.toggleMoleState(mole);
    }
  }]);

  return UIController;
}();

var GameController = /*#__PURE__*/function () {
  function GameController() {
    _classCallCheck(this, GameController);
  }

  _createClass(GameController, [{
    key: "randomMole",
    value: function randomMole(max) {
      return Math.floor(Math.random() * max);
    }
  }, {
    key: "resetPoints",
    value: function resetPoints() {
      this.points = 0;
    }
  }, {
    key: "addPoint",
    value: function addPoint() {
      return ++this.points;
    }
  }, {
    key: "startCountingTime",
    set: function set(time) {
      this.time = time;
    }
  }]);

  return GameController;
}();

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.gameCtrl = new GameController();
    this.UICtrl = new UIController();
    this.levelList = document.querySelector(".game__controllers-list");
    this.startAgainBtn = document.querySelector(".btn__start-again");
    this.binedSetLevel = this.setLevel.bind(this);
    this.bindInit = this.init.bind(this);
    this.init();
  }

  _createClass(App, [{
    key: "GameTime",
    get: function get() {
      return this.timer;
    },
    set: function set(time) {
      this.timer = time;
    }
  }, {
    key: "enableLevels",
    value: function enableLevels() {
      this.levelList.addEventListener("click", this.binedSetLevel);
    }
  }, {
    key: "disableLevels",
    value: function disableLevels() {
      this.levelList.removeEventListener("click", this.binedSetLevel);
    }
  }, {
    key: "enableStartAgainBtn",
    value: function enableStartAgainBtn() {
      this.startAgainBtn.addEventListener("click", this.bindInit);
    }
  }, {
    key: "disableStartAgainBtn",
    value: function disableStartAgainBtn() {
      this.startAgainBtn.removeEventListener("click", this.bindInit);
    }
  }, {
    key: "init",
    value: function init() {
      this.gameCtrl.resetPoints();
      this.gameCtrl.startCountingTime = 3;
      this.GameTime = 30;
      this.UICtrl.displayCountdownTime(this.gameCtrl.time);
      this.UICtrl.togglePopup();
      this.enableLevels();
      this.UICtrl.toggleHighscores();
      this.disableStartAgainBtn();
      this.UICtrl.removeBoard();
    }
  }, {
    key: "activateBtns",
    value: function activateBtns() {
      document.querySelector(".game__board").addEventListener("click", this.clickMole.bind(this));
    }
  }, {
    key: "clickMole",
    value: function clickMole(e) {
      if (e.target.tagName === "UL") {
        return;
      }

      var el = e.target.closest(".game__field");

      if (el.dataset.active === "true") {
        var currentPoints = this.gameCtrl.addPoint();
        this.UICtrl.displayPoints(currentPoints);
        this.UICtrl.toggleMoleState(this.moleNumber);
      }
    }
  }, {
    key: "countdownTimer",
    value: function countdownTimer() {
      var _this = this;

      var intervalId = setInterval(function () {
        var currentTimeLeft = _this.GameTime;
        currentTimeLeft--;
        _this.GameTime = currentTimeLeft;

        _this.UICtrl.displayTimeLeft(_this.GameTime);

        if (!_this.timer) {
          clearInterval(intervalId);

          _this.endGame();
        }
      }, 1000);
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.disableLevels();
      this.UICtrl.displayPoints(this.gameCtrl.points);
      this.UICtrl.displayTimeLeft(this.GameTime);
      this.UICtrl.setProperty("columns", this.gameLevel.cols);
      this.UICtrl.setProperty("rows", this.gameLevel.rows);
      this.UICtrl.setGameSpeed("animationSpeed", this.gameLevel.gameSpeed);
      this.UICtrl.generateBoard(this.gameLevel.fields);
      this.UICtrl.queryBoardFields();
      this.UICtrl.toggleCountdown();
      this.UICtrl.togglePopup();
      this.countdown();
    }
  }, {
    key: "endGame",
    value: function endGame() {
      this.UICtrl.toggleHighscores();
      this.stopMoles();
      this.enableStartAgainBtn();
      this.UICtrl.displayHighscores(this.gameCtrl.points);
    }
  }, {
    key: "setLevel",
    value: function setLevel(e) {
      if (e.target.className === "btn") {
        this.gameLevel = gameLevelsList[e.target.dataset.level];
        this.startGame();
      }
    }
  }, {
    key: "countdown",
    value: function countdown() {
      var _this2 = this;

      var interval;
      var intervalId = setInterval(function () {
        _this2.gameCtrl.time--;

        _this2.UICtrl.displayCountdownTime(_this2.gameCtrl.time);

        if (_this2.gameCtrl.time === 0) {
          _this2.generateMole();

          _this2.countdownTimer();

          interval = setInterval(function () {
            _this2.generateMole();
          }, _this2.gameLevel.gameSpeed);

          _this2.UICtrl.toggleCountdown();

          clearInterval(intervalId);

          _this2.activateBtns();

          _this2.MoleIntervalId = interval;
        }
      }, 1000);
    }
  }, {
    key: "moleNumber",
    get: function get() {
      return this.mole;
    },
    set: function set(number) {
      this.mole = number;
    }
  }, {
    key: "stopMoles",
    value: function stopMoles() {
      clearInterval(this.MoleIntervalId);
    }
  }, {
    key: "generateMole",
    value: function generateMole() {
      var _this3 = this;

      //Get random mole
      var currentField = this.gameCtrl.randomMole(this.gameLevel.fields); //check if active mole field is different than last move

      if (this.checkMole(currentField)) {
        this.moleNumber = currentField; //display mole in field

        this.UICtrl.toggleMoleAndState(currentField);
        setTimeout(function () {
          _this3.UICtrl.toggleMole(currentField);

          _this3.UICtrl.removeMoleState(currentField);
        }, this.gameLevel.gameSpeed);
      } else {
        this.generateMole();
      }
    }
  }, {
    key: "checkMole",
    value: function checkMole(number) {
      if (this.mole === undefined || this.mole !== number) {
        return 1;
      }
    }
  }]);

  return App;
}();

var gameLevelsList = [];
gameLevelsList.push(new GameLevel(3, 3, 1500));
gameLevelsList.push(new GameLevel(3, 4, 1200));
gameLevelsList.push(new GameLevel(4, 5, 800));
new App();
},{"./scss/main.scss":"scss/main.scss","./assets/mole.svg":"assets/mole.svg"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61970" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map