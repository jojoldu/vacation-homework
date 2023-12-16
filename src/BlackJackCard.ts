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

export interface Card {
  type: CardType;
  rank: CardRank;
  score(currentScore?: number): number;
}

export class BlackJackCard implements Card {
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

  // TODO: isAce 가 Player 에서 사용되고 있었는데 나중에 Card 클래스가 변경되면 없어질 수도 있으므로 private 으로 변경함. 근데 맞는진 잘 모르겠음.
  private get isAce() {
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
