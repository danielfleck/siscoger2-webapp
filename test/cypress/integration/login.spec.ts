describe('Landing', () => {
  beforeEach(() => {
    cy.visit('/login')
  })
  it('.should() - assert that <title> is correct', () => {
    cy.title().should('include', 'SISCOGER')
  })
})

describe('Login page tests', () => {
  beforeEach(() => {
    cy.visit('/login')
  })
  // it('Have a RG input', () => {
  //   cy.dataCy('rg')
  //     .should('have.attr', 'placeholder', 'Digite seu nome de usuário (ex: nome@pm.pr.gov.br)')
  // })

  // shoud exists components
  it('Have a RG input', () => {
    cy.dataCy('rg')
      .should('have.attr', 'placeholder', 'Digite seu RG')
  })
  it('Have a Password input', () => {
    cy.dataCy('pass')
      .should('have.attr', 'placeholder', 'Digite sua senha')
  })
  it('Have a loggin button', () => {
    cy.dataCy('button')
      .should('have.class', 'full-width')
  })

  it('Test submit', () => {
    cy.dataCy('rg').focus().type('123456')
    cy.dataCy('pass').focus().type('test')
    cy.dataCy('button').click()
  })

  // it('has pretty logo', () => {
  //   cy.dataCy('landing-wrapper img')
  //     .should('have.class', 'logo-main')
  //     .and('have.attr', 'src')
  //     .and('match', /^(data:image\/svg\+xml).+/)
  // })
  // it('has very important information', () => {
  //   cy.dataCy('instruction-wrapper')
  //     .should('contain', 'SETUP INSTRUCTIONS')
  //     .and('contain', 'Configure Authentication')
  //     .and('contain', 'Database Configuration and CRUD operations')
  //     .and('contain', 'Continuous Integration & Continuous Deployment CI/CD')
  // })
})
