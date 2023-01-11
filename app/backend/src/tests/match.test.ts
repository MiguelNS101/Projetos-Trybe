import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore 
import chaiHttp = require('chai-http');
// 
import { app } from '../app';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';
import teamMock from './mocks/userLoginMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Match test', () => {
  let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIn0sImlhdCI6MTY1NzMwNTA5NiwiZXhwIjoxNjU3OTA5ODk2fQ.YktgFMk8ZdQgFRHncmB6WJNKJ_XYRc_2YCFYf7aYizA';

    describe('get /matches', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(Match, 'findAll').resolves([
        {
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 3,
          awayTeam: 8,
          awayTeamGoals: 2,
          inProgress: false,
          teamHome: { teamName: 'São Paulo' },
          teamAway: { teamName: 'Grêmio' },
        },
      ] as any);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('A rota get /matches deve retornar os times', async () => {
        chaiHttpResponse = await chai.request(app).get('/matches')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal([
        {
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 3,
          awayTeam: 8,
          awayTeamGoals: 2,
          inProgress: false,
          teamHome: { teamName: 'São Paulo' },
          teamAway: { teamName: 'Grêmio' },
        },
      ]);
    });
  });
  
  describe('get /matches filtered', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(Match, 'findAll').resolves([
        {
          homeTeam: 16,
          homeTeamGoals: 3,
          awayTeam: 8,
          awayTeamGoals: 2,
          inProgress: false,
          teamHome: { teamName: 'São Paulo' },
          teamAway: { teamName: 'Grêmio' },
        },
        {
          homeTeam: 16,
          homeTeamGoals: 3,
          awayTeam: 8,
          awayTeamGoals: 2,
          inProgress: true,
          teamHome: { teamName: 'São Paulo' },
          teamAway: { teamName: 'Grêmio' },
        },
        {
          homeTeam: 16,
          homeTeamGoals: 3,
          awayTeam: 8,
          awayTeamGoals: 2,
          inProgress: false,
          teamHome: { teamName: 'São Paulo' },
          teamAway: { teamName: 'Grêmio' },
        }
      ] as any);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('A rota get /matches deve retornar os times', async () => {
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal([
        {
          homeTeam: 16,
          homeTeamGoals: 3,
          awayTeam: 8,
          awayTeamGoals: 2,
          inProgress: false,
          teamHome: { teamName: 'São Paulo' },
          teamAway: { teamName: 'Grêmio' },
        },
        {
          homeTeam: 16,
          homeTeamGoals: 3,
          awayTeam: 8,
          awayTeamGoals: 2,
          inProgress: false,
          teamHome: { teamName: 'São Paulo' },
          teamAway: { teamName: 'Grêmio' },
        }
      ]);
    });
  });

  describe('post /matches', () => {  
    let chaiHttpResponse: Response;
    it("Rota post /matches deve retornar 'Token must be a valid token'", async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/matches')
        .set("Authorization", "Token_Errado")
        .send({
          homeTeam: 16, 
          awayTeam: 8, 
          homeTeamGoals: 2,
          awayTeamGoals: 2
        })

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Token must be a valid token'})

    });

    it("Rota post /matches deve retornar 'All fields must be filled'", async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set("Authorization", token)
        .send({
          homeTeam: '', 
          awayTeam: 8, 
          homeTeamGoals: 2,
          awayTeamGoals: 2
        })

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'All fields must be filled'})

    });

    it("Rota post /matches deve retornar 'All fields must be filled'", async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set("Authorization", token)
        .send({
          awayTeam: 8, 
          homeTeamGoals: 2,
          awayTeamGoals: 2
        })

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'All fields must be filled'})

    });

    it("Rota post /matches deve retornar 'It is not possible to create a match with two equal teams'", async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set("Authorization", token)
        .send({
          homeTeam: 8, 
          awayTeam: 8, 
          homeTeamGoals: 2,
          awayTeamGoals: 2
        })

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'It is not possible to create a match with two equal teams'})

    });
  });

  describe('patch /matches/:id/finish', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(Match, 'update').resolves();
    });

    after(() => {
      (Match.update as sinon.SinonStub).restore();
    });

    it('A rota patch /matches deve retornar "Finished"', async () => {
        chaiHttpResponse = await chai.request(app).patch('/matches/1/finish')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
    });
  });

  describe('patch /matches/:id', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(Match, 'findOne').resolves({
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 3,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: false,
        teamHome: { teamName: 'São Paulo' },
        teamAway: { teamName: 'Grêmio' },
      } as any);

      sinon.stub(Match, 'update').resolves({
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 3,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: false,
        teamHome: { teamName: 'São Paulo' },
        teamAway: { teamName: 'Grêmio' },
      } as any);
    });

    after(() => {
      (Match.findOne as sinon.SinonStub).restore();
      (Match.update as sinon.SinonStub).restore();
    });

    it('A rota patch /matches deve retornar "Updated successfuly"', async () => {
        chaiHttpResponse = await chai.request(app).patch('/matches/1')
        .set("Authorization", token)
        .send({
          homeTeamGoals: 2,
          awayTeamGoals: 2
        })

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Updated successfuly' });
    });
  });

  describe('patch /matches/:id', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(Match, 'findOne').resolves();
    });

    after(() => {
      (Match.findOne as sinon.SinonStub).restore();
    });

    it('A rota patch /matches deve retornar "Match not found."', async () => {
        chaiHttpResponse = await chai.request(app).patch('/matches/1')
        .set("Authorization", token)
        .send({
          homeTeamGoals: 2,
          awayTeamGoals: 2
        })

        expect(chaiHttpResponse).to.have.status(404);
        expect(chaiHttpResponse.body).to.deep.equal({message: 'Match not found.'});
    });
  });
});
