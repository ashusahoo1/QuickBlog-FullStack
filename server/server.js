import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

await connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res)=> res.send("API is Working"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server is running on port ' + PORT)
})

export default app;



/*

✅ 1. app.use(cors())
🔒 What it does:
This enables CORS (Cross-Origin Resource Sharing).

It tells the server:
➜ "Allow requests from other domains (like your frontend on localhost:3000)."

🔍 Without this:
Your frontend (like a React app) will get a CORS error when trying to make API calls.

✅ 2. app.use(express.json())
📦 What it does:
It parses incoming JSON data from the request body and makes it accessible as req.body.

🔍 Without this:
req.body would be undefined in POST or PUT requests where you send JSON.

*/