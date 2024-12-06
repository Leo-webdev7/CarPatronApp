import { Schema, model } from 'mongoose';
const techSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});
const Tech = model('Tech', techSchema);
export default Tech;
