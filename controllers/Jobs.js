const Job = require('../models/Job');

exports.getJobs = (req, res, next) => {
    console.log("GET jobs...");
    Job.find()
        .then(jobs => {
            console.log("Jobs", jobs);
            return res.json(jobs);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getJob = (req, res, next) => {
    console.log("GET job...");
    Job.findById(req.params.id)
        .then(jobs => {
            console.log("Jobs", jobs);
            return res.json(jobs);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postJob = (req, res, next) => {
    const job = new Job({
        jobName: req.body.jobName,
        address: req.body.address,
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