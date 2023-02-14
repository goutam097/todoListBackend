const Sequelize = require("sequelize");
const sequelize = require("../configs/db.connection");
const CategoryModel = require("../models/productCategory.model");

const Product = sequelize.define("Products", {
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    P_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    p_slug: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    P_price: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    availableStock: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    P_discount: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    P_image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.ENUM("active", "inactive", "archive"),
        allowNull: false,
        defaultValue: "active",
    },

});
CategoryModel.hasMany(Product, {
    foreignKey: "catogoryId",
    onDelete: "cascade"
})


module.exports = Product;
