
const connectToMongo = require('./config/db');
const express = require('express');
const port = 3000
connectToMongo();
const app = express();

app.use(express.json())

// Available Routes for Users
app.use(require('./routes/users'))
app.listen(port,()=>{
    console.log(`listening on port at http://localhost:${port}`)
})