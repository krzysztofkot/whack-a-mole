class Board {
  get board() {
    return cy.get(".game__board");
  }

  get Elements() {
    return this.board.children();
  }

  get visibleMole() {
    return cy.get("[data-active=true]");
  }

  get visibleMoleImg() {
    return this.visibleMole.children("img");
  }
  get hiddenMoles() {
    return cy.get("[data-active=false]");
  }

  get timeLeft() {
    return cy.get(".stats__time");
  }

  get points() {
    return cy.get(".stats__points");
  }

  clickVisibleMole() {
    this.visibleMole.click();
  }
}

export default new Board();
