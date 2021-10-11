/// <reference types="cypress" />

import board from "../pages/board";
import countdown from "../pages/countdown";
import endgame from "../pages/endgame";
import homePage from "../pages/home-page";
import Homepage from "../pages/home-page";
import startPopup from "../pages/start-popup";

describe("Check game elements", function () {
  beforeEach(function () {
    Homepage.open();
  });

  it("Check if menu contains 3 buttons", function () {
    startPopup.buttons.should("have.length", 3);
  });

  it("First button should be called easy", function () {
    startPopup.easyLvBtn.should("have.text", "easy");
  });

  it("Second button should be called medium", function () {
    startPopup.mediumLvBtn.should("have.text", "medium");
  });

  it("Third button should be called hard", function () {
    startPopup.hardLvBtn.should("have.text", "hard");
  });

  it("Easy level should have 9 mole fields", function () {
    startPopup.selectEasyLv();
    board.Elements.should("have.length", 9);
  });

  it("Medium level should have 12 mole fields", function () {
    startPopup.selectMediumLv();
    board.Elements.should("have.length", 12);
  });

  it("Hard level should have 20 mole fields", function () {
    startPopup.selectHardLv();
    board.Elements.should("have.length", 20);
  });

  it("Mole should be visible", function () {
    startPopup.easyLvBtn.click();
    countdown.timer();
    board.visibleMoleImg.should("be.visible");
  });
});

describe("Check game functionalities", function () {
  this.beforeEach(function () {
    Homepage.open();
    startPopup.easyLvBtn.click();
  });

  it("Initial game time should be 30", function () {
    board.timeLeft.should("have.text", 30);
  });

  it("Initial points should be set to 0", function () {
    board.points.should("have.text", 0);
  });

  it("Should add point after mole clicked", function () {
    countdown.timer();
    board.points.then(($points) => {
      const startingPoints = parseInt($points.text());
      board.clickVisibleMole();
      board.points.then(($points) => {
        const currentPoints = parseInt($points.text());

        expect(currentPoints).be.equal(startingPoints + 1);
      });
    });
  });

  it("Should not add more points from same mole", function () {
    countdown.timer();
    board.points.then(($points) => {
      const startingPoints = parseInt($points.text());
      board.visibleMole.dblclick();
      board.points.then(($points) => {
        const currentPoints = parseInt($points.text());

        expect(currentPoints).not.be.equal(startingPoints + 2);
      });
    });
  });

  it("Should not add point for hidden mole", function () {
    countdown.timer();
    board.points.then(($points) => {
      const currentPoints = parseInt($points.text());
      board.hiddenMoles.eq(3).click();
      board.points.then(($newPoints) => {
        const newPoints = parseInt($newPoints.text());
        expect(currentPoints).to.equal(newPoints);
      });
    });
  });
});

describe("Elements visibility", function () {
  this.beforeEach(function () {
    homePage.open();
    startPopup.selectEasyLv();
  });

  it("Should hide countdown timer after 3s", function () {
    countdown.popup.should("be.visible");
    countdown.timer();
    countdown.popup.should("not.be.visible");
  });

  it("Show popup with points after game is over and start popup", function () {
    countdown.timer();
    board.clickVisibleMole();
    board.points.then(($points) => {
      const gamePoints = parseInt($points.text());
      endgame.popup.should("be.visible");
      endgame.score.then(($score) => {
        const score = parseInt($score.text());
        expect(score).to.be.equal(gamePoints);
      });
    });
    endgame.startGameBtn.should("be.visible");
    endgame.clickStartGameBtn();
    startPopup.popup.should("be.visible");
  });
});
