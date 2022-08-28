import { DataTypes } from "sequelize";
import { databaseInstance } from "../database/index.js";

const Category = databaseInstance.define('categories', {

    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },

    name: {
        type: DataTypes.STRING
    }

});


await Category.sync();

export default Category;