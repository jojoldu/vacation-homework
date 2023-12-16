import { Card } from './Card';

export class Player {
  cards: Card[] = [];

  draw(card: Card) {
    this.cards.push(card);
  }

  get score() {
    this.moveRankAceToEnd();

    return this.cards.reduce((acc, card) => {
      return acc + card.score(acc);
    }, 0);
  }

  private moveRankAceToEnd() {
    const nonAceCards = this.cards.filter((card) => !card.isAce);
    const aceCards = this.cards.filter((card) => card.isAce);

    this.cards = [...nonAceCards, ...aceCards];
  }
}
