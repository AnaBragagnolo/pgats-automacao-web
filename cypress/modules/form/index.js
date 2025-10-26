export function preencherFormularioDeContato () {
    cy.get('input[data-qa="name"]').type('Ana')
    cy.get('input[data-qa="email"]').type('ana-qa@teste.com')
    cy.get('input[data-qa="subject"]').type('Ana contato')
    cy.get('textarea[data-qa="message"]').type('Envio de nota fiscal de produto para troca.')
}

export function anexarArquivo () {
    cy.fixture('example.json').as('arquivo')
    cy.get('input[type=file]').selectFile('cypress/fixtures/arquivo-de-teste.pdf')

    cy.get('input[data-qa="submit-button"]').click()
}