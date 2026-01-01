const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development";
const config = require("../config/default.json")[env];
const { host, username, password, database, dialect, port, logging } = config.db;


const db: any = {};

// Connection String
const sequelize = new Sequelize(database, username, password, {


    host,
    dialect,
    port,
    logging,
    ...(env !== "development" && {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
});
console.log("Database: ", database, "Username: ", username, "password: ", password, "host: ", host, 'port', port)
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
console.log("index.ts: Done Sequelize initialization")

fs.readdirSync(__dirname)
    .filter((file: any) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && (file.slice(-3) === ".ts" || file.slice(-3) === ".js")
        );
    })
    .forEach((file: any) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName: any) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.DataTypes = Sequelize;
db.Op = Sequelize.Op;

export { db };