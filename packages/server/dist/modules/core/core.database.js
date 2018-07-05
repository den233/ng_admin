"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_schema_1 = require("./schemas/account.schema");
const dict_schema_1 = require("./schemas/dict.schema");
const log_schema_1 = require("./schemas/log.schema");
const menu_schema_1 = require("./schemas/menu.schema");
const role_schema_1 = require("./schemas/role.schema");
const setting_schema_1 = require("./schemas/setting.schema");
const group_schema_1 = require("./schemas/group.schema");
const profile_schema_1 = require("./schemas/profile.schema");
const api_schema_1 = require("./schemas/api.schema");
const mongoose_1 = require("mongoose");
exports.CoreDatabase = {
    Account: mongoose_1.model('Account', account_schema_1.schema),
    Profile: mongoose_1.model('Profile', profile_schema_1.schema),
    Dict: mongoose_1.model('Dict', dict_schema_1.schema),
    Log: mongoose_1.model('Log', log_schema_1.schema),
    Menu: mongoose_1.model('Menu', menu_schema_1.schema),
    Role: mongoose_1.model('Role', role_schema_1.schema),
    Setting: mongoose_1.model('Setting', setting_schema_1.schema),
    Group: mongoose_1.model('Group', group_schema_1.schema),
    Api: mongoose_1.model('Api', api_schema_1.schema),
};
//# sourceMappingURL=core.database.js.map