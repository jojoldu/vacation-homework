import { play } from '../../src/game/play';
import { ScenarioReader } from './utils/ScenarioReader';
import { ScenarioWriter } from './utils/ScenarioWriter';
import { GameResult } from '../../src/utils/GameResult';
import { Card, Rank, Suit } from '../../src/game/card/Card';
import { ScenarioDeck } from './utils/ScenarioDeck';
import { UserType } from '../../src/utils/result/UserType';
import { startGame } from '../../src/game/startGame';

describe('블랙잭 게임', () => {
  describe('기본 Spec', () => {
    it('GameResult가 반환된다.', async () => {
      const result = await startGame(
        new ScenarioReader([]),
        new ScenarioWriter(),
      );

      expect(result instanceof GameResult).toBeTruthy();
    });
  });

  describe('플레이어의 승리', () => {
    it('플레이어가 딜러보다 총합이 크면', async () => {
      const deck = new ScenarioDeck([
        new Card(Suit.Clubs, Rank.Eight), // 딜러
        new Card(Suit.Clubs, Rank.King), // 딜러
        new Card(Suit.Diamonds, Rank.King), // 플레이어
        new Card(Suit.Hearts, Rank.Queen), // 플레이어
      ]);

      const result = await play(
        new ScenarioReader([]),
        new ScenarioWriter(),
        deck,
      );

      expect(result.winnerType()).toBe(UserType.PLAYER);
      expect(result.winnerRating()).toBe(20);
    });

    it('딜러가 21을 초과하면', async () => {
      const deck = new ScenarioDeck([
        new Card(Suit.Clubs, Rank.Eight), // 딜러
        new Card(Suit.Clubs, Rank.Five), // 딜러
        new Card(Suit.Clubs, Rank.King), // 딜러
        new Card(Suit.Diamonds, Rank.Seven), // 플레이어
        new Card(Suit.Hearts, Rank.Queen), // 플레이어
      ]);

      const result = await play(
        new ScenarioReader([]),
        new ScenarioWriter(),
        deck,
      );

      expect(result.winnerType()).toBe(UserType.PLAYER);
      expect(result.winnerRating()).toBe(17);
    });
  });
});
