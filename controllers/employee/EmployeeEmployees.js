const EmployeeCode = require("../../models/EmployeeCode");
const Employee = require("../../models/Employee");
const Contractor = require("../../models/Contractor");
const httpError = require("../../util/miscFunctions").httpError;
// const User = require("../../models/User");

exports.putEmployeeCode = async (req, res, next) => {
    console.log("PUT employee...");
    EmployeeCode
        .findOne({code: req.body.employeeCode})
        .then(employeeCode => {
            if(!employeeCode) {
                return res.json("This code doesn't exist");
            }
            let hours = Math.floor(((new Date() - employeeCode.issuedDate) / (1000 * 60 * 60)) % 24);
            if (hours >= 48) {
                throw httpError(406, "This code has expired");
            }
            Employee
                .findByIdAndUpdate(new ObjectID(req.userId), {contractorId: employeeCode.contractorId})
                .then(employee => {
                    employee.save();
                    Contractor.findById(new ObjectID(employeeCode.contractorId))
                        .then(contractor => {
                            if(!contractor.employees.find(id => {return id == req.userId})) {
                                contractor.employees.push(req.userId);
                                contractor.save();
                                return res.json("Succeeded");
                            }
                            else {
                                return res.json("Did not succeed");
                            }
                        })
                })

        })
}