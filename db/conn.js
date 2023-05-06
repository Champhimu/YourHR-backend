const mongoose = require('mongoose');

mongoose.set('strictQuery',false)
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Connected to DB...")
}).catch((e)=>{
    console.log("Failed to connect! Error: "+e);
})