const Sequelize = require("sequelize");
const sequelize = require("../configs/db.connection");

const Category = sequelize.define("Category", {
    c_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    c_image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    c_slug: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.ENUM("active", "inactive", "archive"),
        allowNull: false,
        defaultValue: "active",
    },
});


module.exports = Category;
