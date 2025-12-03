const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "senati-db", "root", "", { host: "localhost", dialect: "mysql" }
);

module.exports = sequelize;