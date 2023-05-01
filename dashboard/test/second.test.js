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
    it("Should return 404 for the user",(done) => {
        chai.request('http://localhost:7710')
        .get('/user')
        .then((res) => {
            expect(res).to.have.status(404)
            done()
        })
        .catch((err) =>{
            throw err
        })
    })
    it("Should return 200 for the addUser",(done) => {
        chai.request('http://localhost:7710')
        .post('/addUser')
        .send({"name":"Test User","City":"Test CIty","isActive":false})
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) =>{
            throw err
        })
    })
})