import { Card } from './Card';

export interface IDeck {
  // 중복되지 않는 랜덤한 카드 뽑기
  drawCard(): Card | undefined;

  remainCardCount(): number;
}
