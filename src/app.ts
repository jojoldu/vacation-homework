import 'reflect-metadata';
import { Game } from './Game';

void (async () => {
  /**
   * Controller 코드
   */
  const game = new Game();

  game.start();
})();
