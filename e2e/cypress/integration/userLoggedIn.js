/// <reference types="Cypress" />


describe("If a user is logged in", () => {
  
  beforeEach(() => {
    cy.task("db:truncate", "Vote")
    cy.task("db:truncate", "Review")
    cy.task("db:truncate", "Character")
    cy.task("db:truncate", "User")
    cy.task("db:insert", {
      modelName: "Character",
      json: { name: "Luigi", gameSeries: "Mario Brothers" },
    })
    cy.visit("/users/new")
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("user@example.com");

      cy.findByLabelText("Password").type("password");
      cy.findByLabelText("Password Confirmation").type("password");

      cy.root().submit()
    })
  })

  it("they are able to up vote", () => {
    cy.get("ol")
      .find("li")
      .first()
      .click()

    cy.get('[name=upvote]')
      .first()
      .click()
    
    cy.get('.small-8 > :nth-child(6)')
      .should("have.text", "Total Points: 1")
  })

  it("they are able to down vote", () => {
    cy.get("ol")
      .find("li")
      .first()
      .click()

    cy.get('[name=downvote]')
      .first()
      .click()
    
    cy.get('.small-8 > :nth-child(6)')
      .should("have.text", "Total Points: -1")
  })

  it("they are able to un-vote", () => {
    cy.get("ol")
      .find("li")
      .first()
      .click()

    cy.get('[name=downvote]')
      .first()
      .click()
      .click()
    
    cy.get('.small-8 > :nth-child(6)')
      .should("have.text", "Total Points: 0")
  })

  it("they are able to leave a review", () => {
    cy.get("ol")
      .find("li")
      .first()
      .click()

    cy.get("textarea").type("Luigi's so cool")

    cy.get(".submit")
      .click()

    cy.get(".reviewTile")
      .should("have.length", 1)
  })
})