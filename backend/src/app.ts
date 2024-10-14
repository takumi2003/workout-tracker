import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

// ルートパスのハンドラーを追加
app.get('/', (req, res) => {
  res.send('Welcome to the Workout Tracker API');
});

app.use('/api/users', userRoutes);

// エラーハンドリングミドルウェア
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import db from './db';  // 既に定義されたデータベース接続プールをインポート

async function testDbConnection() {
  try {
    const result = await db.query('SELECT 1');
    console.log('Database connection successful:', result.rows);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

// アプリ起動時に接続を確認
testDbConnection();


export default app;
