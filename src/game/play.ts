import { Reader } from '../utils/read/Reader';
import { Writer } from '../utils/write/Writer';
import { init, start } from './Game';

/**
 * 아래 함수는 수정해선 안됩니다.
 */
export async function play(reader: Reader, writer: Writer) {
  await init(reader, writer);
  const result = await start(reader, writer);
  reader.close();

  return result;
}
