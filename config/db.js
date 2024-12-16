import  Grid  from "gridfs-stream";
import mongoose from "mongoose";

let gfs;
export const  connectDB = async () =>{

    await mongoose.connect(`${process.env.DBCONNECT_KEY}/food-del`).then(()=>{
        console.log("DB Connected");
        gfs = Grid(mongoose.connection.db,mongoose.mongo);
    });
}

export default gfs;
// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.