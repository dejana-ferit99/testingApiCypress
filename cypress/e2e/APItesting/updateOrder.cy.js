describe('PATCH update an order with authentification', () => {

    let authToken = null
    let orderId = null

    before('Authentificate with data valid clientName and clientEmail', function(){
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
            })
    })
    beforeEach('Check if user can submit an order with authentification', function(){
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
                expect(response.status).to.eql(201)
                expect(response.body.created).to.eql(true)
            })
    })
    afterEach('Delete an order',() => {
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
    
    it('Check if user can update an order using valid ID', function(){
        cy
            .request({
                method: 'PATCH',
                url: 'https://simple-books-api.glitch.me/orders/' + orderId,
                headers: { 
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+authToken
                },
                body: {
                    "customerName": "{{$randomFullName}}" 
                }
            }).then((response) => {
                expect(response.status).to.eql(204);
            })
    })
    it('Check if user can update an order using invalid ID', function(){
        cy
            .request({
                method: 'PATCH',
                url: 'https://simple-books-api.glitch.me/orders' + '1',
                failOnStatusCode: false,
                headers: { 
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+authToken
                },
                body: {
                    "customerName": "{{$randomFullName}}" 
                }
            }).then((response) => {
                expect(response.status).to.eql(404);
            })
    })
    it('Check if user can update an order without authentification', function(){
        cy
            .request({
                method: 'PATCH',
                url: 'https://simple-books-api.glitch.me/orders/' + orderId,
                failOnStatusCode: false,
                headers: { 
                    'Content-Type':'application/json',
                },
                body: {
                    "customerName": "{{$randomFullName}}" 
                }
            }).then((response) => {
                expect(response.status).to.eql(401);
            })
    })
    
})