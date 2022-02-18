/// <reference types="cypress" />

describe("Sign-up page", () => {
    beforeEach(() => {
        cy.visit("/sign-up") 
    })

    it("should display elements properly", () => {
        cy.get("[name='login']").should('be.visible')
        cy.get("[name='password']").should('be.visible')
        cy.get("[name='confirmPassword']").should('be.visible')
        cy.contains("День рождения").should('be.visible')
        cy.get("#mui-component-select-day").should('be.visible')
        cy.get("#mui-component-select-month").should('be.visible')       
        cy.get("#mui-component-select-year").should('be.visible')
        cy.contains("Пол").should('be.visible')
        cy.contains("Женщина").should('be.visible')
        cy.contains("Мужчина").should('be.visible')
        cy.contains("Другое").should('be.visible')
        cy.get("[type='submit']").should('be.visible')
        cy.contains("Уже есть аккаунт? Войти в систему").should('be.visible')
    })

    it("should warn you when you left username empty", () => {
        cy.get("[name='password']").type("987654321")
        cy.get("[name='confirmPassword']").type("987654321")
        cy.get("[type='submit']").click()
        cy.contains("Необходимый").should('be.visible')
    })

    it("should warn you when you left password empty", () => {
        cy.get("[name='login']").type("TestAccount")
        cy.get("[type='submit']").click()
        cy.contains("Необходимый").should('be.visible')
    })

    it("should warn you when you confirm password uncorrectly", () => {
        cy.get("[name='login']").type("TestAccount")
        cy.get("[name='password']").type("987654321")
        cy.get("[name='confirmPassword']").type("98765432")
        cy.get("[type='submit']").click()
        cy.contains("Пароль подтверждения должен совпадать").should('be.visible')
    })


    it("should warn you when you choose a birthday after current date", () => {
        cy.intercept('POST', 'http://127.0.0.1:4001', (req) => {
            req.reply((res) => {
                res.send({
                    msg:"Ваш день рождения должен быть раньше, чем сегодня."
                })
            })
        })

        cy.get("[name='password']").type("987654321")
        cy.get("[name='login']").type("TestsLogin")
        cy.get("[name='confirmPassword']").type("987654321")
        cy.contains("Февраль").click()
        cy.get("[data-value='12']").click()
        cy.get("[type='submit']").click()   
        cy.contains("Ваш день рождения должен быть раньше, чем сегодня.").should('be.visible')
    })

    it("should warn you when login already exists", () => {
        cy.get("[name='password']").type("987654321")
        cy.get("[name='login']").type("TestLogin")
        cy.get("[name='confirmPassword']").type("987654321")
        cy.get("[type='submit']").click()
        cy.contains("Пользователь уже существует. Пожалуйста, войдите.").should('be.visible')
    })

    it("should warn you when login start with dash", () => {
        cy.get("[name='login']").type("_TestLogin")
        cy.get("[type='submit']").click()
        cy.contains("Логин не может начинаться с тире (_) или точки (.)").should('be.visible')
    })

    it("should warn you when login start with dot", () => {
        cy.get("[name='login']").type(".TestLogin")
        cy.get("[type='submit']").click()
        cy.contains("Логин не может начинаться с тире (_) или точки (.)").should('be.visible')
    })

    it("should warn you when login end with dash", () => {
        cy.get("[name='login']").type("TestLogin_")
        cy.get("[type='submit']").click()
        cy.contains("Логин не может заканчиваться тире или точкой").should('be.visible')
    })

    it("should warn you when login end with dot", () => {
        cy.get("[name='login']").type("TestLogin.")
        cy.get("[type='submit']").click()
        cy.contains("Логин не может заканчиваться тире или точкой").should('be.visible')
    })

    it("should warn you when login contains souble dash", () => {
        cy.get("[name='login']").type("Test__Login")
        cy.get("[type='submit']").click()
        cy.contains("нет __ или _. или ._ или .. внутри логина").should('be.visible')
    })

    it("should warn you when login contains double dot", () => {
        cy.get("[name='login']").type("Test..Login")
        cy.get("[type='submit']").click()
        cy.contains("нет __ или _. или ._ или .. внутри логина").should('be.visible')
    })

    it("should warn you when login too short", () => {
        cy.get("[name='login']").type("Test")
        cy.get("[type='submit']").click()
        cy.contains("Длина логина должна быть не менее 8").should('be.visible')
    })

    it("should warn you when login too long", () => {
        cy.get("[name='login']").type("TestTestTestTestTestTestTestTestTestTest")
        cy.get("[type='submit']").click()
        cy.contains("Длина логина не должна превышать 20").should('be.visible')
    })

    it("should warn you when password too short", () => {
        cy.get("[name='password']").type("111")
        cy.get("[type='submit']").click()
        cy.contains("Длина пароля должна быть не менее 8").should('be.visible')
    })

    it("should warn you when password too long", () => {
        cy.get("[name='password']").type("11111111111111111111111111111111111111111111111")
        cy.get("[type='submit']").click()
        cy.contains("Длина пароля не должна превышать 20").should('be.visible')
    })

    it("should jump back to login page when click link", () => {
        cy.contains("Уже есть аккаунт? Войти в систему").click()
        cy.contains("Нет аккаунта? Зарегистрироваться").should('be.visible')
    })

   

})