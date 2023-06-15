import {Sequelize} from "sequelize";

const db = new Sequelize('db_inventory_penjualan','root','', {
    host: 'localhost',
    dialect: "mysql"
});

export default db;