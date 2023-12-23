import { CommandLineReader } from './utils/read/CommandLineReader';
import { ConsoleWriter } from './utils/write/ConsoleWriter';
import { startGame } from './game/startGame';

void (async () => {
  const reader = new CommandLineReader();
  const writer = new ConsoleWriter();

  await startGame(reader, writer);
})();
