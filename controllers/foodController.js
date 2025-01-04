// import mongoose from "mongoose";
// import gfs from "../config/db.js";
// import streamifier from 'streamifier';  // Import streamifier to convert buffer to readable stream
import foodModel from "../models/foodModel.js";
// import fs from "fs";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";
// import gfs from "../server.js";
// import Grid from "gridfs-stream";

// let gfs = Grid(mongoose.connection.db, mongoose.mongo);
// gfs.collection("uploads");
// console.log('gfs...',gfs);

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// get food image

// const getFoodImage = (req, res) => {
//   const fileId = req.params.id; // Get the file ID from the URL parameter

//   // Find the file by its GridFS file ID
//   gfs.files.findOne({ _id: mongoose.Types.ObjectId(fileId) }, (err, file) => {
//     if (err || !file) {
//       // If file is not found or an error occurs, send a 404 response
//       return res.status(404).send("File not found");
//     }

//     // Set the correct Content-Type for the image
//     res.set("Content-Type", file.contentType);

//     // Create a read stream to fetch the file from GridFS
//     const readstream = gfs.createReadStream({ _id: file._id });

//     // Pipe the file stream directly to the response so the image is served
//     readstream.pipe(res);
//   });
// };

// add food

// const addFood = async (req, res) => {
//   try {
//     // Check if a file was uploaded
//     console.log("inside try....");
//     if (!req.file) {
//       return res
//         .status(400)
//         .json({ success: false, message: "No file uploaded" });
//     }

//     // Destructure file from req.file
//     const { originalname, buffer, mimetype } = req.file;

//     // const readableStream = streamifier.createReadStream(buffer);
    
//     console.log('gfs inside foodcontroller...',gfs);

//     // Create a writable stream to GridFS
//     const writestream = gfs.createWriteStream({
//       filename: originalname,
//       content_type: mimetype,
//     });

//     // Pipe the file buffer to GridFS
//     // readableStream.pipe(writestream);
//     writestream.write(buffer);
//     writestream.end();

//     writestream.on("close", async (file) => {
//       console.log("file......", file);
//       const result = await saveFoodData(req.body, file._id);

//       if (result.success) {
//         res
//           .status(200)
//           .json({ success: true, message: "Food added successfully" });
//       } else {
//         res.status(500).json({ success: false, message: result.message });
//       }
//     });

//     writestream.on("error", (err) => {
//       res
//         .status(500)
//         .json({ success: false, message: "Error uploading image", error: err });
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server error", error });
//   }
// };

// const saveFoodData = async (data, id) => {
//   const foodData = {
//     name: data.name,
//     description: data.description,
//     price: data.price,
//     category: data.category,
//     image: id, // Store the GridFS file ID in the database
//   };
//   try {
//     // Create a new instance of foodModel and save it to MongoDB
//     const food = new foodModel(foodData);
//     await food.save();
//     return { success: true, food }; // Return success and the saved food object
//   } catch (error) {
//     console.log(error);
//     return { success: false, message: "Error saving food data" }; // Handle errors
//   }
// };



const addFood = async (req, res) => {
  // console.log('req..',req.file);

    try {
      const uploadedImage = await uploadImageClodinary(req.file);
           console.log("uploadedImage.url...",uploadedImage.url);
           console.log("typeof req.body.price..",typeof req.body.price);
        // let image_filename = `${req.file.filename}`
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category,
            image: uploadedImage.url,
        })

        await food.save();
        res.json({ success: true, message: "Food Added",image:uploadedImage.url })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    // fs.unlink(`public/uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { listFood, addFood, removeFood,
  //  getFoodImage 
  };
