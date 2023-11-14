describe('GET all book orders', () => {

    let authToken = null
    let orderId = null

    before('Authentificate with valid clientName and clientEmail and submit an order', function(){
        cy
            .request({
                method: "POST",
                url: "https://simple-books-api.glitch.me/api-clients/",
                headers: {'Content-Type': 'application/json'},
                body: {
                    clientName: "CYtest",
                    clientEmail: Math.random().toString(5).substring(2)+"@gmail.com"
                }
            }).then((response) => {
                authToken=response.body.accessToken
                cy
                .request({
                    method: 'POST',
                    url: 'https://simple-books-api.glitch.me/orders',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+authToken
                    },
                    body: {
                        bookId: 1,
                        customerName: "{{$randomFullName}}"
                    }
                }).then((response) => {
                    orderId = response.body.orderId
                    expect(response.status).to.eql(201);
                    expect(response.body.created).to.eql(true);
                })
            })
    })

    it('Check if user can access all orders with valid authentification', function(){
        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/orders',
                headers: {'Authorization': 'Bearer '+authToken},
            })
            .then((response) => {
                expect(response.status).to.eql(200);
            })
    })
    
    it('Check if user can access all orders without valid authentification', function(){
        cy
            .request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/orders',
                failOnStatusCode: false
            })
            .its('status')
            .should('equal', 401)
    })
    after('Delete an order',() => {
        cy
            .request({
                method:'DELETE',
                url: 'https://simple-books-api.glitch.me/orders/'+orderId,
                failOnStatusCode: false,
                headers: {
                    'Authorization': 'Bearer '+authToken
                }
            }).then((response)=> {
                expect(response.status).to.eql(204)
            })
    });

})