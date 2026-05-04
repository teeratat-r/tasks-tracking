const Events = require('../model/Events')
const Employees = require('../model/Employees')

exports.getDemo = (req, res) => {
    console.log('Get Demo Seccess');
    res.send('Get Demo Success');
}

exports.createEvent = async (req, res) => {
    try {
        console.log('Create Event:', req.body);
        const newEvent = await new Events(req.body).save();
        res.status(201).send(newEvent);
    } catch (error) {
        console.log('createEvent ERROR', error)
        res.status(500).send('createEvent ERROR')
    }
}

exports.getEvent = async (req, res) => {
    try {
        console.log('Get Events');
        const getEvents = await Events.find({});
        res.status(200).send(getEvents);
    } catch (error) {
        console.log('getEvent ERROR', error);
        res.status(500).send('getEvent ERROR');
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        console.log('Delete Event ID', req.params.id)
        const deletedEvent = await Events.findOneAndDelete({ _id: req.params.id });
        res.status(200).send(deletedEvent);
    } catch (error) {
        console.log('deleteEvent ERROR', error);
        res.status(500).send('deleteEvent ERROR');
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const { _id, start, end, title, ...dataToUpdate } = req.body;
        const updatedEvent = await Events.findOneAndUpdate({ _id: _id }, dataToUpdate);
        res.status(200).send(updatedEvent);
    } catch (error) {
        console.log('updateEvent ERROR', error);
        res.status(500).send('updateEvent ERROR');
    }
}

exports.getEmployee = async (req, res) => {
    try {
        const getEmployee = await Employees.find({});
        res.status(200).send(getEmployee);
    } catch (error) {
        console.log('getEmployee ERROR', error);
        res.status(500).send('getEmployee ERROR');
    }
}