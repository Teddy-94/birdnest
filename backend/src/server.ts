import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/routes';
import { databaseConnection } from './config/db';
import "dotenv/config";

const app = express();

app.use(cors());
app.use(morgan("dev"))
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 5001;

databaseConnection();

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});