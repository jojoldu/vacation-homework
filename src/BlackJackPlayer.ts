import { Card } from './BlackJackCard';

export interface Player {
  cards: Card[];
  draw(card: Card): void;
  score: number;
}

export class BlackJackPlayer implements Player {
  _cards: Card[] = [];

  draw(card: Card) {
    this._cards.push(card);
  }

  get cards() {
    return [...this._cards];
  }

  get score() {
    this.moveRankAceToEnd();

    return this._cards.reduce((acc, card) => {
      return acc + card.score(acc);
    }, 0);
  }

  private moveRankAceToEnd() {
    const nonAceCards = this._cards.filter((card) => card.rank === 'A');
    const aceCards = this._cards.filter((card) => card.rank !== 'A');

    this._cards = [...nonAceCards, ...aceCards];
  }
}
