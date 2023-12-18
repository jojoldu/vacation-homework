import { CommandLineReader } from './utils/read/CommandLineReader';
import { ConsoleWriter } from './utils/write/ConsoleWriter';
import { play } from './game/play';

void (async () => {
  const reader = new CommandLineReader();
  const writer = new ConsoleWriter();

  const result = await play(reader, writer);
  writer.write(
    `승자는 ${result.winner.name} 이며 카드의 총합은 ${result.winner.rating}`,
  );
  writer.write(
    `패자는 ${result.looser.name} 이며 카드의 총합은 ${result.looser.rating}`,
  );
})();
