const Job = require('../models/Job');
ObjectID = require('mongodb').ObjectID;
const httpError = require("../util/miscFunctions").httpError;

const contractorControllers = require("./contractor/ContractorJobs");
const employeeControllers = require("./employee/EmployeeJobs");

exports.getJobs = (req, res, next) => {
    switch(req.role) {
        case ("Contractor"): return contractorControllers.getJobs(req, res, next);
        case ("Employee"): return employeeControllers.getJobs(req, res, next);
        default: throw httpError(400, "Role doesn't exist.");
    }
}

exports.postJob = (req, res, next) => {
    switch(req.role) {
        case ("Contractor"): return contractorControllers.postJob(req, res, next);
        case ("Employee"): throw httpError(403, "Employees can't post jobs");
        default: throw httpError(400, "Role doesn't exist.");
    }
}

exports.getJob = (req, res, next) => {
    switch(req.role) {
        case ("Contractor"): return contractorControllers.getJob(req, res, next);
        case ("Employee"): return employeeControllers.getJob(req, res, next);
        default: throw httpError(400, "Role doesn't exist.");
    }
}
exports.getJobEmployees = (req, res, next) => {
    switch(req.role) {
        case ("Contractor"): return contractorControllers.getJobEmployees(req, res, next);
        case ("Employee"): throw httpError(403, "Employees can't access information about other employee's jobs");
        default: throw httpError(400, "Role doesn't exist.");
    }
}
