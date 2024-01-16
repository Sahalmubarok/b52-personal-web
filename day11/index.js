const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', 'src/views')

app.use('/assets', express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))

// get: mengambil data dari server ke client
// resuest: permintaan client ke server 
// response: tanggapa dari server ke client
app.get('/', home)
app.get('/contact', contact)
app.get('/project', project)
app.post('/addProject', addProject)
app.get('/addProject', addProjectViews)
app.get('/addDetail/:id', addDetail)

function home(req, res){
  res.render('bootstrap-index')
}

function contact(req, res){
  res.render('bootstrap-contact')
}

function project(req, res){
  const data = [
    {
      id: 1,
      title: "Data 1",
      content: "Content 1"
    },
    {
      id: 2,
      title: "Data 2",
      content: "Content 2"
    },
    {
      id: 3,
      title: "Data 3",
      content: "Content 3"
    }
  ]
  res.render('bootstrap-project', {data})
}

function addProject(req, res){
  const {projectName, startDate, endDate, desc, checkbox} = req.body
  
  console.log('Project:', projectName)
  console.log('Start Date:', startDate)
  console.log('End Date:', endDate)
  console.log('Description:', desc)
  console.log('Technologies:', checkbox)
  
  res.render('bootstrap-addproject')
}

function addProjectViews(req, res){
  res.render('bootstrap-addProject')
}

function addDetail(req, res){
  const {id} = req.params

  console.log(id)
  res.render('bootstrap-detail', {id})
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

