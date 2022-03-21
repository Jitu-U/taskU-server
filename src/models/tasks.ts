const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    id: { type: Number },
    description: { type: String },
    deadline: { type: String },
    isComplete: { type: Boolean }
})

module.exports =  mongoose.model("Task",taskSchema);