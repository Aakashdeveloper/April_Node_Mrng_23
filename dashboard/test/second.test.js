let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe("Users Testing Api",() => {
    it("Should return 200 for the users",(done) => {
        chai.request('http://localhost:7710')
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) =>{
            throw err
        })
    })
})