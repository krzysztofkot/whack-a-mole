"use strict";

import "./scss/main.scss";
import moleIMG from "./assets/mole.svg";

class GameLevel {
  constructor(rows, cols, gameSpeed) {
    this.rows = rows;
    this.cols = cols;
    this.gameSpeed = gameSpeed;
    this.fields = this.rows * this.cols;
  }
}

class UIController {
  constructor() {
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
  displayCountdownTime(time) {
    this.countdownEl.textContent = time;
  }

  displayPoints(points) {
    this.gamePoints.textContent = points;
  }

  displayTimeLeft(time) {
    this.gameTime.textContent = time;
  }

  displayHighscores(points) {
    this.highscoresPoints.textContent = points;
  }

  toggleHighscores() {
    this.highscores.classList.toggle("hidden");
  }

  togglePopup() {
    this.popup.classList.toggle("hidden");
  }

  setProperty(property, value) {
    this.root.style.setProperty(`--${property}`, `${value.toString()}`);
  }
  setGameSpeed(property, value) {
    this.root.style.setProperty(`--${property}`, `${value}ms`);
  }

  generateBoard(fields) {
    const template = `<li class="game__field" data-active="false">
      <img src="${moleIMG}" alt="Whack a mole" />
      <figcaption class="hole">&nbsp;</figcaption>
    </li>`;
    for (let i = 0; i < fields; i++) {
      this.board.insertAdjacentHTML("beforeend", template);
    }
  }

  removeBoard() {
    this.board.textContent = "";
  }

  toggleCountdown() {
    this.countdownContainer.classList.toggle("hidden");
  }

  queryBoardFields() {
    this.boardFields = document.querySelectorAll(".game__field");
  }

  toggleMole(fieldNumber) {
    this.boardFields[fieldNumber]
      .querySelector("img")
      .classList.toggle("active");
  }

  toggleMoleState(mole) {
    let state = this.boardFields[mole].dataset.active;
    this.boardFields[mole].dataset.active =
      state === "false" ? "true" : "false";
  }

  removeMoleState(mole) {
    this.boardFields[mole].dataset.active = "false";
  }

  toggleMoleAndState(mole) {
    this.toggleMole(mole);
    this.toggleMoleState(mole);
  }
}

class GameController {
  constructor() {}

  randomMole(max) {
    return Math.floor(Math.random() * max);
  }

  resetPoints() {
    this.points = 0;
  }

  addPoint() {
    return ++this.points;
  }

  set startCountingTime(time) {
    this.time = time;
  }
}

class App {
  constructor() {
    this.gameCtrl = new GameController();
    this.UICtrl = new UIController();
    this.levelList = document.querySelector(".game__controllers-list");
    this.startAgainBtn = document.querySelector(".btn__start-again");
    this.binedSetLevel = this.setLevel.bind(this);
    this.bindInit = this.init.bind(this);

    this.init();
  }

  set GameTime(time) {
    this.timer = time;
  }

  get GameTime() {
    return this.timer;
  }
  enableLevels() {
    this.levelList.addEventListener("click", this.binedSetLevel);
  }
  disableLevels() {
    this.levelList.removeEventListener("click", this.binedSetLevel);
  }

  enableStartAgainBtn() {
    this.startAgainBtn.addEventListener("click", this.bindInit);
  }

  disableStartAgainBtn() {
    this.startAgainBtn.removeEventListener("click", this.bindInit);
  }

  init() {
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

  activateBtns() {
    document
      .querySelector(".game__board")
      .addEventListener("click", this.clickMole.bind(this));
  }

  clickMole(e) {
    if (e.target.tagName === "UL") {
      return;
    }
    const el = e.target.closest(".game__field");
    if (el.dataset.active === "true") {
      const currentPoints = this.gameCtrl.addPoint();
      this.UICtrl.displayPoints(currentPoints);
      this.UICtrl.toggleMoleState(this.moleNumber);
    }
  }

  countdownTimer() {
    const intervalId = setInterval(() => {
      let currentTimeLeft = this.GameTime;
      currentTimeLeft--;
      this.GameTime = currentTimeLeft;
      this.UICtrl.displayTimeLeft(this.GameTime);
      if (!this.timer) {
        clearInterval(intervalId);
        this.endGame();
      }
    }, 1000);
  }

  startGame() {
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

  endGame() {
    this.UICtrl.toggleHighscores();
    this.stopMoles();
    this.enableStartAgainBtn();
    this.UICtrl.displayHighscores(this.gameCtrl.points);
  }

  setLevel(e) {
    if (e.target.className === "btn") {
      this.gameLevel = gameLevelsList[e.target.dataset.level];
      this.startGame();
    }
  }

  countdown() {
    let interval;
    const intervalId = setInterval(() => {
      this.gameCtrl.time--;
      this.UICtrl.displayCountdownTime(this.gameCtrl.time);
      if (this.gameCtrl.time === 0) {
        this.generateMole();
        this.countdownTimer();
        interval = setInterval(() => {
          this.generateMole();
        }, this.gameLevel.gameSpeed);
        this.UICtrl.toggleCountdown();
        clearInterval(intervalId);
        this.activateBtns();
        this.MoleIntervalId = interval;
      }
    }, 1000);
  }

  set moleNumber(number) {
    this.mole = number;
  }

  get moleNumber() {
    return this.mole;
  }

  stopMoles() {
    clearInterval(this.MoleIntervalId);
  }

  generateMole() {
    //Get random mole
    const currentField = this.gameCtrl.randomMole(this.gameLevel.fields);
    //check if active mole field is different than last move
    if (this.checkMole(currentField)) {
      this.moleNumber = currentField;
      //display mole in field
      this.UICtrl.toggleMoleAndState(currentField);
      setTimeout(() => {
        this.UICtrl.toggleMole(currentField);
        this.UICtrl.removeMoleState(currentField);
      }, this.gameLevel.gameSpeed);
    } else {
      this.generateMole();
    }
  }

  checkMole(number) {
    if (this.mole === undefined || this.mole !== number) {
      return 1;
    }
  }
}

const gameLevelsList = [];

gameLevelsList.push(new GameLevel(3, 3, 1500));
gameLevelsList.push(new GameLevel(3, 4, 1200));
gameLevelsList.push(new GameLevel(4, 5, 800));

new App();
