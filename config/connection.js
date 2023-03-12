const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// SO if it has been deployed to HEROKU it will use the JAWSDB_URL to get into the database
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
// otherwise it will use the local .env file and local host
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;