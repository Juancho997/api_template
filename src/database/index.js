import { Sequelize } from "sequelize";

// export const stage = 'development';

export const databaseInstance = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.DB_HOST}`,
    dialect: `${process.env.DB_DIALECT}`
});

const testDatabaseInstance = new Sequelize(`${process.env.DB_NAME_TESTING}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.DB_HOST}`,
    dialect: `${process.env.DB_DIALECT}`
});


export const connectDatabase = async (databaseInstance) => {
    try {

        await databaseInstance.authenticate();

        console.log(`Database > CONNECTED`);

    } catch (error) {
        console.error('There was an error trying to authenticate the database connection >', error);
        return;
    }
};


export const associateTables = async (databaseInstance) => {

    try {
        const { products, categories } = databaseInstance.models;

        // categories.hasMany(products);

        // products.belongsTo(categories);


        categories.hasMany(products, {
            foreignKey: 'categoryId'
        });

        products.belongsTo(categories, {
            foreignKey: 'id',
            target_key: 'categoryId'
        })

        console.log("Tables associations > DONE");

    } catch (error) {
        console.log('There was an error trying to associate the tables >', error);
        return
    }
};