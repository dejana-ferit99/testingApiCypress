describe('POST Submit an order', () => {

    let authToken = null

    before('Check if user can authentificate with data valid clientName and clientEmail', () => {
        cy
            .request({
                method: "POST",
                url: "/api-clients/",
                headers: { 'Content-Type': 'application/json' },
                body: {
                    clientName: "CYtest",
                    clientEmail: Math.random().toString(5).substring(2) + "@gmail.com"
                }
            }).then((response) => {
                authToken = response.body.accessToken
            })
    })

    it('Check if user can submit an order without authentification and valid bookId', () => {
        cy
            .request({
                method: 'POST',
                url: '/orders',
                failOnStatusCode: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    bookId: 1,
                    customerName: "{{$randomFullName}}"
                }
            }).then((response) => {
                expect(response.status).to.eql(401);
                expect(response.body.error).to.eql("Missing Authorization header.");
            })
    })

    it('Check if user can submit an order with authentification and valid bookId', () => {

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
                expect(response.status).to.eql(201);
                expect(response.body.created).to.eql(true);
            })
    })
    it('Check if user can submit an order with authentification without valid bookId ', () => {

        cy
            .request({
                method: 'POST',
                url: '/orders',
                failOnStatusCode: false,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: {
                    bookId: 10,
                    customerName: "{{$randomFullName}}"
                }
            }).then((response) => {
                expect(response.status).to.eql(400);
                expect(response.body.error).to.eql("Invalid or missing bookId.");
            })
    })
    it.only('Check if user can submit an order with authentification without customerName ', () => {

        cy
            .request({
                method: 'POST',
                url: '/orders',
                failOnStatusCode: false,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: {
                    bookId: 1,
                    customerName: " "
                }
            }).then((response) => {
                expect(response.status).to.eql(400);
                expect(response.body.error).to.eql("Invalid or missing customer name.");
            })
    })
    it('Check if user can submit an order with authentification with book that has value "avaliable" = false', () => {

        cy
            .request({
                method: 'POST',
                url: '/orders',
                failOnStatusCode: false,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: {
                    bookId: 2,
                    customerName: "{{$randomFullName}}"
                }
            }).then((response) => {
                expect(response.status).to.eql(404);
            })
    })
});