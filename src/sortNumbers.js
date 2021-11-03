//Ascending use "<"
//descending use ">"

let numbers = [85, 83, 29, 70, 4, 0, 17, 8, 55];
const sortNumbers = (numbers) => {
  let temp;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (numbers[i] < numbers[j]) {
        temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
      }
    }
  }
  return numbers;
};
number = sortNumbers(numbers);
