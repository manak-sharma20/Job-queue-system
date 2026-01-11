
const {Worker}= require("bullmq");
const IORedis= require("ioredis");
const prisma = require("../db/prisma");

const connection = new IORedis({

    maxRetriesPerRequest: null

});
console.log("Worker Started");
const worker = new Worker("job-queue",
    async (job)=>{
        const {jobId}= job.data
        console.log(`worker assigned ${jobId}`);
    try{
        await prisma.job.update({
            where:{id:jobId},
            data:{status:"PROCESSING"}
        })
        await new Promise((resolve)=>setTimeout(resolve,5000))    

        await prisma.job.update({where:{id:jobId},
            data:{status:"COMPLETED"}
            
        })
        console.log(`Job completed : ${jobId}`)
        return "done"
    }
    catch(err){
        
        throw err;

    }
    },
    {connection}
    
)
worker.on("completed", (job, result) => {
    console.log(`Job completed: ${job.id}`);
  });
worker.on("failed", (job, err) => {
    console.error(` Job failed: ${job.id}`);
    console.error(`Reason: ${err.message}`);
    console.error(`Attempts made: ${job.attemptsMade}`);
  });
worker.on("error", (err) => {
    console.error("Worker error:", err);
  });
  
  
