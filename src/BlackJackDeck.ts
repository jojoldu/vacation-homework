import { BlackJackCard, Card, CardRank, CardType } from './BlackJackCard';

export interface Deck {
  init(): void;
  pop(): Card;
}

export class BlackJackDeck implements Deck {
  private cards: Card[] = [];

  /**
   * TODO:
   * 항상 붙어 다니는 메서드들은 init 하나에서 처리를 해주는 게 좋을지?
   * 테스트 코드 작성할 때 분리해서 테스트 작성을 못하게 되는데 이게 맞는 건지?
   */
  init() {
    this.cards = [];
    this.generate();
    this.shuffle();
  }

  private generate() {
    const cardTypes: CardType[] = ['heart', 'diamond', 'club', 'spade'];
    const cardRanks: CardRank[] = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A',
    ];

    cardTypes.forEach((cardType) => {
      cardRanks.forEach((cardRank) => {
        this.cards.push(new BlackJackCard(cardType, cardRank));
      });
    });
  }

  private shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  pop() {
    return this.cards.pop();
  }
}
