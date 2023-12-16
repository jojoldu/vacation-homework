import { autoInjectable } from 'tsyringe';
import { Deck } from './Deck';
import { Player } from './Player';
import { GameView } from './GameView';

@autoInjectable()
export class Game {
  private isDealerDraw: boolean = false;

  constructor(
    private readonly deck?: Deck,
    private readonly gamer?: Player,
    private readonly dealer?: Player,
    private readonly gameView?: GameView,
  ) {}
  async start() {
    this.gameView.printGameRule();

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

    this.gameView.printDealerStatus(this.isDealerDraw);

    while (await this.gameView.shouldDrawCardPrompt(this.gamer.cards)) {
      this.gamer.draw(this.deck.pop());

      if (this.gamer.score > 21) {
        break;
      }
    }

    this.judgeWinner();
  }

  private judgeWinner() {
    if (this.gamer.score > 21) {
      this.gameView.printWinner(
        'dealer',
        this.gamer.score,
        this.dealer.score,
        this.gamer.cards,
        this.dealer.cards,
      );
      return;
    }

    if (this.dealer.score > 21) {
      this.gameView.printWinner(
        'gamer',
        this.gamer.score,
        this.dealer.score,
        this.gamer.cards,
        this.dealer.cards,
      );
      return;
    }

    if (this.gamer.score === this.dealer.score) {
      this.gameView.printWinner(
        'draw',
        this.gamer.score,
        this.dealer.score,
        this.gamer.cards,
        this.dealer.cards,
      );
      return;
    }

    if (this.gamer.score > this.dealer.score) {
      this.gameView.printWinner(
        'gamer',
        this.gamer.score,
        this.dealer.score,
        this.gamer.cards,
        this.dealer.cards,
      );
      return;
    }

    this.gameView.printWinner(
      'dealer',
      this.gamer.score,
      this.dealer.score,
      this.gamer.cards,
      this.dealer.cards,
    );
  }
}
