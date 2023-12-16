import { CommandLineReader } from './utils/read/CommandLineReader';
import { ConsoleWriter } from './utils/write/ConsoleWriter';
import { startGame } from './game/startGame';
import 'reflect-metadata';

void (async () => {
  const reader = new CommandLineReader();
  const writer = new ConsoleWriter();
  /**
   * Controller 코드
   */
  const card = new Card();
  const deck = new Deck(card);
  const gamer = new Gamer();
  const dealer = new Dealer();
  const game = new Game(deck, gamer, dealer);

  await startGame(reader, writer);
  game.start();
})();
