import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { Reader } from './Reader';

export class CommandLineReader implements Reader {
  private readonly readLine = readline.createInterface({ input, output });

  async question(query: string): Promise<string> {
    return this.readLine.question(query);
  }
  close(): void {
    this.readLine.close();
  }
}
