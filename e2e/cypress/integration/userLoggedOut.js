/// <reference types="Cypress" />


describe("If a user is not logged in", () => {
  
  before(() => {
    cy.task("db:insert", {
      modelName: "Character",
      json: { name: "Mario", gameSeries: "Mario Brothers" },
    });

  })

  it("they aren't able to vote", () => {
    cy.visit("/characters/1")
    cy.get("p")
    .should("include.text", "Log in to vote!")
  })

  it("they aren't able to leave a review", () => {
    cy.visit("characters/1")
    cy.get("p")
    .should("include.text", "You must be signed in to leave a review")
  })

  it("they aren't able to add a new character", () => {
    cy.visit("characters/new")
    cy.url().should("eq", `${Cypress.config().baseUrl}/user-sessions/new`)
  })
})