import * as fs from "node:fs";

const possibleWords = [
  { str: "one", num: 1 },
  { str: "two", num: 2 },
  { str: "three", num: 3 },
  { str: "four", num: 4 },
  { str: "five", num: 5 },
  { str: "six", num: 6 },
  { str: "seven", num: 7 },
  { str: "eight", num: 8 },
  { str: "nine", num: 9 },
];

const readCallback = (err: NodeJS.ErrnoException | null, data: string) => {
  // Un comment the console logs to see the flow of algorithm
  if (err) {
    // Log the error
    console.error(err);
    return;
  }

  // Split the data into individual lines
  const dataArr = data.split(/\r?\n/);

  let result: number = 0;
  let index: number = 1;

  for (const line of dataArr) {
    // loop over individual line
    let lineCalibration = ""; // Will be the calibration value for each line
    let firstFoundIndex: number = -1; // Will be the index of first number index
    let lastFoundIndex: number = -1; // Will be the index of second number index
    let wordSearchResult: number = -1; // Will be the number of the word number

    for (let j = 0; j < line.length; ++j) {
      // Find the first number index
      if (!isNaN(parseInt(line[j]))) {
        firstFoundIndex = j;
        break;
      }
    }

    // if no number is found then the value will be -1 for firstFoundIndex

    // console.log(1, firstFoundIndex)
    for (let j = 0; j < possibleWords.length; ++j) {
      // Find index of the first word number in line
      const idx = line.indexOf(possibleWords[j].str);
      // console.log(1.1, idx)

      if (firstFoundIndex === -1 && idx === -1) {
        // If no element is found for firstFoundIndex and idx return
        // console.log(1.2, idx)
        continue;
      }

      if (idx !== -1 && firstFoundIndex === -1) {
        // if no number is found for firstFoundIndex
        // set the wordSearchResult for the first number
        // console.log(1.3, idx)
        wordSearchResult = possibleWords[j].num;
        firstFoundIndex = idx;
      }

      if (idx !== -1 && idx < firstFoundIndex) {
        // if wordSearchResult has found something but a new word is found
        // which is less than the number at firstFoundIndex then replace it
        // console.log(1.4, idx)
        wordSearchResult = possibleWords[j].num;
        firstFoundIndex = idx;
      }
    }

    // set the first line calibration
    lineCalibration +=
      wordSearchResult !== -1 ? wordSearchResult : line[firstFoundIndex];
    // console.log(1.5, wordSearchResult)

    // reset the wordSearchResult for the second search
    wordSearchResult = -1;

    for (let j = line.length - 1; j >= 0; --j) {
      // Reverse traversal to find the last number
      if (!isNaN(parseInt(line[j]))) {
        lastFoundIndex = j;
        break;
      }
    }

    // console.log(2, lastFoundIndex)
    for (let j = 0; j < possibleWords.length; ++j) {
      // Find index of last word number
      const idx = line.lastIndexOf(possibleWords[j].str);
      // console.log(2.1, idx)
      if (lastFoundIndex === -1 && idx === -1) {
        // console.log(2.2, idx)
        continue;
      }

      if (idx !== -1 && lastFoundIndex === -1) {
        // console.log(2.3, idx)
        wordSearchResult = possibleWords[j].num;
        lastFoundIndex = idx;
      }

      if (idx !== -1 && idx > lastFoundIndex) {
        // console.log(2.4, idx)
        wordSearchResult = possibleWords[j].num;
        lastFoundIndex = idx;
      }
    }

    // Add the second word in line calibration
    lineCalibration +=
      wordSearchResult !== -1 ? wordSearchResult : line[lastFoundIndex];
    // console.log(2.4, wordSearchResult)
    // console.log(2.4, lineCalibration)

    // console.log(index, lineCalibration)
    // This index increment is just for the above console log
    // index++

    // Add the calibration to the result
    result += parseInt(lineCalibration);
  }

  console.log(result);
};

// Read the input file
fs.readFile("day_1_challenge.txt", "utf8", readCallback);
