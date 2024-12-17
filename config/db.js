// import Grid from "gridfs-stream";
import mongoose from "mongoose";

// let gfs;
export const connectDB = async () => {
//   return new Promise(async (resolve, reject) => {
    try {
      await mongoose
        .connect(`${process.env.DBCONNECT_KEY}/food-del`)
        .then(() => {
          console.log("DB Connected");
        //   gfs = Grid(mongoose.connection.db, mongoose.mongo);
        //   gfs.collection("uploads");
        //   console.log("GridFS Initialized...gfs....");
        });
    } catch (error) {
      console.error("Error connecting to DB or initializing GridFS:", error);
    }
    // return gfs;
//   });
};

// console.log("gfs....", gfs);

// export default gfs;

// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.
