Cypress.Commands.add('fillMandaToryFieldAndSubmit', function () {
    cy.get('#firstName').type('Ana Julia') 
    cy.get('#lastName').type('Soares')
    cy.get('#email').type('nana@outlook.com')
    cy.get('#open-text-area').type('Teste') 
    cy.contains('button', 'Enviar').click()
})