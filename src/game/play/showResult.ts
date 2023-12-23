import { Writer } from '../../utils/write/Writer';
import { IGameResult } from '../../utils/IGameResult';

export function showResult(writer: Writer, result: IGameResult) {
  writer.write(
    `승자는 ${result.winnerType()} 이며 카드의 총합은 ${result.winnerRating()} 입니다.`,
  );
  writer.write(
    `패자는 ${result.looserType()} 이며 카드의 총합은 ${result.looserRating()} 입니다.`,
  );
}
