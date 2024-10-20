// app.ts
import express from 'express';
import userRoutes from './routes/user.routes';
import db from './db';

const app = express();
app.use(express.json()); // JSONボディのパース

// ルーティング
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
