import string from "../src/string.js";

test("empty string", () => {
  expect(string("")).toBe(0);
});

test("any amount of numbers", () => {
  expect(string("1,2,3,4,5,6,7,8,9")).toBe(45);
});

test("numbers string with one delimiter", () => {
  expect(string("1,2,3,4,5,6\n7,8,9")).toBe(45);
});

test("numbers string with multiple new line delimiter", () => {
  expect(string("1,2\n3,4,5,6\n7,8,9")).toBe(45);
});
