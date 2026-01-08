const {Queue}=require("bullmq")
const IOReddis=require("ioredis")

const connection = new IOReddis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null
})

const jobQueue=new Queue("job-queue",{connection});
module.exports=jobQueue;
