import { Reader } from '../utils/read/Reader';
import { Writer } from '../utils/write/Writer';
import { init, play } from './Game';

/**
 * 아래 함수는 수정해선 안됩니다.
 */
export async function startGame(reader: Reader, writer: Writer) {
  await init(reader, writer);
  const result = await play(reader, writer);
  reader.close();

  return result;
}
