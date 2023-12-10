describe('GET all book order by ID', () => {

    let authToken = null
    let orderId = null
    let orderIdInvalid = 1

    before('Authentificate with data valid clientName and clientEmail and submit an order', () => {
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
                        orderId = response.body.orderID
                        expect(response.status).to.eql(201);
                        expect(response.body.created).to.eql(true);
                    })
            })
    })

    it('Check if user can access order by ID with valid authentication', () => {
        cy
            .request({
                method: 'GET',
                url: '/orders/',
                qs: { 'orderId': orderId },
                headers: { 'Authorization': 'Bearer ' + authToken },
            })
            .then((response) => {
                expect(response.status).to.eql(200);
            })

    })
    it('Check if user can access order by invalid ID with valid authentication', () => {
        cy
            .request({
                method: 'GET',
                url: '/orders',
                qs: { 'orderId': orderIdInvalid },
                failOnStatusCode: false,
                headers: { 'Autorization': 'Bearer ' + authToken },
            })
            .then((response) => {
                expect(response.status).to.eql(401);
                expect(response.body.error).to.eq('Missing Authorization header.');
            })
    })
    it('Check if user can get order by valid ID without valid authentication', () => {
        cy
            .request({
                method: 'GET',
                url: '/orders/',
                qs: { 'orderId': orderId },
                failOnStatusCode: false
            })
            .then((response) => {
                expect(response.status).to.eql(401);
                expect(response.body.error).to.eq('Missing Authorization header.');
            })
    })
})