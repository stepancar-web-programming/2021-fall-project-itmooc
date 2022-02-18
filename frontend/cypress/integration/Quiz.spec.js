/// <reference types="cypress" />

describe("Quiz page", () => {
    beforeEach(() => {
        cy.visit("/quiz")
    })

    it("should display important elements properly", () => {
        cy.get("[class='MuiBox-root css-k32ith']").should('be.visible')
        cy.get("[class='MuiBox-root css-1789ilv']").should('be.visible')
        cy.get("[class='MuiBox-root css-1oyh46e']").should('be.visible')
    })

    it("should only display correct answer after click it", () => {
        cy.contains("<a>").click()
        cy.contains("<a>").should('be.visible')
        cy.contains("<b>").should('not.exist')
        cy.contains("<strong>").should('not.exist')
        cy.contains("<p>").should('not.exist')
        cy.contains("<i>").should('not.exist')
        cy.contains("<span>").should('not.exist')
    })

    it("should display correct answer and incorrect answer you clicked", () => {
        cy.contains("<b>").click()
        cy.contains("<a>").should('be.visible')
        cy.contains("<b>").should('be.visible')
        cy.contains("<strong>").should('not.exist')
        cy.contains("<p>").should('not.exist')
        cy.contains("<i>").should('not.exist')
        cy.contains("<span>").should('not.exist')
    })

    it("should change icon of music after its button", () => {
        cy.get("[class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1f1puby-MuiButtonBase-root-MuiIconButton-root']")
          .click()
        cy.get("path[d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z']")
          .should('be.visible')
        cy.get("[class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1f1puby-MuiButtonBase-root-MuiIconButton-root']")
          .click()
        cy.get("path[d='M4.27 3 3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73L19.73 21 21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2z']")
          .should('be.visible')
    })

    it("should change icon of sound after its button", () => {
        cy.get("[class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-mlu8fn-MuiButtonBase-root-MuiIconButton-root']")
          .click()
        cy.get("path[d='M7 9v6h4l5 5V4l-5 5H7z']")
          .should('be.visible')
        cy.get("[class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1f1puby-MuiButtonBase-root-MuiIconButton-root']")
          .click()
        cy.get("[class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-mlu8fn-MuiButtonBase-root-MuiIconButton-root']")
          .click()
        cy.get("path[d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z']")
          .should('be.visible')
    })
})