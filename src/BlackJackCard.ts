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
  score: number;
  setScore: (currentScore?: number) => void;
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
  // 내가 생각한 답변: isAce 가 외부에서 사용되는 건 Card 의 관심사가 외부에 있다는 것을 의미함. isAce 를 사용하는 케이스는 내부에서만 존재해야 할 것 같음.
  private get isAce() {
    return this._rank === 'A';
  }

  private getAceScore(currentScore: number) {
    if (currentScore + 11 > 21) {
      return 1;
    }

    return 11;
  }

  setScore(currentScore?: number) {
    if (this.isAce && currentScore) {
      this.aceScore = this.getAceScore(currentScore);
    }
  }

  get score() {
    if (['J', 'Q', 'K'].includes(this._rank)) {
      return 10;
    }

    if (this.isAce) {
      if (this.aceScore === 0) {
        throw new Error('Ace score is not set');
      }

      return this.aceScore;
    }

    return Number(this._rank);
  }
}
