import 'reflect-metadata';

void (async () => {
  /**
   * Controller 코드
   */
  const card = new Card();
  const deck = new Deck(card);
  const gamer = new Gamer();
  const dealer = new Dealer();
  const game = new Game(deck, gamer, dealer);

  game.start();
})();
