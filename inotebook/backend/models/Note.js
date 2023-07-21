const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewsSchema = new Schema({
    // used concept  of foreignkey derived user id from user database.
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user' 
    },
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    tag: {
        type: String,
    },
    date: {
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model('notes', NewsSchema)