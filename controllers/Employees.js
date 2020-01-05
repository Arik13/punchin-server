const Employee = require('../models/Employee');

exports.getEmployees = (req, res, next) => {
    console.log("GET Employees...");
    Employee.find()
        .then(employees => {
            console.log("Employees", employees);
            return res.json(employees);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getEmployee = (req, res, next) => {
    console.log("GET employee...");
    Employee.findById(req.params.id)
        .then(employees => {
            console.log("Employees", employees);
            return res.json(employees);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postEmployee = (req, res, next) => {
    const employee = new Employee({
        name: req.body.name,
        role: req.body.role,
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