const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const FILE = "./visitors.json";

/* INIT */
function readData() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, JSON.stringify({ visitors: 0 }));
    }
    return JSON.parse(fs.readFileSync(FILE));
}

function saveData(data) {
    fs.writeFileSync(FILE, JSON.stringify(data));
}

/* GET VISITORS */
app.get("/api/visitors", (req, res) => {
    const data = readData();
    res.json(data);
});

/* ADD VISITOR */
app.post("/api/visit", (req, res) => {
    const data = readData();
    data.visitors += 1;
    saveData(data);

    res.json({ visitors: data.visitors });
});
app.get("/", (req, res) => {
    res.send("🚀 Backend is running");
});
/* START SERVER */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});