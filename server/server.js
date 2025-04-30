const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("../server/config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(
    cors({
        origin : process.env.CLIENT_URL || "*",
        methods : ["GET","PUT","POST","DELETE"],
        allowedHeaders : ["Content-type","Authorization"]
    })
);

connectDB();

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);

//allows frontend or user to acces the file in the browser using URL
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server is runnning on the port ${PORT}`)
});