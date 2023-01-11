export type EnergyType = 'stamina' | 'mana';

interface Energy {
  amount: number;
  type_: EnergyType;
}

export default Energy;
