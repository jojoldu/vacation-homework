import { Reader } from '../utils/read/Reader';
import { Writer } from '../utils/write/Writer';
import { play } from './play';
import { IGameResult } from '../utils/result/IGameResult';
import { init } from './init';

/**
 * 아래 함수는 수정해선 안됩니다.
 */
export async function startGame(
  reader: Reader,
  writer: Writer,
): Promise<IGameResult> {
  const deck = await init(reader, writer);
  const result = await play(reader, writer, deck);
  reader.close();

  return result;
}
