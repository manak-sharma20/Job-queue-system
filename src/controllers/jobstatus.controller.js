const prisma = require("../db/prisma");
async function jobStatus(req,res) {
    const jobID=req.params.id;
    const job= await prisma.job.findUnique({where:{id:jobID}})
    if (!job){
        return res.status(404).json({error:"Job not found"})
    }
    return res.status(200).json(job)

}
module.exports={jobStatus}