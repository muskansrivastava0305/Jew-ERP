const mongoose = require('mongoose');

const mongo_URI = process.env.MONGO_URI;

mongoose.connect(mongo_URI)
.then (() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.log("MongoDB connection failed");
});
