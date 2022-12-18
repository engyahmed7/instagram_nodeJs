const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const createConnection = () => {
    mongoose.connect(process.env.MONGODB_CONN)
        .then((res) => console.log('> Connected.'))
        .catch(err => console.log(`> Error while connecting to mongoDB : ${err.message}`))
}

module.exports = createConnection;