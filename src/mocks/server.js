import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/exibits', (req, res) => {
    fs.readFile('src/mocks/data.json', 'utf8', (error, exibits) => {
        if (error) {
            res.status(500);
            console.log(error);
        }
        console.log(exibits);
        res.status(200).send(exibits);
    });
});

const port = 3000;
app.listen(port, () => {
    process.stdout.write(`Mocks listening on ${port}`);
});
