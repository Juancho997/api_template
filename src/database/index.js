import { Sequelize } from "sequelize";

const stage = 'development'; //process.env.NODE_ENV;

let databaseInstance;

if (stage === 'development') {

    databaseInstance = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
        host: `${process.env.DB_HOST}`,
        dialect: `${process.env.DB_DIALECT}`
    });

} else if (stage === 'testing') {

    databaseInstance = new Sequelize(`${process.env.DB_NAME_TESTING}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
        host: `${process.env.DB_HOST}`,
        dialect: `${process.env.DB_DIALECT}`
    });

}

const connectDatabase = async () => {
    try {

        await databaseInstance.authenticate();
        console.log(`Database ${process.env.DB_NAME} > CONNECTED`);


        const { products, categories } = databaseInstance.models;

        categories.hasMany(products, {
            foreignKey: 'categoryId'
        });

        products.belongsTo(categories, {
            foreignKey: 'categoryId',
            as: 'category'
        });

        console.log("Tables associations > DONE");


    } catch (error) {
        console.error('There was an error trying to authenticate the database connection >', error);
        return;
    }
};


const databaseConfiguration = {
    databaseInstance,
    connectDatabase
};

export default databaseConfiguration;