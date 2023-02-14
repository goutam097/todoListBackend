const Sequelize = require("sequelize");
const sequelize = require("../configs/db.connection");
const UserModel = require("../models/user.model");
const productModel = require("../models/product.model");

const Cart = sequelize.define("Carts", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    quantity: {
        type: Sequelize.STRING,
        allowNull: true,
    },

});
UserModel.hasMany(Cart, {
    foreignKey: "adminId",
    onDelete: "cascade"
});
productModel.hasMany(Cart, {
    foreignKey: "productId",
    onDelete: "cascade"
});


module.exports = Cart