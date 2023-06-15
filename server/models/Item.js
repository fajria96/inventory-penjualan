import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Item = db.define('item',{
    nama_item: DataTypes.STRING,
    unit: DataTypes.ENUM("kg","pcs"),
    stok: DataTypes.INTEGER,
    harga_satuan: DataTypes.INTEGER,
    barang: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Item;

(async ()=> {
    await db.sync();
})();