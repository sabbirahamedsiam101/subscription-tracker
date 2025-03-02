import express from 'express';
import { PORT } from './config/env.js';
import authRouter from './routers/auth.routes.js';
import userRouter from './routers/user.routes.js';
import subscribtionRouter from './routers/subscribtion.routes.js';

console.log(PORT);

const app = express();


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscribtions', subscribtionRouter);

app.get('/', (req, res) => {
    res.send('Hello from Express');
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app; 