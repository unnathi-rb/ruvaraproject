const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ruvaara:9OiYylN1NHaP2S0Q@ruvara.gd2lddk.mongodb.net/ruvara', {
      useNewUrlParser: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
