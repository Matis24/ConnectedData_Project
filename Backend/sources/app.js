import express from 'express';
import logger from 'pino-http';
import speciesRoute from './routes/PlantNet.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));


// Use speciesRoute for the path /species and /species/commonNames
app.use('/api/v1/species', speciesRoute);

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000/species');
// });
export default app;