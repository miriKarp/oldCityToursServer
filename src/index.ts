import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoute from './routes/user';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api/users', userRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});