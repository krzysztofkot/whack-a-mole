class Endgame {
  get popup() {
    return cy.get(".highscores", { timeout: 32000 });
  }
  get score() {
    return cy.get(".highscores__score");
  }

  get startGameBtn() {
    return cy.get(".btn__start-again");
  }

  clickStartGameBtn() {
    this.startGameBtn.click();
  }
}

export default new Endgame();
