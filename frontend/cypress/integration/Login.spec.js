/// <reference types="cypress" />


describe("Login page",() => {
    beforeEach(() => {
        cy.visit("/sign-in")
    })

    it("should render elements properly", () => {
        cy.get("[src='/static/logos/text-logo-white.png']").should('be.visible')
        cy.get("[src='/static/logos/logo.png']").should('be.visible')
        cy.get("[src='/static/logos/text-logo.png']").should('be.visible')
        cy.get("[name='login']").should('be.visible')
        cy.get("[name='password']").should('be.visible')
        cy.get("button").should('be.visible')
    })

    it("should throw warning if the input is empty", () => {
        cy.get("button").click()
        cy.get("[class='MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-11txbl4-MuiFormHelperText-root']")
          .contains("Необходимый").should('be.visible')
    })

    it("should jump to sign-up page after click link", () => {
        cy.get("[href='/sign-up']").click()
        cy.contains("Уже есть аккаунт? Войти в систему").should('be.visible')
    })

    it("should warn you when password is uncorrect (with mock)", () => {
        cy.intercept('POST', 'http://127.0.0.1:4001', (req) => {
            req.reply((res) => {
                res.send({
                    msg:"Неверные учетные данные."
                })
            })
        })

        cy.get("[name='login']").type("FattyBoy")
        cy.get("[name='password']").type("Test_password")
        cy.get("button").click()
        cy.get("[role='alert']")
        .should("contain", "Неверные учетные данные.")
    })

    it("should warn you when user do not exist (with mock)", () => {
        cy.intercept('POST', 'http://127.0.0.1:4001', (req) => {
            req.reply((res) => {
                res.send({
                    msg:"Неверные учетные данные."
                })
            })
        })

        cy.get("[name='login']").type("Test_username")
        cy.get("[name='password']").type("12345678")
        cy.get("button").click()
        cy.get("[role='alert']")
        .should("contain", "Неверные учетные данные.")
    })
    it("should let alert bar disappear after click button", () => {
        cy.get("[name='login']").type("Test_username")
        cy.get("[name='password']").type("Test_password")
        cy.get("button").click()
        cy.get("[title='Close']").click()
        cy.get("[role='alert']").should('not.exist')
    })

    it("should jump to home page after login", () => {
        cy.get("[name='login']").type("FattyBoy")
        cy.get("[name='password']").type("12345678")
        cy.get("button").click()
        cy.contains("Моя викторина").should('be.visible')
    })

})