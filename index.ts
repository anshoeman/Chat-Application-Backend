import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('This is typescript running in hoodie');
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`))