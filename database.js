'use strict';


const bcrypt = require('bcrypt');
const knex = require('knex')(process.env.PG_URL);
const bookshelf = require('bookshelf')(knex);

bookshelf.Model.prototype.save = function () {
    return save.apply(this, arguments).then(function (model) {
        return model ? model.fetch() : model;
    });
};

const Users = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'users_id',
    generateHash: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: (password) => {
        return bcrypt.compareSync(password, this.get('password'));
    },
    generateJWT: () => {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        return jwt.sign({
            users_id: this.attributes.users_id,
            email: this.attributes.email,
            exp: parseInt(expiry.getTime() / 1000)
        }, process.env.JWT_SECRET);
    }
});

const Tutorials = bookshelf.Model.extend({
    tableName: 'tutorials',
    idAttribute: 'tutorials_id',
    user: () => {
        return this.belongsTo(Users, 'users_id');
    }
});


module.exports = {
  Users: Users,
  Tutorials: Tutorials,
};