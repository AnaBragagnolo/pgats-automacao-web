export function preencherFormularioDePreCadastro() {
    const timestamp = new Date().getTime()

        cy.get('[data-qa="signup-name"]').type('Ana Handson')
        cy.get('[data-qa="signup-email"]').type(`ana-qa-${timestamp}@teste.com`)
        cy.contains('button','Signup').click()
}

export function logarNaAplicacao () {
    cy.get('input[data-qa="login-email"]').type('ana-qa@teste.com')
    cy.get('input[data-qa="login-password"]').type('123456')
    cy.contains('button','Login').click()
}

export function logarSenhaIncorreta () {
    cy.get('input[data-qa="login-email"]').type('ana-qa@teste.com')
    cy.get('input[data-qa="login-password"]').type('999')
    cy.contains('button','Login').click()
}

export function usuarioExistente () {
    cy.get('input[data-qa="signup-name"]').type('Ana')
    cy.get('input[data-qa="signup-email"]').type('ana-qa@teste.com')
    cy.contains('button','Signup').click()
}