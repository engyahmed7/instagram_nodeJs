const express = require('express')
var cors = require('cors')
const app = express()
var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))
const bodyParser = require('body-parser')
const path = require('path')
const createConnection = require('./DB/connection')
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