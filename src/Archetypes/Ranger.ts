import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Ranger extends Archetype {
  private static _countRanger = 0;
  private _energyType: EnergyType;

  constructor(name: string) {
    super(name);
    Ranger._countRanger += 1;
    this._energyType = 'stamina';
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return this._countRanger;
  }
}

export default Ranger;
