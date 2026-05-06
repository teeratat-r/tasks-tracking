const router = require('express').Router();
const { getDemo, createEvent, getEvent, deleteEvent, updateEvent, getEmployee, queryEvent } = require('../controllers/controllers')

// @Endpoint    localhost:5000/api/demo
// @Method      GET
// @Access      Public
router.get('/demo', getDemo);


// @Endpoint    localhost:5000/api/event
// @Method      POST
// @Access      Public
router.post('/event', createEvent);


// @Endpoint    localhost:5000/api/event
// @Method      GET
// @Access      Public
router.get('/event', getEvent);


// @Endpoint    localhost:5000/api/event/:id
// @Method      DELETE
// @Access      Public
router.delete('/event/:id', deleteEvent);


// @Endpoint    localhost:5000/api/event
// @Method      PUT
// @Access      Public
router.put('/event', updateEvent);


// @Endpoint    localhost:5000/api/employees
// @Method      GET
// @Access      Public
router.get('/employee', getEmployee);


// @Endpoint    localhost:5000/api/query
// @Method      POST
// @Access      Public
router.post('/query', queryEvent);


module.exports = router;