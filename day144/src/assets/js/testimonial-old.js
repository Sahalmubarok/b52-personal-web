// class Testimonial {
//     #author = ""
//     #content = ""
//     #image = ""

//     constructor(author, content, image) {
//         this.#author = author
//         this.#content = content
//         this.#image = image
//     }

//     set author(val) {
//         this.#author = val 
//     }

//     set content(val) {
//         this.#content = val 
//     }

//     set image(val) {
//         this.#image = val 
//     }

//     get author() {
//         return this.#author
//     }

//     get content() {
//         return this.#content
//     }

//     get image() {
//         return this.#image
//     }

//     html() {
//         return `
//             <div class="testimonial">
//                 <img src="${this.image}" class="profile-testimonial" />
//                 <p class="quote">"${this.content}"</p>
//                 <p class="author">- ${this.author}</p>
//             </div>
//         `
//     }
// }

// const testimonial1 = new Testimonial("Sahal", "Kokoh Spritual, Mapan Intelektual", "https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
// const testimonial2 = new Testimonial("Albert Einstein", "Jauhi orang-orang negatif, mereka punya masalah untuk setiap solusi ", "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
// const testimonial3 = new Testimonial("Dawn Klark", "Tidak ada kata terlambat untuk mulai menciptakan kehidupan yg kamu inginkan", "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")

// const testimonials = [testimonial1, testimonial2, testimonial3]

// let testimonialHTML = ``
// for (let index = 0; index < testimonials.length; index++) {
//     testimonialHTML += testimonials[index].html()
// }

// document.getElementById("testimonials").innerHTML = testimonialHTML