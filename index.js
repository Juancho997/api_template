import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import { connectDatabase } from './src/database/index.js';
import router from './src/routes/index.routes.js';


export const server = express();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "mySQL API",
            version: "1.0.0",
            description: "A simple Express API with a mySQL connection"
        },
        servers: [
            {
                url: `${process.env.URL}`
            }
        ]
    },
    apis: ["./src/routes/*.routes.js"]
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);


server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan('dev'));

server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

server.use(router);


(function initializeApp() {
    try {

        server.listen(`${process.env.PORT}`, () => {
            console.log(`Server on port > ${process.env.PORT}`);
        });
        connectDatabase();
        return;

    } catch (error) {
        console.error('There was an error trying to initialize the server >', error)
        return;
    };
})();