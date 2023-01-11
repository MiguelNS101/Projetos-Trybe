import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';
import validUserAdmin from './mocks/userLoginMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('User test', () => {
  let chaiHttpResponse: Response;
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIn0sImlhdCI6MTY1NzMwNTA5NiwiZXhwIjoxNjU3OTA5ODk2fQ.YktgFMk8ZdQgFRHncmB6WJNKJ_XYRc_2YCFYf7aYizA';

  before(async () => {
    sinon.stub(User, 'findOne').resolves(validUserAdmin as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('User Login return Token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'user@user.com', password: 'secret_user' });

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body.token).to.be.a('string');
  });

  it('User Login sem email retorna Erro', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: '', password: 'secret_user' });

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body.message).to.be.equal(
      'All fields must be filled'
    );
  });

  it('User Login sem password retorna Erro', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'user@user.com', password: '' });

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body.message).to.be.equal(
      'All fields must be filled'
    );
  });

  it('User Login com password errado retorna Erro', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'user@user.com', password: 'senha_errada' });

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body.message).to.be.equal(
      'Incorrect email or password'
    );
  });

  it('/login/validate deve retornar role', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', token);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal({ role: 'user' });
  });

  it('/login/validate deve retornar error', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', 'token_errado');

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: 'Token must be valid',
    });
  });
});
