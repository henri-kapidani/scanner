import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import express from 'express';
import cors from 'cors';

const port = 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/', express.static(path.join(__dirname, 'public')));
app.post('/upload', function (req, res) {
    try {
        const arr = req.body.picture.split(',');
        const mime = arr[0].match(/:(.*?);/)[1].split('/')[1];
        const img = arr[1];
        fs.writeFileSync(
            path.join(__dirname, 'uploads', Date.now() + '.' + mime),
            Buffer.from(img, 'base64')
        );
        res.sendStatus(200);
    } catch (err) {
        res.send(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
