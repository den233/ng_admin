"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: mongoose_1.SchemaTypes.String,
    article: { ref: 'Article', type: mongoose_1.SchemaTypes.ObjectId },
    text: mongoose_1.SchemaTypes.String,
}, { timestamps: true });
//# sourceMappingURL=comment.schema.js.map