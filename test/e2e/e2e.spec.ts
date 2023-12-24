import { ScenarioDeck } from './utils/ScenarioDeck';
import { Card } from '../../src/game/card/Card';
import { Suit } from '../../src/game/card/Suit';
import { Rank } from '../../src/game/card/Rank';
import { ScenarioReader } from './utils/ScenarioReader';
import { ScenarioWriter } from './utils/ScenarioWriter';
import { UserType } from '../../src/utils/UserType';
import { startGame } from '../../src/game/startGame';
import * as cd from '../../src/game/deck/createDeck';

jest.mock('../../src/game/deck/createDeck', () => {
  return {
    createDeck: jest.fn(),
  };
});

describe('블랙잭 게임', () => {
  let writer: ScenarioWriter;
  let deck: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    writer = new ScenarioWriter();
    deck = cd.createDeck as jest.Mock;
  });

  describe('플레이어가 승리하려면', () => {
    it('플레이어 점수가 딜러보다 높아야 한다.', async () => {
      deck.mockReturnValue(
        new ScenarioDeck([
          new Card(Suit.Diamonds, Rank.King), // 플레이어
          new Card(Suit.Hearts, Rank.Queen), // 플레이어
          new Card(Suit.Clubs, Rank.Seven), // 딜러
          new Card(Suit.Clubs, Rank.King), // 딜러
        ]),
      );

      await startGame(new ScenarioReader(['향로', 'no']), writer);

      expect(writer.pop).toBe(
        `패자는 ${UserType.DEALER} 이며 카드의 총합은 17 입니다.`,
      );
      expect(writer.pop).toBe(
        `승자는 ${UserType.PLAYER} 이며 카드의 총합은 20 입니다.`,
      );
    });

    it('딜러의 카드 총합이 21을 초과하면 된다.', async () => {
      deck.mockReturnValue(
        new ScenarioDeck([
          new Card(Suit.Diamonds, Rank.Seven), // 플레이어
          new Card(Suit.Hearts, Rank.Queen), // 플레이어
          new Card(Suit.Clubs, Rank.Eight), // 딜러
          new Card(Suit.Clubs, Rank.Five), // 딜러
          new Card(Suit.Clubs, Rank.King), // 딜러
        ]),
      );

      await startGame(new ScenarioReader(['향로', 'no']), writer);

      expect(writer.pop).toBe(
        `패자는 ${UserType.DEALER} 이며 카드의 총합은 0 입니다.`,
      );
      expect(writer.pop).toBe(
        `승자는 ${UserType.PLAYER} 이며 카드의 총합은 17 입니다.`,
      );
    });
  });

  describe('딜러가 승리하려면', () => {
    it('딜러 점수가 플레이어보다 높아야 한다.', async () => {
      deck.mockReturnValue(
        new ScenarioDeck([
          new Card(Suit.Clubs, Rank.Seven), // 플레이어
          new Card(Suit.Clubs, Rank.King), // 플레이어
          new Card(Suit.Diamonds, Rank.King), // 딜러
          new Card(Suit.Hearts, Rank.Queen),
        ]),
      );

      await startGame(new ScenarioReader(['향로', 'no']), writer);

      expect(writer.pop).toBe(
        `패자는 ${UserType.PLAYER} 이며 카드의 총합은 17 입니다.`,
      );
      expect(writer.pop).toBe(
        `승자는 ${UserType.DEALER} 이며 카드의 총합은 20 입니다.`,
      );
    });

    it('플레이어의 카드 총합이 21을 초과하면 된다.', async () => {
      deck.mockReturnValue(
        new ScenarioDeck([
          new Card(Suit.Diamonds, Rank.Seven), // 플레이어
          new Card(Suit.Hearts, Rank.Queen), // 플레이어
          new Card(Suit.Clubs, Rank.Eight), // 딜러
          new Card(Suit.Clubs, Rank.King), // 딜러
          new Card(Suit.Hearts, Rank.Nine), // 플레이어
        ]),
      );

      await startGame(new ScenarioReader(['향로', 'yes', 'no']), writer);

      expect(writer.pop).toBe(
        `패자는 ${UserType.PLAYER} 이며 카드의 총합은 0 입니다.`,
      );
      expect(writer.pop).toBe(
        `승자는 ${UserType.DEALER} 이며 카드의 총합은 18 입니다.`,
      );
    });
  });

  describe('A의 점수 방식', () => {
    it('A가 4개면 14 (11+1+1+1) 가 되어야한다.', async () => {
      deck.mockReturnValue(
        new ScenarioDeck([
          new Card(Suit.Diamonds, Rank.Ace), // 플레이어
          new Card(Suit.Hearts, Rank.Ace), // 플레이어
          new Card(Suit.Clubs, Rank.Two), // 딜러
          new Card(Suit.Clubs, Rank.Three), // 딜러
          new Card(Suit.Clubs, Rank.Ace), // 플레이어
          new Card(Suit.Spades, Rank.Ace), // 플레이어
          new Card(Suit.Clubs, Rank.Four), // 딜러
        ]),
      );

      await startGame(new ScenarioReader(['향로', 'yes', 'yes', 'no']), writer);

      expect(writer.pop).toBe(
        `패자는 ${UserType.DEALER} 이며 카드의 총합은 9 입니다.`,
      );
      expect(writer.pop).toBe(
        `승자는 ${UserType.PLAYER} 이며 카드의 총합은 14 입니다.`,
      );
    });
  });
});
