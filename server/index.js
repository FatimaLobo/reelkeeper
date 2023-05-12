import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import db from './config/db.js'
import userRoutes from './routes/routes.js'
import registerRoutes from './routes/signup.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/users', userRoutes)
app.use('/signup', registerRoutes)

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

try {
    db.authenticate()
    console.log("Connected to DB")
} catch (error) {
    console.error("Error connecting to DB: ", error)
}

app.listen(8000, () => {
    console.log("Server UP running in http://localhost:8000/")
})