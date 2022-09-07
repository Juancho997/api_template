import { DataTypes } from "sequelize";
import databaseConfiguration from "../database/index.js";

const Category = databaseConfiguration.databaseInstance.define('categories', {

    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    name: {
        type: DataTypes.STRING
    }

});


await Category.sync();

export default Category;