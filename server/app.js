require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jobRoutes = require('./routes/jobRoutes');
const cors = require('cors');

const app = express();


app.use(cors({
  origin: ["http://localhost:3000", "https://jobmanagement-cm.onrender.com"],
  credentials: true
}));
app.use(express.json());

app.use('/api', jobRoutes);


const db = require('./DB/connection/db')
const dbConnect = async () => {
  const connectionMessage = await db()
  console.log(connectionMessage)
}
dbConnect()


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The Server is running on PORT: ${PORT}`)
})