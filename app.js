const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config();
const port = 4000;
const app = express();

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));

function generateSegitiga(inputNumber) {
    let segitiga = "";
    const inputStr = inputNumber.toString();

    for (let i = 0; i < inputStr.length; i++) {
        segitiga += "0".repeat(i) + inputStr.slice(i) + "\n";
    }

    return segitiga;
}

function generateBilanganGanjil(maxNumber) {
    let ganjil = "";
    for (let i = 1; i <= maxNumber; i += 2) {
        ganjil += i + "\n";
    }
    return ganjil;
}

function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

function generateBilanganPrima(maxNumber) {
    let prima = "";
    for (let i = 2; i <= maxNumber; i++) {
        if (isPrime(i)) {
            prima += i + "\n";
        }
    }
    return prima;
}

app.post("/calculate", (req, res) => {
    const inputNumber = parseInt(req.body.inputNumber);
    const action = req.body.action;
    let result = "";

    if (isNaN(inputNumber)) {
        return res.status(400).json({ error: "Input harus berupa angka." });
    }

    if (action === "segitiga") {
        result = generateSegitiga(inputNumber);
    } else if (action === "bilangan_ganjil") {
        result = generateBilanganGanjil(inputNumber);
    } else if (action === "bilangan_prima") {
        result = generateBilanganPrima(inputNumber);
    }

    res.json({ result });
});

app.get("/", (req, res) => {
    res.status(200).json({ status: 200, message: "server running" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
