import { play } from '../../src/game/play';
import { ScenarioReader } from './utils/ScenarioReader';
import { ScenarioWriter } from './utils/ScenarioWriter';
import { GameResult } from '../../src/utils/GameResult';

describe('play', () => {
  describe('기본 Spec', () => {
    it('GameResult가 반환된다.', async () => {
      const result = await play(new ScenarioReader([]), new ScenarioWriter());

      expect(result instanceof GameResult).toBeTruthy();
    });
  });
});
