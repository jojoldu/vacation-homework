export type CardType = 'heart' | 'diamond' | 'club' | 'spade';
export type CardRank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';

export class Card {
  private aceScore: number = 0;

  constructor(
    private readonly _type: CardType,
    private readonly _rank: CardRank,
  ) {}

  get type() {
    return this._type;
  }

  get rank() {
    return this._rank;
  }

  get isAce() {
    return this._rank === 'A';
  }

  private getAceScore(currentScore: number) {
    if (currentScore + 11 > 21) {
      return 1;
    }

    return 11;
  }

  score(currentScore?: number) {
    if (['J', 'Q', 'K'].includes(this._rank)) {
      return 10;
    }

    if (this.isAce) {
      if (!currentScore) {
        return this.aceScore;
      }

      this.aceScore = this.getAceScore(currentScore);
      return this.aceScore;
    }

    return Number(this._rank);
  }
}
