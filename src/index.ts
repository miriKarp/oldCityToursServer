import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import tourRoute from './routes/tours.route';
import userRoute from './routes/user.route';
import businessRoute from './routes/business.route';
import serviceRoute from './routes/services.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import protectedRoutes from './routes/user.route';

dotenv.config();

const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());

connectDB();

app.use(express.json());

app.use('/api/tours', tourRoute);

app.use('/api/services', serviceRoute)

app.use('/api/business', businessRoute)

app.use('/api/users', userRoute);

app.use('/api', protectedRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
    res.send('ברוכים הבאים לאתר שלנו old cities tours!!!');
});

app.use((req, res, next) => {
    res.status(404).send('API Route not found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
