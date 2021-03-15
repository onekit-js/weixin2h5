export default class Worker {

  onMessage(callback) {
    this.fn_global().worker.addEventListener("message", callback = (event) => {
      console.error(`Received message from worker: ${event}`);
    });
  }

  onProcessKilled(callback) {
    this.fn_global().worker.removeEventListener("message", callback = (event) => {
      console.error(`Received message from worker: ${event}`);
    });
  }

  postMessage(message) {
    this.fn_global().worker.postMessage(message)
  }

  terminate() {
    this.fn_global().worker.terminate()
  }
}
