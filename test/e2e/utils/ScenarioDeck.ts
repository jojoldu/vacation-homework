import { Card } from '../../../src/game/card/Card';
import { IDeck } from '../../../src/game/deck/IDeck';

export class ScenarioDeck implements IDeck {
  private readonly _cards: Card[];
  constructor(cards: Card[]) {
    this._cards = cards;
  }

  drawCard(): Card {
    return this._cards.shift();
  }

  remainCardCount(): number {
    return this._cards.length;
  }
}
