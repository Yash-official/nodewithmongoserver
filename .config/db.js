const mongoose=require("mongoose")
const dbconfig = require("./dbconfig")
const dbConfig=require("./dbconfig")

const connectDB=async()=> {
    try{
        const conn=await mongoose.connect(dbConfig.database,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        }
        )
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    }
    catch(e)
    {console.log(e)
    process.exit(1)}
}
module.exports=connectDB