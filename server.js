import express from 'express';
import multer from 'multer';

const app = express();
const port = process.env.PORT;

app.listen(port,()=>{
    `listening at the port ${port}`
})