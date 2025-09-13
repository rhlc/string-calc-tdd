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

const validString = (numbers) => {
  if (numbers === "") return true;
  const regex = /^[0-9]+(,[0-9]+)*$/;
  return regex.test(numbers);
};

const addStringNumbers = (numbers) => {
  return numbers
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map(Number)
    .reduce((a, b) => a + b, 0);
};

const normalizeString = (numbers) => {
  const { delimiter, input } = parseInput(numbers);

  return input.split(delimiter).join(",");
};

const addNumbers = (numbers) => {
  if (typeof numbers !== "string") {
    return 0;
  }

  if (validString(numbers)) {
    return addStringNumbers(numbers);
  } else {
    const normalNumbers = normalizeString(numbers);
    return addStringNumbers(normalNumbers);
  }
};

export default addNumbers;
