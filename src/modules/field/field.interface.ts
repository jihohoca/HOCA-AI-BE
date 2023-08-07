import { Model } from "mongoose";

export interface IField {
  name: string;
  description: string;
}


export interface IFieldDoc extends IField, Document {}

export interface IFieldModel extends Model<IFieldDoc>{}
