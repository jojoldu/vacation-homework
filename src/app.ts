import { CommandLineReader } from './utils/read/CommandLineReader';
import { ConsoleWriter } from './utils/write/ConsoleWriter';
import { startGame } from './game/startGame';

void (async () => {
  const reader = new CommandLineReader();
  const writer = new ConsoleWriter();

  const result = await startGame(reader, writer);
  writer.write(
    `승자는 ${result.winnerType()} 이며 카드의 총합은 ${result.winnerRating()}`,
  );
  writer.write(
    `패자는 ${result.looserType()} 이며 카드의 총합은 ${result.looserRating()}`,
  );
})();
