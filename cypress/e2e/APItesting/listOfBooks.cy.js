describe('GET List of books', () => {

    it('Check if user can access list of all books', function(){

        cy
            .request('GET', 'https://simple-books-api.glitch.me/books')
            .its('status')
            .should('equal', 200)

    })

    it('Check if user can access valid results for query parametar type = non-fiction', function(){

        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/books',
                qs: {type: 'non-fiction'}
            })
            .then (response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(2)
                for(let i=0; i< response.body.length; i++){
                    expect(response.body[0].type).to.eq('non-fiction')
                }
            })
    })
    it('Check if user can access valid results for query parametar type = fiction', function(){

        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/books',
                qs: {type:'fiction'}
            })
            .then (response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(4)
                for(let i=0; i< response.body.length; i++){
                    expect(response.body[0].type).to.eq('fiction')
                }
            })
    })
    it('Check if user can access valid results for query parametar type = science-fiction', function(){

        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/books',
                failOnStatusCode: false,
                qs: {type:'science-fiction'}
            })
            .then (response => {
                expect(response.status).to.eq(400)
            })
    })
    it('Check if user can access valid results for query parametar limit = 3', function(){

        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/books',
                qs: {limit: 3}
            })
            .then (response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(3)
            })
    })
    it('Check if user can access valid results for query parametar limit = 21', function(){

        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/books',
                failOnStatusCode: false,
                qs: {limit : 21}
            })
            .then (response => {
                expect(response.status).to.eq(400)
            })
    })
    it('Check if user can access valid results for query parametar name = The Russian', function(){

        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/books',
                qs: {name: 'The Russian'}
            })
            .then (response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(1)
            })
    })
    it.only('Check if user can access valid results for query parametar avaliable = true', function(){

        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/books',
                qs: {avaliable:'true'}
            })
            .then (response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(5)
            })
    })

    it('Check if user can access valid results for query parametar avaliable = false', function(){

        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/books',
                qs: {'avaliable':'false'}
            })
            .then (response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(1)
            })
    })
    it('Check if user can access valid results for query parametar avaliable = TRUE', function(){

        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/books',
                qs: {avaliable:'TRUE'}
            })
            .then (response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(0)
            })
    })
    it('Check if user can access valid results for query parametar bookId = 2', function(){

        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/books',
                qs: {'bookId':'2'}
            })
            .then (response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(0)
            })
    })

    
});