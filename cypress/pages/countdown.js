class Countdown {
  get popup() {
    return cy.get(".countdown");
  }

  timer() {
    cy.wait(3000);
  }
}

export default new Countdown();
