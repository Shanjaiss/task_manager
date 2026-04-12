import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/auth.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*', // allow all (for now)
  })
);

app.use(express.json());

app.use('/api/auth', router);

app.listen(5001, () => {
  console.log('Server running on port 5001');
});
