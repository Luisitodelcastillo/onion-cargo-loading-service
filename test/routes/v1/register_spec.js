/**
 * Created by jordi on 02/12/2022.
 * 
 * To run the test:
 * 1. Start the server `npm start`
 * 2. Execute test `mocha test/routes/v1/register_spec.js --timeout 2000`
 */
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

const URL= 'http://localhost:8082/v1';
const HELP_BASE_URL = 'http://localhost:8082/v1/help/error';

const REGISTER_NEW = {
  "id": 0,
  "clientId": 1,
  "date": new Date(2023, 0, 1),
  "origin":"new",
  "destiny": "new",
  "method": "new",
  "requestId": "new",
  "status": 0,
  "requestBody": "new",
  "responseData": "new"
};

describe('API Register ',()=>{
  
  it('should return all registers', (done) => {
    chai.request(URL)
    .get('/register')
    .end(function(err, res) {
      //console.log(res.body);
      expect(res).to.have.status(200);
      expect(res.body).to.have.status('OK');
      expect(res.body.data).to.be.an('array');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.be.an('array').that.eql([]);
      done();
    });
  });

  it('should return one register', (done) => {
    chai.request(URL)
      .post('/register')
      .send(REGISTER_NEW)
      .end(function (err, res) {
        //console.log(res.body);
        expect(res).to.have.status(201);
        expect(res.body).to.have.status('OK');
        expect(res.body.data).not.to.be.an('array');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.be.an('array').that.eql([]);
        chai.request(URL)
          .get(`/register/${res.body.data.id}`)
          .end(function (err, res) {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.status('OK');
            expect(res.body.data).not.to.be.an('array');
            expect(res.body.data).to.be.eql({
              id: res.body.data.id,
              clientId: 1,
              date: (new Date(2023, 0, 1)).toISOString(),
              origin:"new",
              destiny: "new",
              method: "new",
              requestId: "new",
              status: 0,
              requestBody: "new",
              responseData: "new"
            })
            expect(res.body.errors).to.be.an('array');
            expect(res.body.errors).to.be.an('array').that.eql([]);
            chai.request(URL)
              .delete(`/register/${res.body.data.id}`)
              .end(function (err, res) {
                console.log(res.status);
                console.log(res.body);
                expect(res).to.have.status(200);
                expect(res.body).to.have.status('OK');
                expect(res.body.data).not.to.be.an('array');
                expect(res.body.errors).to.be.an('array');
                expect(res.body.errors).to.deep.equal([]);
                done();
              });
          });
      });
  });

  it('should return 404 if the register requested does not exist', (done) => {
    chai.request(URL)
    .get('/register/9999')
    .end(function(err, res) {
      //console.log(res.body);
      expect(res).to.have.status(404);
      expect(res.body).to.have.status('ERROR');
      expect(res.body.data).not.to.be.an('array');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.deep.equal([{
        code:'REGISTER-001',
        message:'Incorrect Id, this id does not exist',
        detail:'Ensure that the Id included in the request are correct',
        help: `${HELP_BASE_URL}/REGISTER-001`
      }]);
      done();
    });
  });
  

  it('should create a new register', (done) => {
    chai.request(URL)
    .post('/register')
    .send(REGISTER_NEW)
    .end(function(err, res) {
      //console.log(res.body);
      expect(res).to.have.status(201);
      expect(res.body).to.have.status('OK');
      expect(res.body.data).not.to.be.an('array');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.be.an('array').that.eql([]);
      chai.request(URL)
      .delete(`/register/${res.body.data.id}`)
      .end(function(err, res) {
        console.log(res.status);
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.status('OK');
        expect(res.body.data).not.to.be.an('array');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.deep.equal([]);
        done();
      });
    });
  });
  

  it('should update a register', (done) => {
    chai.request(URL)
    .post('/register')
    .send(REGISTER_NEW)
    .end(function(err, res) {
      expect(res).to.have.status(201);
      expect(res.body).to.have.status('OK');
      expect(res.body.data).not.to.be.an('array');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.be.an('array').that.eql([]);
      //console.log(res.body);
      chai.request(URL)
      .put(`/register/${res.body.data.id}`)
      .set('content-type', 'application/json')
      .send({
        id: 1,
        clientId: 1,
        date: new Date(2023, 6, 12, 3, 25),
        origin: '127.04.71:8078',
        destiny: 'http://v1/container',
        method: 'POST',
        requestId: 'Id required text',
        status: 200,
        requestBody: 'Body initial',
        responseData: 'Body final',
      })
      .end(function(err, res) {
        //console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.status('OK');
        expect(res.body.data).not.to.be.an('array');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.be.an('array').that.eql([]);
        //console.log(res.body);
        expect(res.body.data).to.be.deep.equal({
          id: res.body.data.id,
          clientId: 1,
          date: (new Date(2023, 6, 12, 3, 25)).toISOString(),
          origin: '127.04.71:8078',
          destiny: 'http://v1/container',
          method: 'POST',
          requestId: 'Id required text',
          status: 200,
          requestBody: 'Body initial',
          responseData: 'Body final',
        })
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.be.an('array').that.eql([]);
        chai.request(URL)
        .delete(`/register/${res.body.data.id}`)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.status('OK');
          expect(res.body.data).not.to.be.an('array');
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors).to.deep.equal([]);
          done();
        });
      });
    });
  });


  it('should return 404 if the register requested for updating does not exist', (done) => {
    chai.request(URL)
    .put('/register/9999')
    .send(REGISTER_NEW)
    .end(function(err, res) {
      //console.log(res.body);
      expect(res).to.have.status(404);
      expect(res.body).to.have.status('ERROR');
      expect(res.body.data).not.to.be.an('array');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.deep.equal([{
        code:'REGISTER-001',
        message:'Incorrect Id, this id does not exist',
        detail:'Ensure that the Id included in the request is correct',
        help: `${HELP_BASE_URL}/REGISTER-001`
      }]);
      done();
    });
  });

  it('should return 404 if the URL to update a register is not found because input ID is empty', (done) => {
    chai.request(URL)
    .put('/register/{} ')
    .end(function(err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.have.status('ERROR');
      expect(res.body.data).not.to.be.an('array');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.deep.equal([{
        code:'REGISTER-001',
        message:'Incorrect Id, this id does not exist',
        detail:'Ensure that the Id included in the request is correct',
        help: `${HELP_BASE_URL}/REGISTER-001`
      }]);
      done();
    });
  });

  
  it('should delete a register', (done) => {
    chai.request(URL)
    .post('/register')
    .send({
      id: 1,
      clientId: 1,
      date: new Date(2023, 6, 12, 3, 25),
      origin: '127.04.71:8078',
      destiny: 'http://v1/container',
      method: 'POST',
      requestId: "request id text",
      status: 200,
      requestBody: 'Body initial',
      responseData: 'Body final',
    })
    .end(function(err, res) {
      //console.log(res.body);
      expect(res).to.have.status(201);
      expect(res.body).to.have.status('OK');
      expect(res.body.data).not.to.be.an('array');
      expect(res.body.data).to.be.eql({
        id: res.body.data.id,
        clientId: 1,
        date: (new Date(2023, 6, 12, 3, 25)).toISOString(),
        origin: '127.04.71:8078',
        destiny: 'http://v1/container',
        method: 'POST',
        requestId: "request id text",
        status: 200,
        requestBody: 'Body initial',
        responseData: 'Body final',
      })
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.be.an('array').that.eql([]);
      chai.request(URL)
      .delete(`/register/${res.body.data.id}`)
      .end(function(err, res) {
        //console.log(res.status);
        //console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.status('OK');
        expect(res.body.data).not.to.be.an('array');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.deep.equal([]);
        done();
      });
    });
  });

  it('should return 404 if the register requested to delete does not exist', (done) =>{
    chai.request(URL)
    .delete('/register/9999')
    .end(function(err, res) {
      //console.log(res.body);
      expect(res).to.have.status(404);
      expect(res.body).to.have.status('ERROR');
      expect(res.body.data).not.to.be.an('array');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.deep.equal([{
        code:'REGISTER-001',
        message:'Incorrect Id, this id does not exist',
        detail:'Ensure that the Id included in the request is correct',
        help: `${HELP_BASE_URL}/REGISTER-001`
      }]);
      done();
    });
  });

  it('should return 404 if the URL to delete a register is not found because input ID is empty', (done) => {
    chai.request(URL)
    .delete('/register/{} ')
    .end(function(err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.have.status('ERROR');
      expect(res.body.data).not.to.be.an('array');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.deep.equal([{
        code:'REGISTER-001',
        message:'Incorrect Id, this id does not exist',
        detail:'Ensure that the Id included in the request is correct',
        help: `${HELP_BASE_URL}/REGISTER-001`
      }]);
      done();
    });       
  });

});
 