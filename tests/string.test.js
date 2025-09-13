import addNumbers from "../src/string.js";

describe("addNumbers", () => {
  test("empty string -> 0", () => {
    expect(addNumbers("")).toBe(0);
  });

  test("single number", () => {
    expect(addNumbers("42")).toBe(42);
  });

  test("multiple comma-separated numbers", () => {
    expect(addNumbers("1,2,3,4,5")).toBe(15);
  });

  test("handles newlines as delimiters", () => {
    expect(addNumbers("1\n2,3")).toBe(6);
    expect(addNumbers("10\n20\n30")).toBe(60);
  });

  test("custom single-character delimiter using //d\\n...", () => {
    expect(addNumbers("//;\n1;2;3")).toBe(6);
    expect(addNumbers("//|\n4|5|6")).toBe(15);
  });

  test("custom multi-character delimiter using //[***]\\n...", () => {
    expect(addNumbers("//[***]\n1***2***3")).toBe(6);
  });

  test("multiple custom delimiters using //[*][%]\\n...", () => {
    expect(addNumbers("//[*][%]\n1*2%3")).toBe(6);
    expect(addNumbers("//[ab][xyz]\n1ab2xyz3")).toBe(6);
  });

  test("spaces around numbers are tolerated (trimmed)", () => {
    expect(addNumbers("1, 2,3")).toBe(6);
    expect(addNumbers(" 4 ,5 ")).toBe(9);
  });

  test("trailing commas / empty tokens are ignored", () => {
    expect(addNumbers("1,2,")).toBe(3);
    expect(addNumbers(",1,2")).toBe(3);
    expect(addNumbers("1,,2")).toBe(3);
  });

  test("non-string input returns 0 (lenient behavior)", () => {
    expect(addNumbers(123)).toBe(0);
    expect(addNumbers(null)).toBe(0);
    expect(addNumbers(undefined)).toBe(0);
  });

  test("invalid numeric token results in NaN (detect with Number.isNaN)", () => {
    const result = addNumbers("1,2,a");
    expect(Number.isNaN(result)).toBe(true);
  });

  test("large input sample (random small set) — sanity check", () => {
    const arr = Array.from({ length: 50 }, (_, i) => i + 1); // 1..50
    const csv = arr.join(",");
    const expected = arr.reduce((s, n) => s + n, 0);
    expect(addNumbers(csv)).toBe(expected);
  });

  test("throws when a single negative number is passed", () => {
    expect(() => addNumbers("1,-2,3")).toThrow("Negatives not allowed: -2");
  });

  test("throws when multiple negatives are passed", () => {
    expect(() => addNumbers("-1,-5,3")).toThrow(
      "Negatives not allowed: -1, -5"
    );
  });
});
