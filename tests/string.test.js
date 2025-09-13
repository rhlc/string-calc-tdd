import addNumbers from "../src/string.js";

test("empty string", () => {
  expect(addNumbers("")).toBe(0);
});

test("any amount", () => {
  expect(addNumbers("1,2,3,4,5,6,7,8,9")).toBe(45);
});

test("one newline delimiter", () => {
  expect(addNumbers("1,2,3,4,5,6\n7,8,9")).toBe(45);
});

test("multiple new line delimiter", () => {
  expect(addNumbers("1,2\n3,4,5,6\n7,8,9")).toBe(45);
});

test("single custom delimiter", () => {
  expect(addNumbers("//$\n4$5$6")).toBe(15);
});

// test("numbers addNumbers with multiple custom delimiter", () => {
//   expect(addNumbers("//|\n4|5|6")).toBe(15);
// });
