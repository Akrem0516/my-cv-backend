const express = require("express")
const cors = require("cors");
const path = require("path");



const app = express()

const PORT = process.env.PORT || 8000;

app.listen(PORT , () => {
    console.log(`app is running on PORT ${PORT}`);
});

app.use(cors());
app.use(express.json());

