import readline from 'readline';

// ES6 - generate an array of numbers : https://stackoverflow.com/a/39924913
const numberArrayGenerator = (min, max) => {
  return [...Array(max + 1).keys()].slice(min);
};

const answerGenerator = array => {
  return array.slice(0, 3).join("");
};

const check = (answer, inputText) => {
  let strike = 0;
  let ball = 0;
  const answerSet = new Set(answer);

  for (let i = 0; i < answer.length; i += 1) {
    if (inputText[i] === answer[i]) strike += 1;
    else if (answerSet.has(inputText[i])) ball += 1;
  }

  return { strike, ball };
};

const prettifyOutput = (strike, ball) => {
  if (strike === 0 && ball === 0) return "=> You Know Nothing, Jon Snow!\n";

  if (strike === 0) return `=> ${ball} Ball!\n`;

  if (ball === 0) return `=> ${strike} Strike!\n`;

  if (strike === 3) return "Strike Out!";

  return `=> ${strike} Strike, ${ball} Ball!\n`;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const IO = (answer, count = 1) => {
  rl.question(`숫자를 입력해주십시오. (${count}회차)\n`, inputText => {
    const { strike, ball } = check(answer, inputText);

    console.log(prettifyOutput(strike, ball));

    if (strike === 3) rl.close();
    else IO(answer, count + 1);
  });
};

export { answerGenerator, check, IO, numberArrayGenerator, prettifyOutput };
