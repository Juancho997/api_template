import { DataTypes } from "sequelize";

import databaseConfiguration from "../database/index.js";

const Product = databaseConfiguration.databaseInstance.define('product', {

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
            model: 'category', //the model INSIDE databaseInstance.models. It gets it´s name from the first parameter of the sequelize.define() method.
            key: 'id'
        }
    },
    // }, {
    //     defaultScope: {
    //         attributes: { exclude: ['categoryId'] }
    //     }
});

await Product.sync({ alter: true });

export default Product;