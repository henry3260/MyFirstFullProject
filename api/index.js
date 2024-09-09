const express = require('express'); //引入express 模組
const cors = require(`cors`);
require(`dotenv`).config();
const Transaction = require(`./models/Transaction.js`);
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

// 定义一个 GET 路由处理程序
app.get('/api/test', (req, res) => {
    res.json({ body: 'test ok' });
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const { name, description, datetime, price } = req.body;
    const transaction = await Transaction.create({ name, description, datetime, price });
    res.json(transaction);
}); //接收client發送的交易數據，把數據存到資料庫

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find(); //從資料庫獲取所有交易紀錄
    res.json(transactions); //返回所有交易紀錄
});

// 监听端口4040
const PORT = 4040;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
