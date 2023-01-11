import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock } from '../../mocks/carMock';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMock);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMock) 
			.onCall(1).resolves(null); 
		sinon.stub(carModel, 'read').resolves([carMock]) 
	})
	after(() => {
		sinon.restore()
	})
	describe('Create Car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMock);
		});

		it('Failure', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('ReadOne Car', () => {
		it('Success', async () => {
			const carCreated = await carService.readOne('62cf1fc6498565d94eba52cd');

			expect(carCreated).to.be.deep.equal(carMock);
		});

		it('Failure', async () => {
			try {
				await carService.readOne('62cf1fc6498565d94eba52cd');
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Read all Car', () => {
		it('Success', async () => {
			const carCreated = await carService.read();

			expect(carCreated).to.be.deep.equal([carMock]);
		});
	});
});