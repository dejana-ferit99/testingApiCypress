describe('GET Single book by ID', () => {

    it('Check if user can access valid results for path variable bookId = 1', function(){

        cy
            .request('GET', 'https://simple-books-api.glitch.me/books/'+1)
            .its('status')
            .should('equal', 200)
    })
    it('Check if user can acces valid  results for path variable bookId = 10', function(){

        cy
            .request({
                method: 'GET', 
                url: 'https://simple-books-api.glitch.me/10', 
                failOnStatusCode: false
            })
            .then (response => {
                expect(response.status).to.eq(404)
            })
    })
    it('Check if user can acces valid  results for path variable bookId = "" ', function(){

        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/books',
                qs: {'bookId': ' '}
            })
            .then (response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(6)
            })

    })
});