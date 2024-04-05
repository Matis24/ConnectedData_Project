import express from 'express';
import logger from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import specs from './routes/swagger.js';
import speciesRoute from './routes/PlantNetRouter.js';
import mistralRoute from './routes/MistralRouter.js';
import locationRoute from './routes/gbifRouter.js';


const app = express();

// Add the information about the logger
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));

// Add the swagger documentation
app.use("/api_docs", swaggerUi.serve, swaggerUi.setup(specs));


// Add differents route for the backend
app.use('/species', speciesRoute);
app.use('/species', mistralRoute);
app.use('/species', locationRoute);


export default app;