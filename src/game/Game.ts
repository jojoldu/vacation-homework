import { closeQuestion, IReadLine, question } from '../utils/CommandLine';

export async function init(readLine: IReadLine) {
  const answer = await question('Enter your name: ');

  console.log(`Hello, ${answer}!`);

  closeQuestion();
}

export function play(readLine: IReadLine) {}

export function end(readLine: IReadLine) {}
