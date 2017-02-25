'use strict';


const bcrypt = require('bcrypt');
const knex = require('knex')(process.env.PG_URL);
const bookshelf = require('bookshelf')(knex);
const save = bookshelf.Model.prototype.save;
const jwt = require('jsonwebtoken');


bookshelf.Model.prototype.save = function () {
    return save.apply(this, arguments).then(function (model) {
        return model ? model.fetch() : model;
    });
};

const Users = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'users_id',
    initialize: function() {
        this.on('saving', this.hashPassword, this);
    },
    hashPassword: function(model, attrs, options) {
        model.attributes.password = bcrypt.hashSync(model.attributes.password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password) {
        return bcrypt.compareSync(password, this.get('password'));
    },
    generateJWT: function() {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        return jwt.sign({
            users_id: this.attributes.users_id,
            username: this.attributes.username,
            exp: parseInt(expiry.getTime() / 1000)
        }, process.env.JWT_SECRET);
    },
    serialize: function() {
        return {
            username: this.attributes.username,
        }
    }
});

const Tutorials = bookshelf.Model.extend({
    tableName: 'tutorials',
    idAttribute: 'tutorials_id',
    user: function() {
        return this.belongsTo(Users, 'users_id');
    }
});


module.exports = {
  Users: Users,
  Tutorials: Tutorials,
};