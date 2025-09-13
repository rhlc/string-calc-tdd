const validString = (numbers) => {
  if (numbers === "") return true;
  const regex = /^[0-9]+(,[0-9]+)*$/;
  return regex.test(numbers);
};

const addStringNumbers = (numbers) => {
  return numbers.split(",").reduce((a, b) => a + Number(b), 0);
};

const normalizeString = (numbers) => {
  return numbers.replace(/\n/g, ",");
};

const string = (numbers) => {
  if (validString(numbers)) {
    return addStringNumbers(numbers);
  } else {
    const normalNumbers = normalizeString(numbers);
    return addStringNumbers(normalNumbers);
  }
};

export default string;
