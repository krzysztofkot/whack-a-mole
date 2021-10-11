class Homepage {
  open() {
    cy.visit("/");
  }
}

export default new Homepage();
