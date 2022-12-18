const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const createConnection = require('./DB/connection')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
createConnection()
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

const authRoute = require('./routers/authRoute')
const userRoute = require('./routers/userRoute')
const postRoute = require('./routers/postRoute')
const commentRoute = require('./routers/commentRoute')
const admineRoute = require('./routers/admineRoute')

const {
    initIO
} = require('./service/initSocket')
// const User = require('./models/user')
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use(commentRoute)
app.use('/admin', admineRoute)

app.get('/', (req, res) => {
    res.send('hello from nodejs project :)')
})

const server = app.listen(port, () => console.log('> Server is up and running on port : ' + port))

const io = initIO(server);
io.on('connection', (socket) => {
    socket.on('updateSocketID', async (data) => {
        await User.findByIdAndUpdate(data, {
            socketID: socket.id
        })
    })
})