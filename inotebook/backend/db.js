const mongoose=require('mongoose');

const mongoURI='mongodb://127.0.0.1:27017/inotebook'
const connectTomongo = ()=>{
    mongoose.connect(mongoURI)
    console.log("connected");
}

module.exports  = connectTomongo;

// 