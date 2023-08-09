import httpStatus from "http-status";
import ApiError from "../errors/ApiError";
import { IField, IFieldDoc } from "./field.interface";
import { Field } from "./field.model";

export const addFields = async(fieldBody: IField): Promise<IFieldDoc> => {
    if (await Field.isTakenField(fieldBody.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'field already taken');
    }

    return Field.create(fieldBody);
}

export const getFields = async (): Promise<any> => {
    const fields = await Field.find();
    return fields;
}