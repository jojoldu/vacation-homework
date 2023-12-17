import { UserResult } from './User';

export class GameResult {
  public static EMPTY = new GameResult(UserResult.EMPTY, UserResult.EMPTY);

  private readonly _winner: UserResult;
  private readonly _looser: UserResult;

  constructor(winner: UserResult, looser: UserResult) {
    this._winner = winner;
    this._looser = looser;
  }
  get looser(): UserResult {
    return this._looser;
  }
  get winner(): UserResult {
    return this._winner;
  }
}
