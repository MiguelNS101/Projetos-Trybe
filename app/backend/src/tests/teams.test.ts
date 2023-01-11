import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';
import teamMock from './mocks/userLoginMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team test', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Team, 'findAll').resolves([
      { id: 1, teamName: 'Avaí/Kindermann' },
      { id: 2, teamName: 'Bahia' },
      { id: 3, teamName: 'Botafogo' },
      { id: 4, teamName: 'Corinthians' },
    ] as any);
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('Rota get /teams retorna os times', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal([
      { id: 1, teamName: 'Avaí/Kindermann' },
      { id: 2, teamName: 'Bahia' },
      { id: 3, teamName: 'Botafogo' },
      { id: 4, teamName: 'Corinthians' },
    ]);
  });

  describe('Rota get /teams/:id retorna o time', () => {
    before(() => {
      sinon
        .stub(Team, 'findOne')
        .resolves([{ id: 1, teamName: 'Avaí/Kindermann' }] as any);
    });

    after(() => {
      (Team.findOne as sinon.SinonStub).restore();
    });

    it('Rota get /teams/:id retorna o id do time', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal([
        { id: 1, teamName: 'Avaí/Kindermann' },
      ]);
    });
  });

  describe('Rota get /teams/:id retorna o time', () => {
    before(() => {
      sinon
        .stub(Team, 'findOne')
        .resolves();
    });

    after(() => {
      (Team.findOne as sinon.SinonStub).restore();
    });

    it('Rota get /teams/:id retorna o id do time', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.deep.equal({message: 'Not Found'});
    });
  });
});
