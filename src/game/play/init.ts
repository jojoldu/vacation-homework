import { Reader } from '../../utils/read/Reader';
import { Writer } from '../../utils/write/Writer';
import { createDeck } from '../deck/createDeck';

/**
 * 이 함수는 수정해선 안됩니다.
 */
export async function init(reader: Reader, writer: Writer) {
  // 사용자의 입력을 받는 예시
  const answer = await reader.question('Enter your player name: ');

  // 시스템 출력을 하는 예시
  writer.write(`Hello, Player: ${answer}!`);

  return createDeck();
}
