import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
// import { getFoodImage } from "./controllers/foodController.js"

// app config
const app = express()
const port = process.env.PORT || 3000;

// const coreOptions = {
//   origin:"https://getfoodymood.netlify.app",
//   methods:["GET","POST","PUT","DELETE"],
//   allowedHeaders:["Content-Type","Authorization"],
// }
// middlewares
app.use(express.json());
app.use(cors())

// db connection
connectDB();
// console.log('gfs on server.js...',gfs);

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('public/uploads'))
// app.use('/images', express.static(path.join(__dirname, 'public', 'uploads')));
// app.use("/images",express.static('uploads'))
// app.use("/images/:id", getFoodImage)
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))

// export default gfs;
