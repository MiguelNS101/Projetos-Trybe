import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import { carMock } from '../../mocks/carMock';

describe('Car Model', () => {
  const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMock);
		sinon.stub(Model, 'findOne').resolves(carMock);
		sinon.stub(Model, 'find').resolves([carMock]);
	});

	after(() => {
		sinon.restore();
	});

    describe('creating a Car', () => {
		it('successfully created', async () => {
			const newFrame = await carModel.create(carMock);
			expect(newFrame).to.be.deep.equal(carMock);
		});
	});

	describe('searching a Car', () => {
		it('successfully found', async () => {
			const framesFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
			expect(framesFound).to.be.deep.equal(carMock);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('searching all Cars', () => {
		it('successfully found', async () => {
			const framesFound = await carModel.read();
			expect(framesFound).to.be.deep.equal([carMock]);
		});
	});
});