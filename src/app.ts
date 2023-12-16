import 'reflect-metadata';
import { autoInjectable } from 'tsyringe';
import { question } from './utils/CommandLine';

type CardType = 'heart' | 'diamond' | 'club' | 'spade';

type CardRank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';

class Card {
  constructor(
    private readonly _type: CardType,
    private readonly _rank: CardRank,
  ) {}

  get type() {
    return this._type;
  }

  get rank() {
    return this._rank;
  }

  get score() {
    if (['J', 'Q', 'K', 'A'].includes(this._rank)) {
      return 10;
    }

    return Number(this._rank);
  }
}

class Deck {
  private readonly cards: Card[] = [];

  constructor() {
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
        this.cards.push(new Card(cardType, cardRank));
      });
    });
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  pop() {
    return this.cards.pop();
  }
}

class Gamer {
  cards: Card[] = [];

  draw(card: Card) {
    this.cards.push(card);
  }

  get score() {
    return this.cards.reduce((acc, card) => acc + card.score, 0);
  }
}

class Dealer {
  cards: Card[] = [];

  draw(card: Card) {
    this.cards.push(card);
  }

  get score() {
    return this.cards.reduce((acc, card) => acc + card.score, 0);
  }
}

@autoInjectable()
class Game {
  private isDealerDraw: boolean = false;

  constructor(
    private readonly deck?: Deck,
    private readonly gamer?: Gamer,
    private readonly dealer?: Dealer,
  ) {}
  async start() {
    this.deck.shuffle();

    Array(2)
      .fill(0)
      .forEach(() => {
        this.gamer.draw(this.deck.pop());
        this.dealer.draw(this.deck.pop());
      });

    if (this.dealer.score <= 16) {
      this.dealer.draw(this.deck.pop());
      this.isDealerDraw = true;

      if (this.dealer.score > 21) {
        this.judgeWinner();

        return;
      }
    }

    while (await this.shouldDrawCardPrompt()) {
      this.gamer.draw(this.deck.pop());

      if (this.gamer.score > 21) {
        break;
      }
    }

    this.judgeWinner();
  }

  private async shouldDrawCardPrompt(): Promise<boolean> {
    const response = await question(
      `${
        this.isDealerDraw
          ? 'dealer 가 카드를 더 받았습니다.'
          : 'dealer 가 카드를 더 받지 않았습니다.'
      } 카드를 더 받으시겠습니까? (y/n)`,
    );
    return response.toLowerCase() === 'y';
  }

  private printWinner(winner: 'gamer' | 'dealer' | 'draw') {
    console.log('=======================================================');
    console.log('Game Over');
    console.log('=======================================================');
    console.log(`gamer's score is ${this.gamer.score}점`);
    console.log(
      `gamer's card is ${this.gamer.cards
        .map((card) => `${card.type}${card.rank}(${card.score}점)`)
        .join(', ')}`,
    );
    console.log('=======================================================');
    console.log(`dealer's score is ${this.dealer.score}점`);
    console.log(
      `dealer's card is ${this.dealer.cards
        .map((card) => `${card.type}${card.rank}(${card.score}점)`)
        .join(', ')}`,
    );
    console.log('=======================================================');

    if (winner === 'draw') {
      console.log('draw');
      return;
    }

    console.log(`winner is ${winner}`);
  }

  private judgeWinner() {
    if (this.gamer.score > 21) {
      this.printWinner('dealer');
      return;
    }

    if (this.dealer.score > 21) {
      this.printWinner('gamer');
      return;
    }

    if (this.gamer.score === this.dealer.score) {
      this.printWinner('draw');
      return;
    }

    if (this.gamer.score > this.dealer.score) {
      this.printWinner('gamer');
      return;
    }

    this.printWinner('dealer');
  }
}

void (async () => {
  /**
   * Controller 코드
   */
  const game = new Game();

  game.start();
})();
