import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Customer = db.define('customer',{
    nama: DataTypes.STRING,
    contact: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING,
    diskon: DataTypes.INTEGER,
    tipe_diskon: DataTypes.ENUM("persentase", "fix diskon"),
    ktp: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Customer;

(async ()=> {
    await db.sync();
})();