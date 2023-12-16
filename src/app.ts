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
  private aceScore: number = 0;

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

  get isAce() {
    return this._rank === 'A';
  }

  private getAceScore(currentScore: number) {
    if (currentScore + 11 > 21) {
      return 1;
    }

    return 11;
  }

  score(currentScore?: number) {
    if (['J', 'Q', 'K'].includes(this._rank)) {
      return 10;
    }

    if (this.isAce) {
      if (!currentScore) {
        return this.aceScore;
      }

      this.aceScore = this.getAceScore(currentScore);
      return this.aceScore;
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

class Player {
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

@autoInjectable()
class Game {
  private isDealerDraw: boolean = false;

  constructor(
    private readonly deck?: Deck,
    private readonly gamer?: Player,
    private readonly dealer?: Player,
  ) {}
  async start() {
    this.printGameRule();

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

    console.log(
      this.isDealerDraw
        ? 'dealer 가 카드를 더 받았습니다(16점 이하).'
        : 'dealer 가 카드를 더 받지 않았습니다(17점 이상).',
    );

    while (await this.shouldDrawCardPrompt()) {
      this.gamer.draw(this.deck.pop());

      if (this.gamer.score > 21) {
        break;
      }
    }

    this.judgeWinner();
  }

  private printGameRule() {
    console.log('=======================================================');
    console.log('Game Start');

    console.log('=======================================================');
    console.log('게임 규칙을 설명합니다.');
    console.log(
      '- Gamer와 Dealer는 순차적으로 카드를 한번씩 번걸아가며 뽑아서 각자 2개의 카드를 소지합니다.',
    );
    console.log('- 21점을 넘지 않으면서 21점에 가깝게 만드세요.');
    console.log('- J, Q, K는 10점으로 계산됩니다.');
    console.log(
      '- A는 1점 또는 11점으로 계산될 수 있으며, 플레이어의 점수 합계가 21을 초과하지 않는 범위에서 최대한 높은 값을 가집니다.',
    );
    console.log(
      '- Dealer는 2카드의 합계 점수가 16점 이하이면 반드시 1장을 추가로 뽑고, 17점 이상이면 추가할 수 없습니다..',
    );
    console.log(
      '- Gamer는 21을 초과하지 않는 동안에는 계속해서 카드를 뽑을 수 있습니다.',
    );
    console.log('=======================================================');
  }

  private getPlayerCards(cards: Card[]) {
    return cards
      .map((card) => `${card.type}${card.rank}(${card.score()}점)`)
      .join(', ');
  }

  private async shouldDrawCardPrompt(): Promise<boolean> {
    console.log(
      `현재 사용자의 카드는 ${this.getPlayerCards(this.gamer.cards)} 입니다.`,
    );

    const response = await question(`카드를 더 받으시겠습니까? (y/n)`);
    return response.toLowerCase() === 'y';
  }

  private printWinner(winner: 'gamer' | 'dealer' | 'draw') {
    console.log('=======================================================');
    console.log('Game Over');
    console.log('=======================================================');
    console.log(`gamer's score is ${this.gamer.score}점`);
    console.log(`gamer's card is ${this.getPlayerCards(this.gamer.cards)}`);
    console.log('=======================================================');
    console.log(`dealer's score is ${this.dealer.score}점`);
    console.log(`dealer's card is ${this.getPlayerCards(this.dealer.cards)}`);
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
