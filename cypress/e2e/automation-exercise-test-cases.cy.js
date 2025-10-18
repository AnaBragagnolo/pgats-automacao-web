/// <reference types="cypress" />

//const { it } = require("mocha");

//const { it } = require("mocha");

describe('Test cases da Automation Exercises', () => {
    
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()
    });
    
    it('1.Deve registrar um novo usuário com sucesso', () => {
        const timestamp = new Date().getTime()

        cy.get('[data-qa="signup-name"]').type('Ana Handson')
        cy.get('[data-qa="signup-email"]').type(`ana-qa-${timestamp}@teste.com`)
        cy.contains('button','Signup').click()
        cy.get('input[type=radio]').check('Mrs')
        cy.get('[id="password"]').type('123456')
        cy.get('[data-qa="days"]').select('23')
        cy.get('[data-qa="months"]').select('9')
        cy.get('[data-qa="years"]').select('2000')
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
        cy.get('input#first_name').type('Bob')
        cy.get('input#last_name').type('Narciso Pipoca')
        cy.get('input#company').type('PGATS')
        cy.get('input#address1').type('Avenida Selenium, n 2090')
        cy.get('select#country').select('Canada')
        cy.get('input#state').type('California')
        cy.get('input#city').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type('90001')
        cy.get('[data-qa="mobile_number"]').type('111 222 333')
        cy.get('[data-qa="create-account"]').click()

        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
    });

    it('2.Deve logar na aplicação com sucesso', () => {
        
        cy.get('input[data-qa="login-email"]').type('ana-qa@teste.com')
        cy.get('input[data-qa="login-password"]').type('123456')
        cy.contains('button','Login').click()

        cy.contains('b', 'Ana QA')
        cy.contains(`Logged in as Ana QA`)
    });

    it('3.1.Deve logar na aplicação com email incorreto', () => {
        
        cy.get('input[data-qa="login-email"]').type('ana@teste.com')
        cy.get('input[data-qa="login-password"]').type('123456')
        cy.contains('button','Login').click()

        cy.contains('Your email or password is incorrect!')
    });

    it('3.2.Deve logar na aplicação com senha incorreta', () => {
       
        cy.get('input[data-qa="login-email"]').type('ana@teste.com')
        cy.get('input[data-qa="login-password"]').type('1234')
        cy.contains('button','Login').click()

        cy.contains('Your email or password is incorrect!')
    });

    it('4.Deve deslogar da aplicação com sucesso', () => {
        
        cy.get('input[data-qa="login-email"]').type('ana-qa@teste.com')
        cy.get('input[data-qa="login-password"]').type('123456')
        cy.contains('button','Login').click()
        cy.get('a[href="/logout"]').click()

        cy.contains('Login to your account')
        cy.url().should('includes', 'login')
    });

    it('5.Deve tentar registrar com email de usuário já existente', () => {
       
        cy.get('input[data-qa="signup-name"]').type('Ana')
        cy.get('input[data-qa="signup-email"]').type('ana-qa@teste.com')
        cy.contains('button','Signup').click()

        cy.contains('Email Address already exist!')
        cy.url().should('includes', 'signup')
    });

    it.only('6. Deve enviar formulário de contato com upload de arquivo', () => {
        cy.visit('https://automationexercise.com/contact_us')
        cy.get('a[href="/contact_us"]').click()
        cy.get('input[data-qa="name"]').type('Ana')
        cy.get('input[data-qa="email"]').type('ana-qa@teste.com')
        cy.get('input[data-qa="subject"]').type('Ana contato')
        cy.get('textarea[data-qa="message"]').type('Envio de nota fiscal de produto para troca.')
        
        //upload

        cy.fixture('example.json').as('arquivo')
        cy.get('input[type=file]').selectFile('cypress/fixtures/arquivo-de-teste.pdf')

        cy.get('input[data-qa="submit-button"]').click()

        //Asserts
        cy.get('.status').should('be.visible')
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible')

    });
});