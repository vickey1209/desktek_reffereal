const express = require("express")
const dotenv = require("dotenv")
dotenv.config();
const app = express()
const userRoutes = require("./routes/userRoutes")
const db = require("./db/conn")
const PORT = process.env.PORT || 5000
db();

app.use('/api/users', userRoutes);





app.listen(PORT , ()=>{
    console.log(`server is running at port ${PORT}`);
    
})