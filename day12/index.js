const express = require('express')

const app = express()
const port = 3001

app.set('view engine', 'hbs')
app.set('views', 'src/views')

app.use('/assets', express.static('src/assets'))

// get: mengambil data dari server ke client
// resuest: permintaan client ke server 
// response: tanggapa dari server ke client
app.get('/', home)
app.get('/contact', contact)
app.get('/addProject', addProject)


function home(req, res){
  res.render('bootstrap-index')
}

function contact(req, res){
  res.render('bootstrap-contact')
}

function addProject(req, res){
  res.render('bootstrap-addproject')
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})