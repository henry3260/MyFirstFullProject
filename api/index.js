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
    const { name, description, datetime, price} = req.body;
    const transaction = await Transaction.create({ name, description, datetime, price});
    res.json(transaction);
});

// 监听端口4040
const PORT = 4040;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
