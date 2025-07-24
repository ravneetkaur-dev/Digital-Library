const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db');
const cors = require('cors');
const facultyRouter = require('./routes/facultyrouter');
const adminRouter = require('./routes/adminrouter');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
db();
app.use(cors());
app.use(express.json());
app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
});