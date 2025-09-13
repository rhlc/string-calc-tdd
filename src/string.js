const string = (numbers) =>
  numbers.split(",").reduce((a, b) => a + Number(b), 0);

export default string;
