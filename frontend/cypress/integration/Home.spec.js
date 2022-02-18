/// <reference types="cypress" />


describe("Home page", () => {
    beforeEach(() => {
        cy.visit('/sign-in')
        cy.get("[name='login']").type("FattyBoy")
        cy.get("[name='password']").type("12345678")
        cy.get("button").click()
    })

    it("should display important elements", () => {
        cy.get("[class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-r4ylal-MuiPaper-root']").should('be.visible')
        cy.get("[class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-1wxsher-MuiPaper-root']").should('be.visible')
        cy.contains("Моя викторина").should('be.visible')
        cy.contains("Demo1").should('be.visible')
        cy.get("button[aria-label='Пользовательские настройки']").should('be.visible')
        cy.get("button[aria-label='open drawer']").should('be.visible')
    })

    it("should display pop up after click create new quiz", () => {
        cy.get("button[class='MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root css-hmlifq-MuiButtonBase-root-MuiButton-root']").click()
        cy.contains("Редактирование личной информации").should('be.visible')
        cy.get("input[name='name']").should('be.visible')
    })

    it("should close the quiz pop up after click button", () => {
        cy.get("button[class='MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root css-hmlifq-MuiButtonBase-root-MuiButton-root']").click()
        cy.contains("Отмена").click()
        cy.contains("Моя викторина").should('be.visible')
    })

    it("should display pop up when click setting change", () => {
        cy.contains("Настройки").click()
        cy.contains("Редактирование личной информации").should('be.visible')
    })

    it("should close the  setting pop up after click button", () => {
        cy.contains("Настройки").click()
        cy.contains("Отмена").click()
        cy.contains("Моя викторина").should('be.visible')
    })
    
    it("should display setting pop up after click avatar", () => {
        cy.get("button[aria-label='Пользовательские настройки']").click()
        cy.contains(" Управление пользователем").click()
        cy.contains("Редактирование личной информации").should('be.visible')
    })

    it("should jump back to login page after logout", () => {
        cy.get("button[aria-label='Пользовательские настройки']").click()
        cy.contains("Выйти").click()
        cy.contains("Нет аккаунта? Зарегистрироваться").should('be.visible')
    })

    it("should open drawer after click button", () => {
        cy.get("[aria-label='open drawer']").click()
        cy.contains("Financial Analysis").should('be.visible')
    })

    it("should close drawer after we click button", () => {
        cy.get("[aria-label='open drawer']").click()
        cy.get("[class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-admp4s-MuiButtonBase-root-MuiIconButton-root']").click()
        cy.contains("Моя викторина").should('be.visible')
    })
})