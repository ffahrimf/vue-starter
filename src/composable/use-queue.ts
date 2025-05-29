class PQueue<T> {
  private queue: Array<{
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
    run: () => Promise<T>;
  }> = [];
  private running = false;

  enqueue(job: {
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
    run: () => Promise<T>;
  }) {
    this.queue.push(job);
  }

  dequeue() {
    return this.queue.shift();
  }

  async add(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const queueJob = {
        resolve,
        reject,
        run: task
      };

      this.enqueue(queueJob);
      this.run();
    });
  }

  run() {
    if (this.queue.length > 0 && !this.running) {
      this.running = true;

      const job = this.dequeue();

      job
        ?.run()
        .then(job.resolve)
        .catch(job.reject)
        .finally(() => {
          this.running = false;
          this.run();
        });
    }
  }
}

export default PQueue;
