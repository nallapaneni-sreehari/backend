const mongoose = require('mongoose');


var db = null;
async function connectDb(){
    const url="mongodb+srv://r151149:sree123@cluster0.ecexy.mongodb.net/ECommerceAppDb?retryWrites=true&w=majority";
    
    try
    {
        db = mongoose.connection;
        mongoose.connect(url,{ useNewUrlParser: true });
        db.once('open', _=>{
            console.log("Connected to Database !");
        });
        db.on('error', err=>{
            console.log("Error connecting to Database..!");
            process.exit(1);
        });

    } catch(err)
    {
        console.log("Error while connection to DB",err);
        process.exit(0);
    }

    return db;
}

module.exports = {connect:connectDb};
