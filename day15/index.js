const express = require('express')
const path = require('path')
app = express()
const port = 5000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)
const hbs = require('hbs');//import package hbs 1
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')

//untuk membuat/ meregister helperr
hbs.registerHelper('includes', function (arr, val, options) {
    if (arr.includes(val)) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})

hbs.registerHelper('waktu', waktu)// register helper 2

// setting (hbs) variabel global, configuration  dll
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))
// Menggunakan Handlebars sebagai engine view
app.engine('hbs', hbs.__express); 3


// accesible/mengakses assets  sebagai middleware
app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended: false })) //(Body Parser) untuk ngeparsing data yang client kirim lewat sebuah body
// mengapa menggunakan extended yaitu untuk memakai querryString, lalu mengapa value nya adalah false 
// karena kita ingin memakai querryStringnya Express, sedangkan jika valuenya adalah true kita menggunakan querryStringnya third party contohnya qs
app.use(flash())
app.use(session({
    secret: 'ibunyaAriefDidu',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))


// routing
app.get('/', home, card)
app.post('/delete-MP/:id', deleteMP)

app.post('/addmyproject', addMp)
app.get('/addmyproject', addMpViews)

app.post('/update-myproject', updateMP)
app.get('/update-myproject/:id', updateMPViews)


app.get('/myproject', myproject)

app.get('/myproject-detail/:id', myprojectDetail)

app.get('/contact', contact)

app.get('/testimonial', testimonial)

app.get('/login', loginView)
app.post('/login', login)

app.get('/register', registerView)
app.post('/register', register)

app.get('/logout', logout)

// Data source
let days = ""
let months = ""
const data = []



// function untuk merender page pada hbs
// Fungsi home

function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            // Redirect ke halaman login atau halaman lain setelah logout
            res.redirect('/login');
        }
    });
}

async function home(req, res, next) {

    const query = `SELECT * FROM tb_projects `

    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log('Data:', obj)
    const isLogin = req.session.isLogin
    //menyimpan data hasil query ke dalam res.locals atau req.locals
    obj.forEach(item => { item.isLogin = isLogin })
    res.locals.homeData = obj
    // Lanjutkan ke fungsi atau middleware berikutnya
    next()

}
// Fungsi card
async function card(req, res) {
    const id = 3
    const query = `SELECT * FROM profiles WHERE id='${id}'`

    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log('Data dari tabel profiles untuk card:', obj)
    const isLogin = req.session.isLogin


    // Render halaman dengan menggunakan data dari home dan card
    res.render('index', { data: res.locals.homeData, dataCard: obj[0], user: req.session.user, isLogin })

}

async function deleteMP(req, res) {
    const { id } = req.params
    console.log("delete index ke ", id)
    data.splice(id, 1)

    const query = `DELETE FROM tb_projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.DELETE })
    res.redirect('/')
}

async function addMp(req, res) {

    const { project, startDate, endDate, desc, nodejs, nextjs, reactjs, typescript } = req.body // Destructuring

    // Filter nilai yang dicentang saja
    const technologies = [
        { name: 'nodejs', value: nodejs },
        { name: 'nextjs', value: nextjs },
        { name: 'reactjs', value: reactjs },
        { name: 'typescript', value: typescript }
    ].filter(tech => tech.value === 'on').map(tech => tech.name)

    const image = "logo1.jpg"
    const query = `
            INSERT INTO public.tb_projects(name, start_date, end_date, description, technologies, image) 
            VALUES ('${project}', '${startDate}', '${endDate}', '${desc}', '{${technologies}}', '${image}')
        `

    const obj = await sequelize.query(query, { type: QueryTypes.INSERT })


    console.log('Data berhasil disimpan', { obj })
    res.redirect('/')

}

async function updateMPViews(req, res) {
    const { id } = req.params

    const query = `SELECT * FROM tb_projects WHERE id=${id} `
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    res.locals.projectData = obj[0];
    console.log('Technologies:', res.locals.projectData.technologies)
    res.render('update-myproject', { data: res.locals.projectData })
}
async function updateMP(req, res) {
    const { id, project, startDate, endDate, desc, nodejs, nextjs, reactjs, typescript } = req.body // Destructuring

    // Filter nilai yang dicentang saja
    const technologies = [
        { name: 'nodejs', value: nodejs },
        { name: 'nextjs', value: nextjs },
        { name: 'reactjs', value: reactjs },
        { name: 'typescript', value: typescript }
    ].filter(tech => tech.value === 'on').map(tech => tech.name)
    const image = "logo1.jpg"

    const query = `UPDATE tb_projects SET id='${id}',name='${project}', start_date='${startDate}', 
    end_date='${endDate}', description='${desc}', technologies='{${technologies}}', image='${image}' WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE })
    // const dataMP = { project, startDate, endDate, desc, node, next, react, typeS }
    // data.unshift(dataMP)
    res.redirect('/')
}


function addMpViews(req, res) {
    const isLogin = req.session.isLogin
    res.render('addmyproject', { user: req.session.user, isLogin })
}

function myproject(req, res) {


    res.render('myproject', { data })
}

async function myprojectDetail(req, res) {
    const { id } = req.params //destructuring

    const query = `SELECT * FROM tb_projects WHERE id=${id} `
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log("ini adlaha id ke", obj)
    const isLogin = req.session.isLogin
    res.render('myproject-detail', { data: obj[0], user: req.session.user, isLogin })
}

function contact(req, res) {
    const isLogin = req.session.isLogin
    res.render('contact', { user: req.session.user, isLogin })
}

function testimonial(req, res) {
    const isLogin = req.session.isLogin
    res.render('testimonial', { user: req.session.user, isLogin })
}

// login & register
function loginView(req, res) {
    const isLogin = req.session.isLogin
    res.render('login', isLogin)
}

async function login(req, res) {
    const { email, pass } = req.body

    const query = `SELECT * FROM users WHERE email='${email}'`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    if (!obj.length) {
        req.flash('danger', 'Login failed : Email Is Wrong!')
        console.error("Users not register")
        return res.redirect('/login')
    }
    bcrypt.compare(pass, obj[0].password, (err, result) => {
        if (err) {
            console.error("Internal server error")
            req.flash('danger', 'Login failed : Internal server error !')
            return res.redirect('/login')
        }
        if (!result) {
            console.error("Password Is Wrong!")
            req.flash('danger', 'Login failed :  Password Is Wrong!')
            return res.redirect('/login')
        }
        console.log("LOGIN SUKSES")
        req.flash('success', 'Login success!')
        req.session.isLogin = true
        req.session.user = {
            name: obj[0].name,
            email: obj[0].email
        }

        res.redirect('/')
    })
}

function registerView(req, res) {
    const isLogin = req.session.isLogin
    res.render('register', isLogin)
}

async function register(req, res) {
    const { name, email, pass } = req.body

    console.log('Username :', name)
    console.log('Email :', email)
    console.log('Password', pass)

    const salt = 10
    bcrypt.hash(pass, salt, async (err, hash) => {
        if (err) {
            console.error('Password error to be encrypyted')
            req.flash('danger', 'Register Failed : Password error to be encrypyted')
            return res.redirect("/register")
        }
        console.log('hasil hashnya ', hash)
        const query = ` INSERT INTO users(name, email, password) VALUES ('${name}', '${email}', '${hash}')`
        await sequelize.query(query, { type: QueryTypes.INSERT })

        // const queryLog = `SELECT * FROM users WHERE email='${email}'`
        // let obj = await sequelize.query(queryLog, { type: QueryTypes.SELECT })
        // req.session.isLoginReg = true
        // req.session.user = obj[0].name
        // req.session.idLogin = obj[0].id

        req.flash('success', 'Register Succes')
        res.redirect("/login")

    })

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

// setiing untuk mendengarkan/mendapatkan letak portnya
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})