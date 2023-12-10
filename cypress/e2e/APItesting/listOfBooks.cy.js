describe('GET List of books', () => {

    it('Check if user can access list of all books', () => {

        cy
            .request('GET', '/')
            .its('status')
            .should('equal', 200)

    })

    it('Check if user can access valid results for query parametar type = non-fiction', () => {

        cy
            .request({
                method: 'GET',
                url: '/books',
                qs: { type: 'non-fiction' }
            })
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(2)
                for (let i = 0; i < response.body.length; i++) {
                    expect(response.body[0].type).to.eq('non-fiction')
                }
            })
    })
    it('Check if user can access valid results for query parametar type = fiction', () => {

        cy
            .request({
                method: 'GET',
                url: '/books',
                qs: { type: 'fiction' }
            })
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(4)
                for (let i = 0; i < response.body.length; i++) {
                    expect(response.body[0].type).to.eq('fiction')
                }
            })
    })
    it('Check if user can access valid results for query parametar type = science-fiction', () => {

        cy
            .request({
                method: 'GET',
                url: '/books',
                failOnStatusCode: false,
                qs: { type: 'science-fiction' }
            })
            .then(response => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Invalid value for query parameter \'type\'. Must be one of: fiction, non-fiction.');

            })
    })
    it('Check if user can access valid results for query parametar limit = 3', () => {

        cy
            .request({
                method: 'GET',
                url: '/books',
                qs: { limit: 3 }
            })
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(3)
            })
    })
    it('Check if user can access valid results for query parametar limit = -1', () => {

        cy
            .request({
                method: 'GET',
                url: '/books',
                failOnStatusCode: false,
                qs: { limit: -1 }
            })
            .then(response => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Invalid  for query parameter \'limit\'. Must be greater than 0.');
            })
    })
    it('Check if user can access valid results for query parametar limit = 21', () => {

        cy
            .request({
                method: 'GET',
                url: '/books',
                failOnStatusCode: false,
                qs: { limit: 21 }
            })
            .then(response => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Invalid value for query parameter \'limit\'. Cannot be greater than 20.');
            })
    })
    it('Check if user can access valid results for query parametar name = The Russian', () => {

        cy
            .request({
                method: 'GET',
                url: '/books',
                qs: { name: 'The Russian' }
            })
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(1)
            })
    })
    it('Check if user can access valid results for query parametar avaliable = true', () => {

        cy
            .request({
                method: 'GET',
                url: '/books',
                qs: { avaliable: 'true' }
            })
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(5)
            })
    })

    it('Check if user can access valid results for query parametar avaliable = false', () => {

        cy
            .request({
                method: 'GET',
                url: '/books',
                qs: { 'avaliable': 'false' }
            })
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(1)
            })
    })
    it('Check if user can access valid results for query parametar avaliable = TRUE', () => {

        cy
            .request({
                method: 'GET',
                url: '/books',
                qs: { avaliable: 'TRUE' }
            })
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(0)
            })
    })
    it('Check if user can access valid results for query parametar bookId = 2', () => {

        cy
            .request({
                method: 'GET',
                url: '/books',
                qs: { 'bookId': '2' }
            })
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(0)
            })
    })


});