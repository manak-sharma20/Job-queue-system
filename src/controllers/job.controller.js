const prisma=require("../db/prisma")
const jobQueue=require("../queues/jobQueue")




async function createJob(req, res) {
  const job = await prisma.job.create({
    data: {
      type: "TEST_JOB",
      payload: {},
      status: "PENDING",
    },
  });
  await jobQueue.add("TEST_JOB",{
    jobId: job.id,
  })
  

  return res.json({
    jobId: job.id,
  });
}

module.exports = { createJob };
