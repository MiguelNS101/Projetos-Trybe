interface SimpleFighter {
  lifePoints: number;
  strength: number;

  attack(target: SimpleFighter): void;
  receiveDamage(damage: number): number;
}

export default SimpleFighter;
