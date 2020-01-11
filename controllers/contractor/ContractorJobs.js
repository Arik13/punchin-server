const Job = require('../../models/Job');
// const Employee = require('../../models/Employee');
ObjectID = require('mongodb').ObjectID;
const httpError = require("../../util/miscFunctions").httpError;

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
                throw httpError(401, "Unauthorized access of job data.");
            }
            console.log("Job: ", job);
            return res.json(job);
        })
        .catch(err => {
            console.log(err);
        });
}
exports.getJobEmployees = (req, res, next) => {
    console.log("GET job...");
    Job
        .findById(req.params.id)
        .then(job => {
            console.log("Jobs: ", job);
            console.log("Employees: ", job.employees);
            // return res.json("made it");
        })
        // .populate("employees")
        // .exec(employees => {
        //     console.log("Employees: ", employees);
        //     return res.json("Employees found");
        // })
        // .catch(err => {
        //     console.log(err);
        // })
        // .then(job => {

        //     if (job.contractorId != req.userId) {
        //         const error = new Error("Unauthorized access of job data.");
        //         error.statusCode = 401;
        //         throw error;
        //     }
        //     console.log("Job: ", job);
        //     return res.json(job);
        // })
        // .catch(err => {
        //     console.log(err);
        // });
}
// exports.postJobEmployee = (req, res, next) => {

//     Job
//         .findById(req.params.id)
//         .then(job => {
//             console.log("Jobs: ", job);
//             console.log("Employees: ", job.employees);

//         })
// }

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