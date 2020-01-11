const User = require('../../models/User');
const Employee = require('../../models/Employee');
const EmployeeCode = require('../../models/EmployeeCode');
const uuidv4 = require("uuid/v4");

exports.getEmployees = (req, res, next) => {
    console.log("GET Employees...");
    Employee.find({ contractorId: new ObjectID(req.userId)})
        .then(employees => {
            console.log("Employees", employees);
            return res.json(employees);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.putEmployees = (req, res, next) => {
    console.log("PUT Employees...");
    console.log("Body: ", req.body);
    Employee
        .find()
        .where("_id")
        .in(req.body.ids)
        .then(employees => {
            console.log("Employees", employees);
        });
}

exports.getEmployeeCode = (req, res, next) => {
    console.log("GET employee...");
    const code = uuidv4();
    const employeeCode = new EmployeeCode({
        code: code,
        contractorId: new ObjectID(req.userId),
        issuedDate: new Date(),
    });
    employeeCode.save()
        .then((result) => {
            console.log("Employee code created: ", result);
            return res.json(code);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getEmployee = (req, res, next) => {
    console.log("GET employee...");
    Employee.findById(req.params.id)
        .then(employee => {
            console.log("Employee", employee);
            return res.json(employee);
        })
        .catch(err => {
            console.log(err);
        });
}
exports.getEmployeeJobs = (req, res, next) => {
    console.log("GET employee...");
    Employee.findById(req.params.id)
        .then(employee => {
            console.log("Employee", employee);
            return res.json(employee);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postEmployee = (req, res, next) => {
    const employee = new Employee({
        name: req.body.name,
        role: req.body.role,
        contractorId: new ObjectID(req.userId)
    });
    employee.save()
        .then(result => {
            console.log("Employee created: ", employee);
            res.json({"reply": "Employee posted"})
        })
        .catch(err => {
            console.log(err);
        });
}