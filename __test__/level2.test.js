import { answerGenerator, check, numberArrayGenerator } from '../level2Helper';

3;
describe("Level2 Method Test", () => {
  it("answerGenerator", () => {
    // given
    const shuffledArray = [7, 9, 5, 4, 3, 6, 1, 8, 2];

    // when
    const result = answerGenerator(shuffledArray);

    // then
    expect(result).toEqual("795");
  });

  it("numberArrayGenerator", () => {
    // given

    // when
    const result = numberArrayGenerator(1, 9);

    // then
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  describe("Check whether user input is correct (check Method)", () => {
    let answer;

    beforeEach(() => {
      answer = "789";
    });

    it("0S 0B", () => {
      // given
      const userInput = "123";

      // when
      const result = check(answer, userInput);

      // then
      expect(result).toEqual({ strike: 0, ball: 0 });
    });

    it("1S 1B", () => {
      // given
      const userInput = "791";

      // when
      const result = check(answer, userInput);

      // then
      expect(result).toEqual({ strike: 1, ball: 1 });
    });

    it("3S", () => {
      // given
      const userInput = "789";

      // when
      const result = check(answer, userInput);

      // then
      expect(result).toEqual({ strike: 3, ball: 0 });
    });
  });
});
