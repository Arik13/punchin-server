const Job = require('../../models/Job');
ObjectID = require('mongodb').ObjectID;

exports.getJobs = (req, res, next) => {
    console.log("GET jobs...");
    Job.find({ contractorId: new ObjectID(req.userId)})
        .then(jobs => {
            console.log("Jobs: ", jobs);
            return res.json(jobs);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getJob = (req, res, next) => {
    console.log("GET job...");
    Job.findById(req.params.id)
        .then(job => {
            if (job.contractorId != req.userId) {
                const error = new Error("Unauthorized access of job data.");
                error.statusCode = 401;
                throw error;
            }
            console.log("Job: ", job);
            return res.json(job);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postJob = (req, res, next) => {
    const job = new Job({
        jobName: req.body.jobName,
        address: req.body.address,
        contractorId: new ObjectID(req.userId)
    });
    job.save()
        .then(result => {
            console.log("Job created: ", result);
            res.json({"reply": "Job posted"})
        })
        .catch(err => {
            console.log(err);
        });
}