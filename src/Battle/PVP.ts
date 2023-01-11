import Fighter from '../Fighter';
import Battle from './Battle';

class PVP extends Battle {
  private _char1: Fighter;
  private _char2: Fighter;
  constructor(character1: Fighter, character2: Fighter) {
    super(character1);
    this._char1 = character1;
    this._char2 = character2;
  }

  fight(): number {
    while (this._char1.lifePoints > 0 && this._char2.lifePoints > 0) {
      this._char1.attack(this._char2);
      this._char2.attack(this._char1);
    }
    return super.fight();
  }
}

export default PVP;
