import { Writer } from './Writer';

export class ConsoleWriter implements Writer {
  write(message: string): void {
    console.log(message);
  }
}
