import { Request, Response } from 'express';
import { IModel } from '../interfaces/IModel';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IModel<ICar>) { }

  public async create(
    req: Request & { body: ICar }, 
    res: Response<ICar>,
  ) {
    const { model, year, color, buyValue, doorsQty, seatsQty } = req.body;
    const car = { model, year, color, buyValue, doorsQty, seatsQty };
    const results = await this._service.create(car);
    return res.status(201).json(results);
  }

  public async read(
    req: Request,
    res: Response<ICar[]>,
  ) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(
    req: Request,
    res: Response<ICar>,
  ) {
    const result = await this._service.readOne(req.params.id) as ICar;
    return res.status(200).json(result);
  }

  public async update(
    req: Request & { body: ICar }, 
    res: Response<ICar>,
  ) {
    const result = await this._service.update(req.params.id, req.body) as ICar;
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result);
  }
}