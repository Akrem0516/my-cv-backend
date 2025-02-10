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

// Serve React static files
app.use(express.static(path.join(__dirname, "../my-cv/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-cv/build", "index.html"));
});