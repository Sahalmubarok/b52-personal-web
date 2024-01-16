const express = require('express')

const app = express()
const port = 3000

// get: mengambil data dari server ke client
// resuest: permintaan client ke server 
// response: tanggapa dari server ke client
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})