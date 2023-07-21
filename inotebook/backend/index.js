const connectTomongo = require('./db');
const express = require('express')
var cors = require('cors')
var app = express()

connectTomongo();

app.use(cors())
const port = 12000;
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})