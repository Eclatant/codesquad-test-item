import readline from "readline";
import uuid from "uuid/v4";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// TODO: length 표기를 더 잘 할 수 있는 방법은 없는가?
const store = {
  todo: {},
  doing: {},
  done: {},
  present: () =>
    `현재 상태 : ${["todo", "doing", "done"]
      .map(status => `${status}: ${Object.keys(store[status]).length}개`)
      .join(", ")}`
};

const IO = store => {
  rl.question(`\n원하시는 동작을 입력해주십시오.\n`, inputText => {
    // TODO: Help 메뉴도 만들자
    if (inputText === "quit") {
      console.log("동작을 종료합니다.\n");
      rl.close();
    } else {
      const input = inputText.split("$");
      const cmd = input[0];

      if (cmd === "add") {
        const taskId = uuid();
        store.todo[taskId] = { task: input[1] };
        console.log(`id: ${taskId}, "${input[1]}" 항목이 새롭게 추가되었습니다.`);
        console.log(store.present());
      } else if (cmd === "show") {
        const tempArr = [];

        for (let key in store[input[1]]) {
          tempArr.push({ [key]: store[input[1]][key].task });
        }

        console.log(
          tempArr
            .map(
              value =>
                `"${Object.keys(value)[0]}, ${value[Object.keys(value)[0]]}"`
            )
            .join(", ")
        );
      } else if (cmd === "update") {
        if (input[2] === "doing") {
          store.doing[input[1]] = store.todo[input[1]];
          store.doing[input[1]].time = new Date();
          delete store.todo[input[1]];

          // TODO: 3초 Blocking 구현 실패
          // (() =>
          //   Promise.resolve(
          //     setTimeout(() => {
          //       /* swallow */
          //     }, 3000)
          //   ).then(console.log(store.present())))();

          console.log(store.present());
        } else if (input[2] === "done") {
          const { taskId, task, time } = store.doing[input[1]];
          const timeTaken = new Date(new Date() - time);
          const timeText = `${timeTaken.getUTCHours()}시간 ${timeTaken.getUTCMinutes()}분 ${timeTaken.getUTCSeconds()}초`;

          store.done[task] = { task: timeText };
          delete store.doing[input[1]];

          // TODO: 3초 Blocking
          console.log(store.present());
        } else {
          console.log("잘못된 명령입니다.");
        }
      }

      IO(store);
    }
  });
};

IO(store);
