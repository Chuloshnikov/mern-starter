const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        require: [true, 'Task description is required'],
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});


const Task = mongoose.model('Task', taskSchema);

module.exports = {
    Task,
}