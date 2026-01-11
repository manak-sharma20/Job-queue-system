const {Queue}=require("bullmq")
const IOReddis=require("ioredis")

const connection = new IOReddis({

    maxRetriesPerRequest: null
})

const jobQueue=new Queue("job-queue",{connection});
module.exports=jobQueue;
