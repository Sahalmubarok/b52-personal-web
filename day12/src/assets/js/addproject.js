const Myprojects = []

function addMyproject(e) {
    e.preventDefault()

    const projectName = document.getElementById("projectName").value

    const StartDate = document.getElementById("inputStart").value
    const EndDate = document.getElementById("inputEnd").value

    const Description = document.getElementById("message").value

    const Nodejs = document.getElementById("inputNodejs").checked
    const Reactjs = document.getElementById("inputReactjs").checked
    const Nextjs = document.getElementById("inputNextjs").checked
    const Typescript = document.getElementById("inputTypescript").checked

    const Image = document.getElementById("inputImage").files
    const p_duration = durationInDays(StartDate, EndDate)

    const imageLink = URL.createObjectURL(Image[0])
    const duration = durationInMonth(p_duration) 

    const Myproject = {
        projectName,
        StartDate,
        EndDate,
        duration,
        Description,
        Nodejs,
        Reactjs,
        Nextjs,
        Typescript,
        Image : imageLink
    }

    Myprojects.unshift(Myproject)
    console.log("Myprojects", Myprojects)
    renderMyproject()
}

    // console.log("projectName", projectName)
    // console.log("StartDate", StartDate)
    // console.log("EndDate", EndDate)
    // console.log("Description", message)
    // console.log("Nodejs", Nodejs)
    // console.log("Reactjs", Reactjs)
    // console.log("Nextjs", Nextjs)
    // console.log("Typescript", Typescript)
    // console.log("Image", imageLink)

function renderMyproject() {
    let html = ''
    
    for (let index = 0; index < Myprojects.length; index++) {
        html += `
        <div class="MP-card1">
            <div class="img-utama">
                <img src="${Myprojects[index].Image}" alt="Foto Profil"> 
            </div>
            <div class="card1">
            <a href="myproject-detail.html"><h3>${Myprojects[index].projectName}</h3></a>
                <p>Durasi: ${Myprojects[index].duration}</p>
            </div>
            <div class="card2">
                <p>${Myprojects[index].Description}</p>
            </div>
            <div class="card3">
                <div class="card-icon">
                ${renderTechImages(Myprojects[index])}
                </div>
            </div>
            <div class="card-bt">
                <div class="btn-aksi"> <button>Edit</button></div>
                <div class="btn-aksi"> <button>Delete</button></div>
            </div>
        </div>
        `

    }

    document.getElementById("contents").innerHTML = html
}

renderMyproject()

//render tech images
function renderTechImages(Object) {
    let renderIcon = "";

    if (Object.Nodejs) {
        renderIcon += `<img src="icon/nodejs.png">`;
    }
    if (Object.Nextjs) {
        renderIcon += `<img src="icon/nextjs.png">`;
    }
    if (Object.Reactjs) {
        renderIcon += `<img src="icon/reactjs.png">`;
    }
    if (Object.Typescript) {
        renderIcon += `<img src="icon/typescript.png">`;
    }

    return renderIcon;
}

// Detail project
// add duration in days
function durationInDays(StartDate, EndDate) {
    // 1000 msec, 60 sec, 60 minutes, 24 hours
    const oneDay = 1000 * 60 * 60 * 24;

    const startDate = new Date(StartDate).getTime();
    const endDate = new Date(EndDate).getTime();
    const durationMs = endDate - startDate;

    // add 1 day if start & end is same day
    return Math.floor(durationMs / oneDay);
}

// add duration in month
function durationInMonth(days) {
    monthDuration = Math.floor(days / 30);
    daysDuration = days % 30;

    // if less than a month return to days
    if (monthDuration == 0) {
        return `${daysDuration} Days`;
    }

    if (daysDuration > 20) {
        monthDuration++;
    }
    else if (daysDuration <= 20 && daysDuration > 10) {
        monthDuration += 0.5;
    }

    return `${monthDuration} Months`
}

