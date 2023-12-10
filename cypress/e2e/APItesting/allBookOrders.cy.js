describe('GET all book orders', () => {

    let authToken = null
    let orderId = null

    before('Authentificate with valid clientName and clientEmail and submit an order', () => {
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
                        expect(response.status).to.eql(201);
                        expect(response.body.created).to.eql(true);
                    })
            })
    })

    after('Delete an order', () => {
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

    it('Check if user can access all orders with valid authentification', () => {
        cy
            .request({
                method: 'GET',
                url: '/orders',
                headers: { 'Authorization': 'Bearer ' + authToken },
            })
            .then((response) => {
                expect(response.status).to.eql(200);
            })
    })

    it('Check if user can access all orders without valid authentification', () => {
        cy
            .request({
                method: 'GET',
                url: '/orders',
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(401);
                expect(response.body.error).to.eq("Missing Authorization header.");
            })
    })

})