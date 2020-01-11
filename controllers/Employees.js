const contractorControllers = require("./contractor/ContractorEmployees");
const employeeControllers = require("./employee/EmployeeEmployees");
const httpError = require("../util/miscFunctions").httpError;

exports.getEmployees = (req, res, next) => {
    switch(req.role) {
        case ("Contractor"): return contractorControllers.getEmployees(req, res, next);
        case ("Employee"): throw httpError(403, "Employees can't access other employees");
        default: throw httpError(400, "Role does not exist");
    }
}

exports.putEmployees = (req, res, next) => {
    switch(req.role) {
        case ("Contractor"): return contractorControllers.putEmployees(req, res, next);
        case ("Employee"): throw httpError(403, "Employees can't access other employees");
        default: throw httpError(400, "Role does not exist");
    }
}

exports.getEmployee = (req, res, next) => {
    switch(req.role) {
        case ("Contractor"): return contractorControllers.getEmployee(req, res, next);
        case ("Employee"): return employeeControllers.getEmployee(req, res, next);
        default: throw httpError(400, "Role does not exist");
    }
}
exports.getEmployeeJobs = (req, res, next) => {
    switch(req.role) {
        case ("Contractor"): return contractorControllers.getEmployeeJobs(req, res, next);
        case ("Employee"): return employeeControllers.getEmployeeJobs(req, res, next);
        default: throw httpError(400, "Role does not exist");
    }
}

exports.getEmployeeCode = (req, res, next) => {
    switch(req.role) {
        case ("Contractor"): return contractorControllers.getEmployeeCode(req, res, next);
        case ("Employee"): throw httpError(403, "Employees can't generate employee codes");
        default: throw httpError(400, "Role does not exist");
    }
}

exports.putEmployeeCode = (req, res, next) => {
    switch(req.role) {
        case ("Contractor"): throw httpError(403, "Only employees can connect to contractors");// return contractorControllers.putEmployee(req, res, next);
        case ("Employee"): return employeeControllers.putEmployeeCode(req, res, next);
        default: throw httpError(400, "Role does not exist");
    }
}

// exports.postEmployee = (req, res, next) => {
//     let error;
//     switch(req.role) {
//         case ("Contractor"): return contractorControllers.postEmployees(req, res, next);
//         case ("Employee"): throw httpError(403, "Employees can't generate employee codes");
//             error = new Error("Employees do not have permissions to create jobs");
//             error.statusCode = 403;
//             throw error;
//         default: throw httpError(400, "Role does not exist");
//     }
// }