import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Warrior extends Archetype {
  private static _countWarrior = 0;
  private _energyType: EnergyType;

  constructor(name: string) {
    super(name);
    Warrior._countWarrior += 1;
    this._energyType = 'stamina';
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return this._countWarrior;
  }
}

export default Warrior;
