import 'reflect-metadata';
import { Game } from './Game';

void (async () => {
  const game = new Game();

  game.start();
})();
