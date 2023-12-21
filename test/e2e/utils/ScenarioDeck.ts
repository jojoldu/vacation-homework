import { Card } from '../../../src/game/card/Card';
import { IDeck } from '../../../src/game/card/IDeck';

export class ScenarioDeck implements IDeck {
  private readonly _cards: Card[];
  constructor(cards: Card[]) {
    this._cards = cards;
  }

  drawCard(): Card {
    return this._cards.pop();
  }

  remainCardCount(): number {
    return this._cards.length;
  }
}
