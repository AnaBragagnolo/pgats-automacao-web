import { faker } from '@faker-js/faker';

export function preencherCadastro () {

    cy.get('input[type=radio]').check('Mrs')
    cy.get('[id="password"]').type('123456')
    cy.get('[data-qa="days"]').select('23')
    cy.get('[data-qa="months"]').select('9')
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
}

export function confirmarUsuarioInscrito () {
    cy.scrollTo('bottom')
    cy.get('.single-widget > h2').should('contain', 'Subscription')
    cy.get('[id="susbscribe_email"]').type('ana-qa@teste.com')
    cy.get('#subscribe > .fa').click()
}

export function excluirRegistroConta () {
    cy.get('a[href="/delete_account"]').click()
    cy.get('b').should('contain', 'Account Deleted!')
}

