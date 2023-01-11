import { NextFunction, Request, Response } from 'express';
import Product from '../interfaces/product.interface';

const properties = ['name', 'amount'];

function validateProperties(product: Product): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(product, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (typeof value !== 'string') {
      return [false, property];
    }
  }
  return [true, null];
}

function validateAmount(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (value.length < 3) {
      return [false, property];
    }
  }
  return [true, null];
}

function productRequired(req: Request, res: Response, next: NextFunction) {
  const prod: Product = req.body;

  let [valid, property] = validateProperties(prod);

  if (!valid) {
    return res.status(400).json({ message: `"${property}" is required` });
  }

  [valid, property] = validateValues(prod);

  if (!valid) {
    return res.status(422).json({ message: `"${property}" must be a string` });
  }

  [valid, property] = validateAmount(prod);

  if (!valid) {
    return res.status(422).json(
      { message: `"${property}" length must be at least 3 characters long` },
    );
  }

  next();
}

export default productRequired;