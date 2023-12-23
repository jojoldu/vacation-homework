import { UserType } from './UserType';

export interface IGameResult {
  winnerType(): UserType;
  winnerRating(): number;

  looserType(): UserType;
  looserRating(): number;
}
