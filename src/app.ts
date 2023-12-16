import { CommandLineReader } from './utils/read/CommandLineReader';
import { ConsoleWriter } from './utils/write/ConsoleWriter';
import { startGame } from './game/startGame';
import { container } from 'tsyringe';
import { BlackJackDeck } from './BlackJackDeck';
import { BlackJackGame } from './BlackJackGame';
import { BlackJackPlayer, Player } from './BlackJackPlayer';
import { BlackJackView, GameView } from './BlackJackView';

import 'reflect-metadata';

void (async () => {
  const reader = new CommandLineReader();
  const writer = new ConsoleWriter();
  // container.register<Card>('BlackJackCard', { useClass: BlackJackCard });
  container.register('BlackJackDeck', { useClass: BlackJackDeck });
  container.register<Player>('BlackJackPlayer', { useClass: BlackJackPlayer });
  container.register<GameView>('BlackJackView', { useClass: BlackJackView });

  const game = container.resolve(BlackJackGame);

  await startGame(reader, writer);
  await game.start();
})();
