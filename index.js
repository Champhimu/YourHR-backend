const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config();
require('./db/conn')  // Connect to DB

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(require('./routes/userRoutes.js'))

app.listen(PORT, '0.0.0.0', () => {
    console.log('Connected to port: http://localhost:' + PORT);
})