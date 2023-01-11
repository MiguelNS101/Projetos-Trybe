import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Mage extends Archetype {
  private static _countMage = 0;
  private _energyType: EnergyType;

  constructor(name: string) {
    super(name);
    Mage._countMage += 1;
    this._energyType = 'mana';
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return this._countMage;
  }
}

export default Mage;
