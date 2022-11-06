import express from 'express'
import auth from './routes/auth'
const app = express()
import cors from 'cors'
app.use(express.json())
app.use(express.urlencoded({extended:false}))
require('dotenv').config
app.get('/', (req, res) => {
    res.send('This is typescript running in hoodie');
})
app.use(cors())
app.use('/auth',auth);
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`))