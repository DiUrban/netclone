// Router
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users')
const movieRoute = require('./routes/movies')
const listRoute=require('./routes/lists')
/*Express*/
const express = require("express");
const app = express();
/*Dotenv */
const dotenv = require('dotenv');
dotenv.config();
/*mongoose*/
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {}).then(() => console.log("Connected to mongoDB")).catch((err) => console.log(err));
// Cors
const cors = require('cors')
app.use(cors());
// App
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(8800, () => {
    console.log("\u001b[1;36m Server is running");
})
