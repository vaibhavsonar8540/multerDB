const express = require('express');
const cors= require('cors');
const upload = require('./configue/Multer');
const {connectDB, File} = require('./configue/db');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('uploads')); // Serve static files from the 'uploads' directory

app.get('/', (req, res) => {  
    res.send('Hello, World!');
})

app.post('/api/file/upload', upload.single("file"), async(req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
    //databse
    console.log(req.file.filename);
    try {
        await File.create({
        filename: req.file.filename
    });
    } catch (error) {
        res.status(500).send("Error saving file to database.");
        return;
    }
  res.send({ message: "File uploaded successfully", filename: req.file.filename });
});

app.get('/api/file/get', async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    }
    catch (error) {
        res.status(500).send("Error retrieving files from database.");
        return; }
})

app.listen(3000, async() => {
    await connectDB();
  console.log('Server is running on http://localhost:3000');
});