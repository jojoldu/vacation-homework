import { Reader } from '../utils/read/Reader';
import { Writer } from '../utils/write/Writer';
import { GameResult } from '../utils/GameResult';

export async function init(reader: Reader, writer: Writer) {
  const answer = await reader.question('Enter your player name: ');

  writer.write(`Hello, ${answer}!`);
}

export async function play(
  reader: Reader,
  writer: Writer,
): Promise<GameResult> {
  /**
   * 게임 실행에 관한 모든 로직 구현
   *
   */

  return GameResult.EMPTY; // 실제 결과로 교체해야합니다.
}
