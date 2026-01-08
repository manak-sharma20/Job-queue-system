
const {Worker}= require("bullmq");
const IORedis= require("ioredis");
const prisma = require("../db/prisma");

const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379,
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
        await prisma.job.update({where:{id:jobId},data:{status:"FAILED"}})
        console.log(`${jobId}`,err.message)
        throw err;

    }
    },
    {connection}
    
)
