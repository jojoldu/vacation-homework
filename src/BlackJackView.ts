import { BlackJackCard, Card } from './BlackJackCard';
import { question } from './utils/CommandLine';

export interface GameView {
  printGameRule(): void;
  printDealerStatus(isDealerDraw: boolean): void;
  printWinner(
    winner: 'gamer' | 'dealer' | 'draw',
    gamerScore: number,
    dealerScore: number,
    gamerCards: Card[],
    dealerCards: Card[],
  ): void;
  shouldDrawCardPrompt(cards: Card[]): Promise<boolean>;
  printRestartPrompt(): Promise<boolean>;
  printTerminateMessage(): void;
}

export class BlackJackView implements GameView {
  printGameRule() {
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

  printDealerStatus(isDealerDraw: boolean) {
    console.log(
      isDealerDraw
        ? 'dealer 가 카드를 더 받았습니다(16점 이하).'
        : 'dealer 가 카드를 더 받지 않았습니다(17점 이상).',
    );
  }

  printWinner(
    winner: 'gamer' | 'dealer' | 'draw',
    gamerScore: number,
    dealerScore: number,
    gamerCards: BlackJackCard[],
    dealerCards: BlackJackCard[],
  ) {
    console.log('Game Over');
    console.log('=======================================================');
    console.log(`gamer's score is ${gamerScore}점`);
    console.log(`gamer's card is ${this.getPlayerCards(gamerCards)}`);
    console.log('=======================================================');
    console.log(`dealer's score is ${dealerScore}점`);
    console.log(`dealer's card is ${this.getPlayerCards(dealerCards)}`);
    console.log('=======================================================');

    if (winner === 'draw') {
      console.log('draw');
      console.log('=======================================================');
      return;
    }

    console.log(`winner is ${winner}`);
    console.log('=======================================================');
  }

  async shouldDrawCardPrompt(cards: BlackJackCard[]) {
    console.log(`현재 사용자의 카드는 ${this.getPlayerCards(cards)} 입니다.`);

    const response = await question(`카드를 더 받으시겠습니까? (y/n)`);
    return response.toLowerCase() === 'y';
  }

  async printRestartPrompt() {
    const response = await question(`게임을 새로 시작하시겠습니까? (y/n)`);
    return response.toLowerCase() === 'y';
  }

  printTerminateMessage() {
    console.log('게임을 종료합니다.');
  }

  private getPlayerCards(cards: Card[]) {
    return cards
      .map((card) => `${card.type}${card.rank}(${card.score}점)`)
      .join(', ');
  }
}
