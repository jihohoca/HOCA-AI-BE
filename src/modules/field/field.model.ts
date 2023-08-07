import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';

const fieldSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    }
})

// add plugin that converts mongoose to json
fieldSchema.plugin(toJSON);


/**
 * @typedef Field
 */
const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
