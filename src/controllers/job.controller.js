const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createJob(req, res) {
  const job = await prisma.job.create({
    data: {
      type: "TEST_JOB",
      payload: {},
      status: "PENDING",
    },
  });

  return res.json({
    jobId: job.id,
  });
}

module.exports = { createJob };
