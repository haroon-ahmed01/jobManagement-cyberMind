const mongoose = require('mongoose');


const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    if(db) {
      return "DB Connceted Successfully";
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
};

module.exports = dbConnect;