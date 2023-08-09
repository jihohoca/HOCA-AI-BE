import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import { IFieldDoc, IFieldModel } from './field.interface';

const fieldSchema = new mongoose.Schema<IFieldDoc, IFieldModel>({
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
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
fieldSchema.static('isTakenField', async function (name: string): Promise<boolean> {
    const user = await this.findOne({ name });
    return !!user;
  });
  

/**
 * @typedef Field
 */
export const Field = mongoose.model<IFieldDoc, IFieldModel>('Field', fieldSchema);

export default Field;
