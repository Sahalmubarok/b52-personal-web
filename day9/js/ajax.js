function getTestimonialData() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open("GET", "https://api.npoint.io/5b6da0b8955d206da579", true)
        // parameter 1 : method => GET,POST,PUT,PATCH,DLEETE
        // parameter 2 : urlnya 
        // parameter 3 : is it asynchronous => true or false 

        // untuk pengecekan dari hasil atas "xhr.open"
        xhr.onload = () => {
            console.log("hit ke server")
            // console.log hasilnya 
            console.log("status", xhr.status)
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText)
                resolve(response)
            } else {
                reject("Error Loading Data!")
            }
        }

        // ngecek apabila terjadi error
        xhr.onerror = () => {
            reject("network Error!")
        }

        xhr.send()
    })
}

async function allTestimonial() {
    const testimonials = await getTestimonialData()

    let testimonialHTML = ""
    
    testimonials.forEach((value) => {
       testimonialHTML += `
            <div class="testimonial">
                <img src="${value.image}" class="profile-testimonial" />
                <p class="quote">"${value.content}"</p>
                <p class="author">- ${value.author}</p>
                <p class="author">${value.rating} <i class="fa-solid fa-star"></i></p>
            </div>`
        })

    document.getElementById("testimonials").innerHTML = testimonialHTML
}

async function filterTestimonial(rating) {
    const testimonials = await getTestimonialData()

    const filteredTestimonial = testimonials.filter((value) => value.rating === rating)

    if (!filteredTestimonial.length) {
        return document.getElementById("testimonials").innerHTML = "<h1> Data Not Found!</h1>"
    } 

    let filteredTestimonialHTML = "" 

        filteredTestimonial.forEach((value) => {
            filteredTestimonialHTML += `
                    <div class="testimonial">
                        <img src="${value.image}" class="profile-testimonial" />
                        <p class="quote">"${value.content}"</p>
                        <p class="author">- ${value.author}</p>
                    </div>`
        })
        
        document.getElementById("testimonials").innerHTML = filteredTestimonialHTML
}
 allTestimonial()

