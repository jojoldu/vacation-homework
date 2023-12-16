import { CommandLineReader } from './utils/read/CommandLineReader';
import { ConsoleWriter } from './utils/write/ConsoleWriter';
import { startGame } from './game/startGame';
import 'reflect-metadata';
import { Game } from './Game';

void (async () => {
  const reader = new CommandLineReader();
  const writer = new ConsoleWriter();
  /**
   * Controller 코드
   */
  const game = new Game();

  await startGame(reader, writer);
  await game.start();
})();
