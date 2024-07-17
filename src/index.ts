//@ts-nocheck
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
