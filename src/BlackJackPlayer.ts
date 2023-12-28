import { Card } from './BlackJackCard';

export interface Player {
  init(): void;
  cards: Card[];
  draw(card: Card): void;
  score: number;
}

export class BlackJackPlayer implements Player {
  _cards: Card[] = [];

  init() {
    this._cards = [];
  }

  draw(card: Card) {
    /**
     * TODO: draw 당시에 동적으로 score 를 계산해서 넣어줘야 되는데 draw 에 이 로직이 들어가도 되는지?
     */
    card.setScore(this.score);
    this._cards.push(card);
  }

  get cards() {
    return [...this._cards];
  }

  get score() {
    return this._cards.reduce((acc, card) => acc + card.score, 0);
  }
}
