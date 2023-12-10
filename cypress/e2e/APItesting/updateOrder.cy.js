describe('PATCH update an order with authentification', () => {

    let authToken = null
    let orderId = null

    before('Authentificate with data valid clientName and clientEmail', () => {
        cy
            .request({
                method: "POST",
                url: "/api-clients",
                headers: { 'Content-Type': 'application/json' },
                body: {
                    clientName: "CYtest",
                    clientEmail: Math.random().toString(5).substring(2) + "@gmail.com"
                }
            }).then((response) => {
                authToken = response.body.accessToken
            })
    })
    beforeEach('Check if user can submit an order with authentification', () => {
        cy
            .request({
                method: 'POST',
                url: '/orders',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
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
    afterEach('Delete an order', () => {
        cy
            .request({
                method: 'DELETE',
                url: '/orders/' + orderId,
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            }).then((response) => {
                expect(response.status).to.eql(204)
            })
    });

    it('Check if user can update an order using valid ID', () => {
        cy
            .request({
                method: 'PATCH',
                url: '/orders/' + orderId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: {
                    "customerName": "{{$randomFullName}}"
                }
            }).then((response) => {
                expect(response.status).to.eql(204);
            })
    })
    it('Check if user can update an order using invalid ID', () => {
        cy
            .request({
                method: 'PATCH',
                url: '/orders' + '1',
                failOnStatusCode: false,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: {
                    "customerName": "{{$randomFullName}}"
                }
            }).then((response) => {
                expect(response.status).to.eql(404);
            })
    })
    it('Check if user can update an order without authentification', () => {
        cy
            .request({
                method: 'PATCH',
                url: '/orders/' + orderId,
                failOnStatusCode: false,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    "customerName": "{{$randomFullName}}"
                }
            }).then((response) => {
                expect(response.status).to.eql(401);
                expect(response.body.error).to.eql("Missing Authorization header.");
            })
    })

})