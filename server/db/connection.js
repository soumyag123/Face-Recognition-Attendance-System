const mongoose = require('mongoose');
const DB_URL = process.env.MONGO_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,

}).then(() => {
    console.log('connected');
}).catch((err) => {
    console.log(err);
});