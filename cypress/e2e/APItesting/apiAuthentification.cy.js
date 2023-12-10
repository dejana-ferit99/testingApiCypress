describe('POST API authentification', () => {

    let authToken = null
    let authEmail = Math.random().toString(5).substring(2) + "@gmail.com"


    it('Check if user can authentificate with data valid clientName and clientEmail', () => {
        cy
            .request({
                method: "POST",
                url: "/api-clients",
                headers: { 'Content-Type': 'application/json' },
                body: {
                    clientName: "CYtest",
                    clientEmail: authEmail
                }
            }).then((response) => {
                authToken = response.body.accessToken
                expect(response.status).to.eq(201)
            })
    })
    it('Check if user can repeat authentification with same valid data for clientName, clientEmail', () => {
        cy
            .request({
                method: "POST",
                url: "/api-clients",
                failOnStatusCode: false,
                headers: { 'Content-Type': 'application/json' },
                body: {
                    clientName: "CYtest",
                    clientEmail: authEmail
                }
            }).then((response) => {
                expect(response.status).to.eq(409)
            })
    })

})