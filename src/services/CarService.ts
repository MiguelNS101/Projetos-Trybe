import { ICar, CarZodSchema } from '../interfaces/ICar';
import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';

export default class CarService implements IModel<ICar> { 
  private _car:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:ICar):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }

  public async read():Promise<ICar[]> {
    const car = await this._car.read();
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async readOne(_id:string):Promise<ICar> {
    const frame = await this._car.readOne(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  public async update(_id:string, car: ICar):Promise<ICar> {
    await this.readOne(_id);
    const parsed = CarZodSchema.safeParse(car);
    if (!parsed.success) throw parsed.error;
    const updateCar = await this._car.update(_id, car) as ICar;
    return updateCar;
  }

  public async delete(_id: string): Promise<ICar | null> {
    await this.readOne(_id);
    const remove = await this._car.delete(_id);
    return remove;
  }
}
