import { closeQuestion, question } from './utils/CommandLine';

void (async () => {
  const answer = await question('Enter your name: ');

  console.log(`Hello, ${answer}!`);

  closeQuestion();
})();




