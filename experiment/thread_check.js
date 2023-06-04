const { Worker } = require('worker_threads');
const path = require('path');

const worker = new Worker(path.join(__dirname, 'compute_factorial.js'), {
  workerData: { number: 5 },
});

worker.on('message', (message) => {
  console.log('Message: ' + message);
});

worker.on('error', (error) => {
  console.error(error);
});

worker.on('exit', (code) => {
  if (code !== 0) console.error(new Error(`Worker stopped with exit code ${code}`));
});
