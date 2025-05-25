require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jobRoutes = require('./routes/jobRoutes');
const cors = require('cors');
const PORT = 3000


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', jobRoutes);


// DB Connection
const db = require('./DB/connection/db')
const dbConnect = async () => {
  const connectionMessage = await db()
  console.log(connectionMessage)
}
dbConnect()



app.listen(PORT, () => {
  console.log(`The Server is running on PORT: ${PORT}`)
})