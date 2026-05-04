const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({})

let Employees = mongoose.model('Employees', eventSchema, 'employee');

module.exports = Employees;