describe('GET Single book by ID', () => {

    it.only('Check if user can access valid results for path variable bookId = 1', () => {

        cy
            .request({
                method: 'GET',
                url: '/books/' + 1
            })
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.id).to.eq(1)
                expect(response.body).to.haveOwnProperty('name')
                expect(response.body.name).to.eq('The Russian')
                expect(response.body.available).to.eq(true)
            })
    })
    it('Check if user can acces valid  results for path variable bookId = 10', () => {

        cy
            .request({
                method: 'GET',
                url: '/10',
                failOnStatusCode: false
            })
            .then(response => {
                expect(response.status).to.eq(404);
            })
    })
    it('Check if user can acces valid  results for path variable bookId = "" ', () => {

        cy
            .request({
                method: 'GET',
                url: '/books' + ' ',
            })
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).has.length(6)
            })

    })
});