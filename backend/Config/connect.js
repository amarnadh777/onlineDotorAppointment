const mongoose = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/doctorAppointment', {
        
  
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}

connectToDb();
module.exports = connectToDb