import express from 'express';
import mongoose from 'mongoose';

import router from './routes/user-routes';
const app = express();
app.use(express.json());
app.use("/api/user",router);
mongoose
.connect('mongodb+srv://rani_tripathi_:H693maseZWWxf2xY@blog.rrp9tyf.mongodb.net/?retryWrites=true&w=majority&appName=Blog')
.then(()=>app.listen(5000))
.then(()=>console.log("listening to localhost")).catch((err)=>console.log('hi',err));
// const port = 5000

// app.get('/api', (req, res) => {
//   res.send('Hello World!')
// }) 

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
