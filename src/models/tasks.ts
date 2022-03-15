import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    id: { type: Number },
    description: { type: String },
    deadline: { type: String },
    isComplete: { type: Boolean }
})

export default mongoose.model("Task",taskSchema);