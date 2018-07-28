const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    firstvar: String
});

module.exports = mongoose.model('myVar', mySchema);