const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trip extends Model {}

Trip.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        trip_budget: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        traveller_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        traveller_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'traveller',
                key: 'id',
                unique: false

            }
        },
        location_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'location',
                key: 'id',
                unique: false
            }
        }
    },
    {
// These are extra instructions you give sequelize about how you want the table to be built and if you want to use an extra features built in to sequelize
        sequelize,
// if time stamps is true sequalise will create extra columns that will keep track of when the trable is created/updated
        timestamps: false,
// sequelize will automatically change singular nouns to plurals unless freezeTableName is TRUE
        freezeTableName: true,
// underscored: true means that sequelize will convert names to snake_case from camelCase and the like
        underscored: true,
// after a model is defined it is avilable by calling sequalize.models.(modelName). Here we define the model name so we can access it later
        modelName: 'trip'
    }
);

module.exports = Trip;