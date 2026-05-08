const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    personInCharge: {
        type: String
    },
    status: {
        type: String
    },
    color: {
        type: String
    },
    description: {
        type: String
    },
    allDay: {
        type: Boolean,
        default: true,
    },
}, { timestamp: true })

let Events = mongoose.model('events', eventSchema);

module.exports = Events;