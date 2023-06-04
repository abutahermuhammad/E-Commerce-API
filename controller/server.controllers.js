const cluster = require('cluster');
const os = require('os');

const initializeServer = (app, port) => {
  app.set('trust proxy', true); // trust first proxy

  const numCPUs = os.cpus().length; // Count the number of CPUs on the machine

  if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    // Fork worker processes
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    // Listen for dying worker processes and fork new ones
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker process ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
  } else {
    // Each worker process runs the app
    app.listen(port, () => {
      console.log(`Worker process ${process.pid} started. Listening on port ${port}`);
    });
  }
};

module.exports = {
  initializeServer,
};
