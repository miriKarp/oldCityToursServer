import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import tourRoute from './routes/tours.route';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import serviceRoute from './routes/services.route';
import businessRoute from './routes/business.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import protectedRoutes from './routes/user.route';
import { protect, adminOnly } from './middlewares/users.middleware';

dotenv.config();

const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', authRoute);
app.get('/', (req: Request, res: Response) => {
    res.send('ברוכים הבאים לאתר שלנו old cities tours!!!');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/services', serviceRoute)
app.use('/api/business', businessRoute);

app.use(protect);

app.use('/api/users', userRoute);
app.use('/api/tours', tourRoute);

app.use((req, res, next) => {
    res.status(404).send('API Route not found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
