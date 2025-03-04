import express from 'express';
import { PORT , DB_URI } from './config/env.js';
import authRouter from './routers/auth.routes.js';
import userRouter from './routers/user.routes.js';
import subscribtionRouter from './routers/subscribtion.routes.js';
import connectToMongoDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

console.log(PORT);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscribtions', subscribtionRouter);
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Hello from Express');
});



app.listen(PORT, async() => {
    console.log(`Server is running on http://localhost:${PORT}`);
     await connectToMongoDB();
});

export default app; 