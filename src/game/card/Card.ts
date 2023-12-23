import { Suit } from './Suit';
import { Rank } from './Rank';

export class Card {
  constructor(
    private _suit: Suit,
    private _rank: Rank,
  ) {}

  get suit(): Suit {
    return this._suit;
  }

  get rank(): Rank {
    return this._rank;
  }
}
