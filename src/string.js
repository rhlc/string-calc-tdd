const escapeForRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseInput = (numbers) => {
  if (typeof numbers !== "string" || numbers === "") {
    return { delimiter: /,|\n/, input: "" };
  }

  let delimiter = /,|\n/;
  let input = numbers;

  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");
    const delimiterSpec = parts[0].slice(2);

    if (delimiterSpec.startsWith("[") && delimiterSpec.endsWith("]")) {
      const matches = Array.from(
        delimiterSpec.matchAll(/\[([^\]]+)\]/g),
        (m) => m[1]
      );
      const escaped = matches.map(escapeForRegex).join("|");
      delimiter = new RegExp(escaped);
    } else {
      delimiter = new RegExp(escapeForRegex(delimiterSpec));
    }

    input = parts.slice(1).join("\n");
  }

  return { delimiter, input };
};

const processNumbers = (numbersString, delimiter) => {
  if (numbersString === "") return [];

  const nums = numbersString
    .split(delimiter)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map(Number);

  const negatives = nums.filter((n) => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
  }

  return nums;
};

const addNumbers = (numbers) => {
  if (typeof numbers !== "string") {
    return 0;
  }

  const { delimiter, input } = parseInput(numbers);
  const nums = processNumbers(input, delimiter);

  return nums.reduce((a, b) => a + b, 0);
};

export default addNumbers;
