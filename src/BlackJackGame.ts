import { inject, injectable } from 'tsyringe';
import { Deck } from './BlackJackDeck';
import { Player } from './BlackJackPlayer';
import { GameView } from './BlackJackView';

@injectable()
export class BlackJackGame {
  private isDealerDraw: boolean = false;

  constructor(
    @inject('BlackJackDeck') private readonly deck: Deck,
    @inject('BlackJackPlayer') private readonly gamer: Player,
    @inject('BlackJackPlayer') private readonly dealer: Player,
    @inject('BlackJackView') private readonly gameView: GameView,
  ) {}
  private terminate() {
    this.gameView.printTerminateMessage();
    process.exit(0);
  }

  async restart() {
    return await this.start();
  }

  async start() {
    this.gameView.printGameRule();

    this.deck.init();
    this.gamer.init();
    this.dealer.init();

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

        if (await this.gameView.printRestartPrompt()) {
          await this.restart();
          return;
        }

        this.terminate();

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

    if (await this.gameView.printRestartPrompt()) {
      await this.restart();
      return;
    }

    this.terminate();
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
