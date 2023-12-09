import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

void (async () => {
  const answer = await rl.question('Enter your name: ');

  console.log(`Hello, ${answer}!`);

  rl.close();
})();




