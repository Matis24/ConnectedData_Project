import express from 'express';
import logger from 'pino-http';
import speciesRoute from './routes/PlantNetRouter.js';
import mistralRoute from './routes/MistralRouter.js';
import locationRoute from './routes/gbifRouter.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));


// Use speciesRoute for the path /species and /species/commonNames
app.use('/species', speciesRoute);
app.use('/species', mistralRoute);
app.use('/species', locationRoute);


export default app;