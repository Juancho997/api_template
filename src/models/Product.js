import { DataTypes } from "sequelize";
import { databaseInstance } from "../database/index.js";

const Product = databaseInstance.define('products', {

    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },

    name: {
        type: DataTypes.STRING
    },

    image: {
        type: DataTypes.STRING
    },

    description: {
        type: DataTypes.STRING
    },

    price: {
        type: DataTypes.INTEGER
    },

    categoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

    }

});


export default Product;