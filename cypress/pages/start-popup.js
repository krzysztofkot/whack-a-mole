class StartPopup {
  get popup() {
    return cy.get(".popup");
  }
  get buttonsContainer() {
    return cy.get(".game__controllers-list");
  }

  get buttons() {
    return this.buttonsContainer.children();
  }

  get easyLvBtn() {
    return cy.get("[data-level=0]");
  }
  get mediumLvBtn() {
    return cy.get("[data-level=1]");
  }
  get hardLvBtn() {
    return cy.get("[data-level=2]");
  }

  selectEasyLv() {
    this.easyLvBtn.click();
  }
  selectMediumLv() {
    this.mediumLvBtn.click();
  }
  selectHardLv() {
    this.hardLvBtn.click();
  }
}

export default new StartPopup();
