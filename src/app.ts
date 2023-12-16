import 'reflect-metadata';
import { container } from 'tsyringe';
import { BlackJackDeck } from './BlackJackDeck';
import { BlackJackGame } from './BlackJackGame';
import { BlackJackPlayer, Player } from './BlackJackPlayer';
import { BlackJackView, GameView } from './BlackJackView';

void (async () => {
  container.register('BlackJackDeck', { useClass: BlackJackDeck });
  container.register<Player>('BlackJackPlayer', { useClass: BlackJackPlayer });
  container.register<GameView>('BlackJackView', { useClass: BlackJackView });

  const game = container.resolve(BlackJackGame);

  game.start();
})();
