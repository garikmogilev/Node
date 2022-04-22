const { AbilityBuilder, Ability } = require("@casl/ability");
const {Admin, User, Guest} = require("./roles")
const access = require("./defines").access;
const entity = require("./defines").entity;
const admin = require("./defines").admin;

exports.GetAbilityFor = (req) => {
    const {rules, can, cannot} = new AbilityBuilder(Ability);
    switch (req.payload.role) {
        case Admin:
            can(admin.manage, admin.all);
            break;
        case User:
            can(
                [access.read, access.create, access.update],
                [entity.repos, entity.commits],
                {authorid: req.payload.id}
            );
            can(
                access.read,
                entity.users,
                {id: req.payload.id}
            );
            break;
        default:
            can(
                access.read,
                [entity.repos, entity.commits]
            );
            break;
    }
    req.rules = rules;
    return new Ability(rules);
}