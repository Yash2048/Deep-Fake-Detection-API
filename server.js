const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

const port = process.env.PORT ;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('video'), (req, res) => {
  console.log(req.body)
  console.log(req.file)
  if (!req.file) {
    return res.status(400).json({err:'No file uploaded.'});
  }
  
  res.json({ message: 'File uploaded successfully.' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
