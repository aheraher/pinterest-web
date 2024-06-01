
import mongoose from "mongoose"

 let MongoUrl = process.env.MongoUrl
 export default MongoUrl

 const ConnectMongo =async ()=>{
try {
    await mongoose.connect(MongoUrl || "" ) 
    console.log("conection done .");
    
} catch (error) {
    console.log(error);
    
}

}

// export default ConnectMongo