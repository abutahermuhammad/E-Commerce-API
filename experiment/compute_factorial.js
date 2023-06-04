const { parentPort, workerData } = require('node:worker_threads');

function computeFactorial(number) {
  if (number === 0) return 1;
  return number * computeFactorial(number - 1);
}

const result = computeFactorial(workerData.number);

parentPort.postMessage(result);
