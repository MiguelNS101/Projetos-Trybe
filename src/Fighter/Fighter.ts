import Energy from '../Energy';

interface Fighter {
  lifePoints: number;
  strength: number;
  defense: number;
  energy?: Energy;

  attack(target: Fighter): void;
  special(enemy: Fighter): void;
  levelUp(): void;
  receiveDamage(damage: number): number;
}

export default Fighter;
