deliveryReceiptQueue.process(10, async (jobs, done) => {
  try {
      const bulkOps = jobs.map(job => {
          const { logId, status } = job.data;
          return {
              updateOne: {
                  filter: { _id: logId },
                  update: { status, sentAt: new Date() },
              },
          };
      });

      await CommunicationsLog.bulkWrite(bulkOps);
      done();
  } catch (err) {
      console.error('Error in batch processing:', err);
      done(err);
  }
});
