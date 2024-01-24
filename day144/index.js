const express = require('express')
const app = express()
const port = 3000

// const {projects, users} = require ('./models')
//sequelize configurasi
const {development} = require('./config/config.json') //destructuring
const { Sequelize, QueryTypes, SequelizeScopeError } = require('sequelize') //interaksi
const sequelize = new Sequelize(development) //koneksi
// const formatDate = require('./src/helper/formatDate.js');

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

async function home(req, res){
  try {
    const query = await sequelize.query("SELECT * FROM projects", {type: QueryTypes.SELECT})
    const data = query.map(res => ({
      ...res,
    }))

    console.log(query)
    res.render('bootstrap-index', {data})
  } catch (error){
      throw error
  }
}

async function addProject(req, res){

  try {
    const { projectName, startDate, endDate, description, technologies } = req.body;
 
    // const start = formatDate(startDate)
    // const end = formatDate(endDate)

    const startDateNew = new Date(startDate).getTime()
    const endDateNew = new Date(endDate).getTime()
    const difdate = endDateNew - startDateNew
    
    const day = 24 * 60 * 60 * 1000;
    const duration = difdate/day;

    const query = `
    INSERT INTO public.projects(name, start_date, end_date, duration, description, technologies, "createdAt", "updatedAt") 
    VALUES ('${projectName}', '${startDate}', '${endDate}', '${duration}', '${description}', '{${technologies}}', NOW(), NOW())`
    
    const obj = await sequelize.query(query, { type: QueryTypes.INSERT })
    data.unshift('Data berhasil disimpan', { obj })

  console.log("query jalan:",query);
  res.redirect('/')
  } catch (error) {
    throw error;
  }
}

function addProjectViews(req, res){
  res.render('bootstrap-addProject')
}

async function addDetail(req, res){

  const { id } = req.params //destructuring

    const query = `SELECT * FROM projects WHERE id=${id} `
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log("ini adalah id ke", obj)
    res.render('bootstrap-detail', { data: obj[0] })
}

function contact(req, res){
  res.render('bootstrap-contact')
}

async function handleDeleteAdd(req, res){
    const {id} = req.params
    const data = await sequelize.query(`DELETE FROM projects WHERE id =${id}`);

    res.redirect('/')
}

async function editAdd(req, res) {
    const { id, projectName, startDate, endDate, description, technologies } = req.body;

    const startDateNew = new Date(startDate).getTime()
    const endDateNew = new Date(endDate).getTime()
    const difdate = endDateNew - startDateNew
    
    const day = 24 * 60 * 60 * 1000;
    const duration = difdate/day;

    const query = `UPDATE projects SET id='${id}',name='${projectName}', start_date='${startDate}', 
    end_date='${endDate}', duration='${duration}', description='${description}', technologies='{${technologies}}' WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE })

    res.redirect('/')
}

async function editAddViews(req, res){
  const { id } = req.params

    const query = `SELECT * FROM projects WHERE id=${id} `
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    res.render('edit-add', { data: obj[0] })
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

app.locals.waktu = waktu

// function formatDate(date) {
//   const yyyy = date.getFullYear();
//   const mm = String(date.getMonth() + 1).padStart(2, '0');
//   const dd = String(date.getDate()).padStart(2, '0');
//   return `${yyyy}-${mm}-${dd}`;
// }

// function Icon(icon) {

//   let codeIcon = ""

//   if (icon.node) {
//       codeIcon += `<div class="col-md-auto"><img src="/assets/icon/nodejs.png"></div>`
//   }
//   if (icon.next) {
//       codeIcon += `<div class="col-md-auto"><img src="/assets/icon/nextjs.png"></div>`
//   }
//   if (icon.react) {
//       codeIcon += `<div class="col-md-auto"><img src="/assets/icon/reactjs.png"></div>`
//   }
//   if (icon.typescript) {
//       codeIcon += `<div class="col-md-auto"><img src="/assets/icon/typescript.png"></div>`
//   }

//   return codeIcon
// }

// function newDate(date) {
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Augu", "Sept", "Oct", "Nov", "Dec"];

//   const d = new Date(date)

//   let day = d.getDate()
//   let month = months[d.getMonth()]
//   let year = d.getFullYear()

//   return `${day} ${month} ${year}`
// }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

