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

    const imageLink = URL.createObjectURL(Image[0])

    const Myproject = {
        projectName,
        StartDate,
        EndDate,
        Description,
        Nodejs,
        Reactjs,
        Nextjs,
        Typescript,
        Image : imageLink
    }

    Myprojects.unshift(Myproject)

    // console.log("projectName", projectName)
    // console.log("StartDate", StartDate)
    // console.log("EndDate", EndDate)
    // console.log("Description", message)
    // console.log("Nodejs", Nodejs)
    // console.log("Reactjs", Reactjs)
    // console.log("Nextjs", Nextjs)
    // console.log("Typescript", Typescript)
    // console.log("Image", imageLink)

    renderMyproject()
    console.log("Myprojects", Myprojects)

}

function renderMyproject() {
    let html = ''
    
    for (let index = 0; index < Myprojects.length; index++) {
        html += `
        <div class="MP-card">
            <div class="img-utama">
                <img src="${Myprojects[index].Image}" alt="Foto Profil"> 
            </div>
            <div class="card1">
            <a href="myproject-detail.html"><h3>${Myprojects[index].projectName}</h3></a>
                <p>Durasi 3 bulan</p>
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


