export enum User {
  PLAYER = '플레이어',
  DEALDER = '딜러',
}

export class UserResult {
  public static EMPTY = new UserResult(User.PLAYER, 0);
  private readonly _name: User;
  private readonly _rating: number;

  constructor(name: User, rating: number) {
    this._name = name;
    this._rating = rating;
  }

  get name(): User {
    return this._name;
  }

  get rating(): number {
    return this._rating;
  }
}
