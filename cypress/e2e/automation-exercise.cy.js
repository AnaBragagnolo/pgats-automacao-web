/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('Automation Exercise', () => {
    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()

        cy.visit('https://automationexercise.com/')

        cy.get('a[href="/login"]').click()

        cy.get('[data-qa="signup-name"]').type('Ana QA')

        cy.get('[data-qa="signup-email"]').type(`ana-qa-${timestamp}@teste.com`)

        cy.contains('button','Signup').click()

        cy.get('input[type=radio]').check('Mrs')

        cy.get('[id="password"]').type('123456')

        cy.get('[data-qa="days"]').select('23')
        cy.get('[data-qa="months"]').select('9') //ou September
        cy.get('[data-qa="years"]').select('2000')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(`PGATS ${faker.company.name()}`)
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('[data-qa="country"]').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('111 222 333')

        cy.get('[data-qa="create-account"]').click()

        //Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')

    });
});
