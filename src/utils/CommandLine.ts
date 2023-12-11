import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export interface IReadLine {
  question(query: string): Promise<string>;
  close(): void;
}

const commandLine = readline.createInterface({ input, output });

export async function question(str: string, rl? : IReadLine) {
  const inputReader = rl ?? commandLine;
  return inputReader.question(str);
}

export function closeQuestion(rl? : IReadLine) {
  const inputReader = rl ?? commandLine;
  return inputReader.close();
}
