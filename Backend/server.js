const express = require("express")
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require("./DataBase/config");
connectDB();
const cors = require("cors");
const clubRoutes = require("./Routes/Clubs");
const opportunityRoutes = require("./Routes/opportunity");

const app = express()
app.use(express.json())
app.use(cors())
app.use("/clubs", clubRoutes);
app.use("/opportunities", opportunityRoutes);

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello World!")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
