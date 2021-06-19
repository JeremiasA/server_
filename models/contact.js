'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Contact extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Contact.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Contact name can not be empty'" },
                },
            },
            phone: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    isNumeric: { msg: 'Please enter a valid phone number' },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: { msg: 'Please enter a valid email address' },
                    notEmpty: { msg: 'Email conctact can not be empty' },
                    notNull: { msg: 'Email contact can not be empty' },
                },
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'Message can not be empty' },
                    notNull: { msg: 'Message can not be null' },
                },
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Contact',
        }
    );
    return Contact;
};
