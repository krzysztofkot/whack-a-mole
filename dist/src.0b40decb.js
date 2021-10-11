parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"fx60":[function(require,module,exports) {

},{}],"DxQx":[function(require,module,exports) {
module.exports="mole.3ea9c267.svg";
},{}],"Focm":[function(require,module,exports) {
"use strict";require("./scss/main.scss");var e=t(require("./assets/mole.svg"));function t(e){return e&&e.__esModule?e:{default:e}}function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function n(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function e(t,i,n){s(this,e),this.rows=t,this.cols=i,this.gameSpeed=n,this.fields=this.rows*this.cols},l=function(){function t(){s(this,t),this.popup=document.querySelector(".popup"),this.root=document.documentElement,this.board=document.querySelector(".game__board"),this.countdownContainer=document.querySelector(".countdown"),this.gamePoints=document.querySelector(".stats__points"),this.gameTime=document.querySelector(".stats__time"),this.highscores=document.querySelector(".highscores"),this.countdownEl=document.querySelector(".countdown__timer"),this.highscoresPoints=document.querySelector(".highscores__score")}return n(t,[{key:"displayCountdownTime",value:function(e){this.countdownEl.textContent=e}},{key:"displayPoints",value:function(e){this.gamePoints.textContent=e}},{key:"displayTimeLeft",value:function(e){this.gameTime.textContent=e}},{key:"displayHighscores",value:function(e){this.highscoresPoints.textContent=e}},{key:"toggleHighscores",value:function(){this.highscores.classList.toggle("hidden")}},{key:"togglePopup",value:function(){this.popup.classList.toggle("hidden")}},{key:"setProperty",value:function(e,t){this.root.style.setProperty("--".concat(e),"".concat(t.toString()))}},{key:"setGameSpeed",value:function(e,t){this.root.style.setProperty("--".concat(e),"".concat(t,"ms"))}},{key:"generateBoard",value:function(t){for(var i='<li class="game__field" data-active="false">\n      <img src="'.concat(e.default,'" alt="Whack a mole" />\n      <figcaption class="hole">&nbsp;</figcaption>\n    </li>'),n=0;n<t;n++)this.board.insertAdjacentHTML("beforeend",i)}},{key:"removeBoard",value:function(){this.board.textContent=""}},{key:"toggleCountdown",value:function(){this.countdownContainer.classList.toggle("hidden")}},{key:"queryBoardFields",value:function(){this.boardFields=document.querySelectorAll(".game__field")}},{key:"toggleMole",value:function(e){this.boardFields[e].querySelector("img").classList.toggle("active")}},{key:"toggleMoleState",value:function(e){var t=this.boardFields[e].dataset.active;this.boardFields[e].dataset.active="false"===t?"true":"false"}},{key:"removeMoleState",value:function(e){this.boardFields[e].dataset.active="false"}},{key:"toggleMoleAndState",value:function(e){this.toggleMole(e),this.toggleMoleState(e)}}]),t}(),a=function(){function e(){s(this,e)}return n(e,[{key:"randomMole",value:function(e){return Math.floor(Math.random()*e)}},{key:"resetPoints",value:function(){this.points=0}},{key:"addPoint",value:function(){return++this.points}},{key:"startCountingTime",set:function(e){this.time=e}}]),e}(),r=function(){function e(){s(this,e),this.gameCtrl=new a,this.UICtrl=new l,this.levelList=document.querySelector(".game__controllers-list"),this.startAgainBtn=document.querySelector(".btn__start-again"),this.binedSetLevel=this.setLevel.bind(this),this.bindInit=this.init.bind(this),this.init()}return n(e,[{key:"GameTime",get:function(){return this.timer},set:function(e){this.timer=e}},{key:"enableLevels",value:function(){this.levelList.addEventListener("click",this.binedSetLevel)}},{key:"disableLevels",value:function(){this.levelList.removeEventListener("click",this.binedSetLevel)}},{key:"enableStartAgainBtn",value:function(){this.startAgainBtn.addEventListener("click",this.bindInit)}},{key:"disableStartAgainBtn",value:function(){this.startAgainBtn.removeEventListener("click",this.bindInit)}},{key:"init",value:function(){this.gameCtrl.resetPoints(),this.gameCtrl.startCountingTime=3,this.GameTime=30,this.UICtrl.displayCountdownTime(this.gameCtrl.time),this.UICtrl.togglePopup(),this.enableLevels(),this.UICtrl.toggleHighscores(),this.disableStartAgainBtn(),this.UICtrl.removeBoard()}},{key:"activateBtns",value:function(){document.querySelector(".game__board").addEventListener("click",this.clickMole.bind(this))}},{key:"clickMole",value:function(e){if("UL"!==e.target.tagName&&"true"===e.target.closest(".game__field").dataset.active){var t=this.gameCtrl.addPoint();this.UICtrl.displayPoints(t),this.UICtrl.toggleMoleState(this.moleNumber)}}},{key:"countdownTimer",value:function(){var e=this,t=setInterval(function(){var i=e.GameTime;i--,e.GameTime=i,e.UICtrl.displayTimeLeft(e.GameTime),e.timer||(clearInterval(t),e.endGame())},1e3)}},{key:"startGame",value:function(){this.disableLevels(),this.UICtrl.displayPoints(this.gameCtrl.points),this.UICtrl.displayTimeLeft(this.GameTime),this.UICtrl.setProperty("columns",this.gameLevel.cols),this.UICtrl.setProperty("rows",this.gameLevel.rows),this.UICtrl.setGameSpeed("animationSpeed",this.gameLevel.gameSpeed),this.UICtrl.generateBoard(this.gameLevel.fields),this.UICtrl.queryBoardFields(),this.UICtrl.toggleCountdown(),this.UICtrl.togglePopup(),this.countdown()}},{key:"endGame",value:function(){this.UICtrl.toggleHighscores(),this.stopMoles(),this.enableStartAgainBtn(),this.UICtrl.displayHighscores(this.gameCtrl.points)}},{key:"setLevel",value:function(e){"btn"===e.target.className&&(this.gameLevel=u[e.target.dataset.level],this.startGame())}},{key:"countdown",value:function(){var e,t=this,i=setInterval(function(){t.gameCtrl.time--,t.UICtrl.displayCountdownTime(t.gameCtrl.time),0===t.gameCtrl.time&&(t.generateMole(),t.countdownTimer(),e=setInterval(function(){t.generateMole()},t.gameLevel.gameSpeed),t.UICtrl.toggleCountdown(),clearInterval(i),t.activateBtns(),t.MoleIntervalId=e)},1e3)}},{key:"moleNumber",get:function(){return this.mole},set:function(e){this.mole=e}},{key:"stopMoles",value:function(){clearInterval(this.MoleIntervalId)}},{key:"generateMole",value:function(){var e=this,t=this.gameCtrl.randomMole(this.gameLevel.fields);this.checkMole(t)?(this.moleNumber=t,this.UICtrl.toggleMoleAndState(t),setTimeout(function(){e.UICtrl.toggleMole(t),e.UICtrl.removeMoleState(t)},this.gameLevel.gameSpeed)):this.generateMole()}},{key:"checkMole",value:function(e){if(void 0===this.mole||this.mole!==e)return 1}}]),e}(),u=[];u.push(new o(3,3,1500)),u.push(new o(3,4,1200)),u.push(new o(4,5,800)),new r;
},{"./scss/main.scss":"fx60","./assets/mole.svg":"DxQx"}]},{},["Focm"], null)
//# sourceMappingURL=src.0b40decb.js.map