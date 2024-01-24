const dataMP = []

function submitMP(event) {
    event.preventDefault()
    let inputProject = document.getElementById("inputProject").value
    let inputStart = document.getElementById("inputStart").value
    let inputEnd = document.getElementById("inputEnd").value
    let inputDesc = document.getElementById("inputDesc").value

    let inputNode = document.getElementById("inputNode").checked
    let inputNext = document.getElementById("inputNext").checked
    let inputReact = document.getElementById("inputReact").checked
    let inputTypeS = document.getElementById("inputTypeS").checked

    let inputImage = document.getElementById("inputImage").files
    const p_duration = durationInDays(inputStart, inputEnd)


    inputImage = URL.createObjectURL(inputImage[0])
    const duration = durationInMonth(p_duration)

    const MP = {
        Project: inputProject,
        startDate: inputStart,
        endDate: inputEnd,
        duration,
        Description: inputDesc,
        inputNode,
        inputNext,
        inputReact,
        inputTypeS,
        image: inputImage
    }
    dataMP.push(MP)
    console.log("DataMP", dataMP)
    renderMP()
}

function renderMP() {
    document.getElementById("contents-in").innerHTML = ''
    for (let index = 0; index < dataMP.length; index++) {
        document.getElementById("contents-in").innerHTML += `
        <div class="col">
            <div class="card h-100 p-4" id="fullCard">
                <img src="${dataMP[index].image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <a class="ttl-link" href="./myproject-detail.html">
                        <h4 class="card-title" id="card-ttl">${dataMP[index].Project}</h4>
                    </a>
                    <p class="card-text" id="duration">Duration : ${dataMP[index].duration}</p>
                    <p class="card-text">${dataMP[index].Description}</p>


                    <div class="row mb-4 gap-3" id="icon">
                        ${renderTechImages(dataMP[index])}
                    </div>

                    <div class="d-grid gap-2 d-md-block" id="btn-aksi">
                        <button class="btn btn-primary" type="button">Edit</button>
                        <button class="btn btn-primary" type="button">Delete</button>
                    </div>
                </div>
            </div>
        </div>`

    }
}

//render tech images
function renderTechImages(Object) {
    let renderIcon = "";

    if (Object.inputNode) {
        renderIcon += `<div class="col-md-auto"><img src="../assets/icon/nodejs.png"></div>`;
    }
    if (Object.inputNext) {
        renderIcon += `<div class="col-md-auto"><img src="../assets/icon/nextjs.png"></div>`;
    }
    if (Object.inputReact) {
        renderIcon += `<div class="col-md-auto"><img src="../assets/icon/reactjs.png"></div>`;
    }
    if (Object.inputTypeS) {
        renderIcon += `<div class="col-md-auto"><img src="../assets/icon/typescript.png"></div>`;
    }

    return renderIcon;
}

// Detail project
// add duration in days
function durationInDays(inputStart, inputEnd) {
    // 1000 msec, 60 sec, 60 minutes, 24 hours
    const oneDay = 1000 * 60 * 60 * 24;

    const startDate = new Date(inputStart).getTime();
    const endDate = new Date(inputEnd).getTime();
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