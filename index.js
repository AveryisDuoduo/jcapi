import express from 'express';
import fs from 'fs/promises';

const app = express();
const port = process.env.PORT || 3001;

let jsonData;

const readJson = async () => {
    const data = await fs.readFile('data.json', 'utf-8');
    jsonData = JSON.parse(data);
};

readJson().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

app.get('/red/:red', (req, res) => {
    const redColor = req.params.red;
    if (jsonData.red[redColor]) {
        res.send(jsonData.red[redColor]);
    } else {
        res.status(404).send({ error: "Red color not found" });
    }
});

app.get('/blue', (req, res) => {
    const blueColor = req.query.blue;  
    if (jsonData.blue[blueColor]) {
        res.send(jsonData.blue[blueColor]);
    } else {
        res.status(404).send({ error: "Blue color not found" });
    }
});


app.get('/combination/:red/:blue', (req, res) => {
    const redColor = req.params.red;
    const blueColor = req.params.blue;
    const combinationKey = `${redColor}_${blueColor}`;

    if (jsonData.combination[combinationKey]) {
        res.send(jsonData.combination[combinationKey]);
    } else {
        res.status(404).send({ error: "Red and Blue combination not found" });
    }
});