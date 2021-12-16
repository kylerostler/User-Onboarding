describe('Register New User Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    //helpers to grab elements
    const nameInput = () => cy.get('input[name=first_name]');
    const emailInput = () => cy.get('input[name=email]');
    const submitBtn = () => cy.get('button[id="submitBtn"]');
    const passwordInput = () => cy.get('input[name=password]');
    const termsCheck = () => cy.get('input[type="checkbox"]');

    it('sanity check to make sure the tests work', () => {
        expect(1 + 1).to.equal(2);
        expect({}).not.to.equal({});
    })

    it('check for the proper elements', () => {
        nameInput().should('exist');
        emailInput().should('exist');
        submitBtn().should('exist');
        passwordInput().should('exist');
        termsCheck().should('exist');
    })

    describe('Filling out the inputs', () => {
        it('can navigate to site', () => {
            cy.url().should('include', 'localhost');
        })

        it('can type in the inputs', () => {
            nameInput()
            .should('have.value', '')
            .type('darth vader')
            .should('have.value', 'darth vader')

            emailInput()
            .should('have.value', '')
            .type('test@test.com')
            .should('have.value', 'test@test.com')

            passwordInput()
            .should('have.value', '')
            .type('asdfASDF123!')
            .should('have.value', 'asdfASDF123!')
        })

        it('terms of service button checks', () => {
            termsCheck()
            .should('not.be.checked')
            .check()
            .should('be.checked')
        })
    })

    describe('Registering a user', () => {
        it('can submit a user', () => {
            nameInput().type('darth');
            emailInput().type('darth@sith.com');
            passwordInput().type('iLovePadme123!');
            termsCheck().check();
            submitBtn().click();

            cy.contains('darth');
        })
    })

    describe('check for form validation', () => {
        it('will show error when name not filled correctly', () => {
            nameInput()
            .should('have.value', '')
            .type('doh');

            emailInput()
            .should('have.value', '')
            .type('emailnt');

            passwordInput()
            .should('have.value', '')
            .type('password')

            termsCheck()
            .should('not.be.checked')
            .click()
            .click()

            cy.contains('username must be at least 5 characters');
            cy.contains('must be a valid email')
            cy.contains('Password must contain at least 8 characters, one uppercase, one number and one special case character')
            cy.contains('you must accept terms')
        })
    })
})