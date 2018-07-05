import { Schema, SchemaTypes as t, SchemaOptions, model } from 'mongoose';

export const schema = new Schema({
    name: t.String,
    article: { ref: 'Article', type: t.ObjectId },
    text: t.String,
    
},
    { timestamps: true }); 