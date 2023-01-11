import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Necromancer extends Archetype {
  private static _countNecromancer = 0;
  private _energyType: EnergyType;

  constructor(name: string) {
    super(name);
    Necromancer._countNecromancer += 1;
    this._energyType = 'mana';
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return this._countNecromancer;
  }
}

export default Necromancer;
