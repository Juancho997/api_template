import { Sequelize } from "sequelize";


export const databaseInstance = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.DB_HOST}`,
    dialect: `${process.env.DB_DIALECT}`,
});


export const connectDatabase = async () => {
    try {

        await databaseInstance.authenticate();
        console.log(`Database ${process.env.DB_NAME} > CONNECTED`);


        const { products, categories } = databaseInstance.models;

        categories.hasMany(products);

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



