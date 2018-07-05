import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';

export const schema = new Schema({
    name: { type: t.String },
    title: t.String,
    keyword: t.String,
    type: t.String,
    description: t.String,
    author: t.String,
    sort: t.Number,
    disable: t.Boolean,
    category: {
        ref: 'Category', type: t.ObjectId
    },
    meta: {
        ref: 'Meta', type: t.ObjectId
    },
    content: {
        ref: 'Content', type: t.ObjectId,
    },
    template: {
        ref: 'Content', type: t.ObjectId
    }
},
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret, options) => {
                ret.id = ret._id;
                delete ret._id;
            }
        },
        strict: false
    });