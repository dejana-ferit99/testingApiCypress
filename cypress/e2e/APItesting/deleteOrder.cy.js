describe('DELETE an order', () => {

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
    it('Check if user can delete an order using valid ID with valid authenification', () => {
        cy
            .request({
                method: 'DELETE',
                url: '/orders/' + orderId,
                failOnStatusCode: false,
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            }).then((response) => {
                expect(response.status).to.eql(204);
            })
    })
    it('Check if user can delete an order using invalid ID with valid authenification', () => {
        cy
            .request({
                method: 'DELETE',
                url: '/orders',
                failOnStatusCode: false,
                qs: {
                    'orderId': 1
                },
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            }).then((response) => {
                expect(response.status).to.eql(404);
            })
    })
    it.only('Check if user can delete an order using valid ID without valid authenification', () => {
        cy
            .request({
                method: 'DELETE',
                url: '/orders/' + orderId,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eql(401);
                expect(response.body.error).to.eq("Missing Authorization header.");

            })
    })
})