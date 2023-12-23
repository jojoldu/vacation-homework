import { Reader } from '../utils/read/Reader';
import { Writer } from '../utils/write/Writer';
import { play } from './play/play';
import { init } from './play/init';
import { showResult } from './play/showResult';

/**
 * 아래 함수는 수정해선 안됩니다.
 */
export async function startGame(reader: Reader, writer: Writer): Promise<void> {
  const deck = await init(reader, writer);
  const result = await play(reader, writer, deck);
  showResult(writer, result);

  reader.close();
}
