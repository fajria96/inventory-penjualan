import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Customer from "./Customer.js";

const {DataTypes} = Sequelize;

const Sales = db.define('sales',{
    code_transaksi: DataTypes.STRING,
    tanggal_transaksi: DataTypes.DATE,
    customer_id: {
      references: {
        model: "Customer",
        key: "id",
      },
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    sales_items_id: DataTypes.INTEGER,
    total_quantity: DataTypes.STRING,
    total_diskon: DataTypes.INTEGER,
    total_harga: DataTypes.INTEGER,
    total_bayar: DataTypes.INTEGER
},{
    freezeTableName: true
});

Sales.belongsTo(Customer, {
  foreignKey: "customer_id",
});

export default Sales;

(async ()=> {
    await db.sync();
})();