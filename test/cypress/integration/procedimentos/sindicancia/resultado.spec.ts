describe('Resultado Sindicancia page tests', () => {
  beforeEach(() => {
    cy.visit('/sindicancias/resultado')
  })
  it('assert that <Table> is loaded', () => {
    cy.dataCy('table')
      .should('have.attr', 'actions', '')
  })
  it('assert that <q-btn> is loaded', () => {
    cy.dataCy('button')
      .should('have.class', 'full-width')
  })

  it('assert click redirect', () => {
    cy.dataCy('button')
      .click()
    cy.location('pathname').should('eq', '/sindicancias/inserir')
  })
})
