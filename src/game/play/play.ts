import { Reader } from '../../utils/read/Reader';
import { Writer } from '../../utils/write/Writer';
import { IDeck } from '../deck/IDeck';
import { IGameResult } from '../../utils/IGameResult';

/**
 * 아래 함수를 구현해주세요.
 */
export async function play(
  reader: Reader,
  writer: Writer,
  deck: IDeck,
): Promise<IGameResult> {
  return Promise.resolve(null);
}
