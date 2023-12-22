import { Reader } from '../utils/read/Reader';
import { Writer } from '../utils/write/Writer';
import { IDeck } from './card/IDeck';

/**
 * 이 함수는 수정해선 안됩니다.
 */
export async function init(reader: Reader, writer: Writer) {
  const answer = await reader.question('Enter your player name: ');

  writer.write(`Hello, ${answer}!`);

  return createDeck();
}

/**
 * 아래 함수를 구현해주세요.
 * - Deck: 이미 랜덤하게 섞인 카드들의 모음
 */
export function createDeck(): IDeck {
  return null;
}
