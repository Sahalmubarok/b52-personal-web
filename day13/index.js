const express = require('express')
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
// app.get('/project', project)
app.post('/addProject', addProject)
app.get('/addProject', addProjectViews)

app.get('/addDetail/:id', addDetail)

app.get('/contact', contact)

app.get('/delete/:id', handleDeleteAdd)

app.post('/edit-add', editAdd)
app.get('/edit-add/:id', editAddViews)

// Data source
let days = ""
let months = "" 
const data = []

function home(req, res){
  res.render('bootstrap-index', {data})
}

// function project(req, res){
  //   const data = [
//     {
//       id: 1,
//       title: "Data 1",
//       content: "Content 1"
//     },
//     {
  //       id: 2,
//       title: "Data 2",
//       content: "Content 2"
//     },
//     {
  //       id: 3,
//       title: "Data 3",
//       content: "Content 3"
//     }
//   ]
//   res.render('bootstrap-project', {data})
// }

function addProject(req, res){
  let {projectName, startDate, endDate, desc, node, react, next, typescript } = req.body

  // data.push({projectName, startDate, endDate, desc, node, react, next, typescript})

  if (typeof node === 'undefined') {
    node = false
  }
  if (typeof next === 'undefined') {
      next = false
  }
  if (typeof react === 'undefined') {
      react = false
  }
  if (typeof typescript === 'undefined') {
      typescript = false
  }

  let checkbox = { node, react, next, typescript }

    const dataProject = {
        projectName, startDate, endDate, desc, node, react, next, typescript, duration: waktu(startDate, endDate),
        techs: Icon(checkbox)
    }
    data.unshift(dataProject)
  
  // console.log(dataProject);
  res.redirect('/')
}

function addProjectViews(req, res){
  res.render('bootstrap-addProject')
}

function addDetail(req, res){
  const {id} = req.params

  const dataDetail = data[id]
  
  // console.log(dataDetail);
  res.render('bootstrap-detail', {data: dataDetail})
}

function contact(req, res){
  res.render('bootstrap-contact')
}

function handleDeleteAdd(req, res){
  const {id} = req.params
  data.splice(id,1)
  // console.log('berhasil-delete id', id);
  res.redirect('/')
}

function editAdd(req, res) {
  let {id, projectName, startDate, endDate, desc, node, react, next, typescript } = req.body

  if (typeof node === 'undefined') {
    node = false
  }
  if (typeof next === 'undefined') {
      next = false
  }
  if (typeof react === 'undefined') {
      react = false
  }
  if (typeof typescript === 'undefined') {
      typescript = false
  }

  let checkbox = { node, react, next, typescript }
  const dataProject = {
      id,
      projectName,
      startDate,
      endDate,
      desc,
      node,
      next,
      react,
      typescript,
      duration: waktu(startDate, endDate),
      techs: Icon(checkbox)
  }
    data[parseInt(id)] = dataProject
  res.redirect('/')
}

function editAddViews(req, res){
  const { id } = req.params
  const dataFilter = data[parseInt(id)]
  dataFilter.id = parseInt(id)
  console.log("Data Filter", dataFilter)

  res.render('edit-add', { data: dataFilter })
}

function waktu(awal, akhir) {

  let dataStart = new Date(awal)
  let dataEnd = new Date(akhir)
  let oneDay = 1000 * 3600 * 24

  let selisih = dataEnd.getTime() - dataStart.getTime()
  let totaldays = selisih / oneDay
  months = Math.floor(totaldays / 30)
  days = totaldays % 30
  if (months > 0) {
      return months + " Bulan"
  } else if (days > 0) {
      return days + " Hari"
  }
}

function Icon(icon) {

  let codeIcon = ""

  if (icon.node) {
      codeIcon += `<div class="col-md-auto"><img src="/assets/icon/nodejs.png"></div>`
  }
  if (icon.next) {
      codeIcon += `<div class="col-md-auto"><img src="/assets/icon/nextjs.png"></div>`
  }
  if (icon.react) {
      codeIcon += `<div class="col-md-auto"><img src="/assets/icon/reactjs.png"></div>`
  }
  if (icon.typescript) {
      codeIcon += `<div class="col-md-auto"><img src="/assets/icon/typescript.png"></div>`
  }

  return codeIcon
}

function newDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Augu", "Sept", "Oct", "Nov", "Dec"];

  const d = new Date(date)

  let day = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()

  return `${day} ${month} ${year}`
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

