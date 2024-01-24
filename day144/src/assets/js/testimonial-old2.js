const testimonials = [ 
    {
        author : "Sahal Mubarok",
        content : "Kokoh Spritual, Mapan Intelektual",
        image : "https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating : 5,
    },
    {
        author : "Albert Einstein",
        content : "Jauhi orang-orang negatif, mereka punya masalah untuk setiap solusi",
        image : "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating : 5,
    },
    {
        author : "Dawn Klark",
        content : "Tidak ada kata terlambat untuk mulai menciptakan kehidupan yg kamu inginkan",
        image : "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating : 3,
    },
    {
        author : "Mubarok",
        content : "Bermimpi bukanlah sesuatu yang menyeramkan. Tidak ada yang mustahil di dunia ini jika kamu percaya",
        image : "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating : 3,
    },
    {
        author : "john",
        content : "Kita selalu bisa memaafkan, namun tidak harus melupakan",
        image : "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating : 1,
    },
    {
        author : "Zain Nafis",
        content : "Mencintai diri adalah sumber dari segala jenis cinta yang lain",
        image : "https://images.pexels.com/photos/3864116/pexels-photo-3864116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating : 2,
    }
]

function allTestimonial() {
    const testimonialHTML = testimonials.map((value) => {
        return `
        <div class="testimonial">
            <img src="${value.image}" class="profile-testimonial" />
            <p class="quote">"${value.content}"</p>
            <p class="author">- ${value.author}</p>
        </div>`
    })

    document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ")
}

function filterTestimonial(rating) {
    const filteredTestimonial = testimonials.filter((value) => value.rating === rating)

    const filteredTestimonialHTML = filteredTestimonial.map((value) => {
        return `
                <div class="testimonial">
                    <img src="${value.image}" class="profile-testimonial" />
                    <p class="quote">"${value.content}"</p>
                    <p class="author">- ${value.author}</p>
                </div>`
    })
    
    document.getElementById("testimonials").innerHTML = filteredTestimonialHTML.join(" ")
}
 allTestimonial()

