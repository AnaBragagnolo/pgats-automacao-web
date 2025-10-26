export function inserirProdutoCarrinho () {
    cy.get(':nth-child(5) > .btn').click()
    cy.get('.modal-title').should('contain', 'Added')
    cy.get('.modal-body a[href="/view_cart"]').click();
    cy.url().should('include', 'view_cart')
    cy.get('.col-sm-6 > .btn').click()
}

export function confirmarCompra () {
    cy.get(':nth-child(4) > .heading').should('contain', 'Review Your Order')
    cy.get('.form-control').type('Embalagem para presente')
    cy.get('a[href="/payment"]').click()
}