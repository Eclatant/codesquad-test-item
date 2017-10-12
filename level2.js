import _ from 'lodash';

import { answerGenerator, IO, numberArrayGenerator } from './level2Helper';

const numberList = numberArrayGenerator(1, 9); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Fisher-Yates Shuffle : https://stackoverflow.com/a/6274398 === https://lodash.com/docs/4.17.4#shuffle
const shuffledList = _.shuffle(numberList);

const answer = answerGenerator(shuffledList);

IO(answer);
