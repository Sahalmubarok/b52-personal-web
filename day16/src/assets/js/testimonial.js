// array of object yang mengandung value yang akan ditampilkan
const Testimonial = [
    {
        Author: "Febryan",
        Content: "Dumbways sangat debestt",
        Image: "https://images.pexels.com/photos/5220075/pexels-photo-5220075.jpeg?auto=compress&cs=tinysrgb&w=600",
        Rating: 5
    },
    {
        Author: "Sahal",
        Content: "MU tetap dihati, meski harus masuk goa setiap hari",
        Image: "https://i.pinimg.com/736x/78/d3/7a/78d37a52a7faea9c4dcfcf2a83292cb5.jpg",
        Rating: 1
    },

    {
        Author: "Mentor Surya",
        Content: "Manusia hanyalah alat",
        Image: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=600",
        Rating: 5
    },

    {
        Author: "Moskov",
        Content: "Mainnya Hebat",
        Image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cba10e4f-c00b-4c97-9d39-bb1e97913407/dd059s1-a1c47691-4b80-4527-9eab-5ad17ae6e7bc.jpg/v1/fill/w_1192,h_670,q_70,strp/moskov_twilight_dragon_mobile_legend_wallpaper_by_riael_voel11_dd059s1-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvY2JhMTBlNGYtYzAwYi00Yzk3LTlkMzktYmIxZTk3OTEzNDA3XC9kZDA1OXMxLWExYzQ3NjkxLTRiODAtNDUyNy05ZWFiLTVhZDE3YWU2ZTdiYy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.hOIZJH8ypcYNsnkwnqTj9lvVrxVikt2fUIMQdKE9gk0",
        Rating: 3
    }
]

// fungsi untuk mengambil nilai dari array of object dan memasukkannya pada file html
function html(item) {
    return `<div class="testimonial">
    <img src="${item.Image}" class="profile-testimonial" />
    <p class="quote">"${item.Content}"</p>
    <p class="author">- ${item.Author}</p>
    <p class="author">${item.Rating} <i class="fa-solid fa-star"></i></p>
</div>`
}

// function untuk menampilkan data sesuai banyak data yang ada pada array of object tadi yaitu Testimonial
// yang menggunakan function forEach untuk melooping sesuai banyak data pada array of object tadi, 
// lalu menambahkan data ke file html menggunakn innerHTML
function testimonialData() {
    let testimonialHTML = ``
    Testimonial.forEach((item) => {
        testimonialHTML += html(item)
    })
    document.getElementById("testimonials").innerHTML = testimonialHTML
}

// untuk menampilkan data ketika web baru dibuka
testimonialData()

// function untuk membuat filter tentang rating dimana ketika kita memilih button sesuai dengan ratingnya
// maka akan menampilkan isi data sesuai dengan rating yang kita pilih,
// menggunakan function filter untuk mengembalikan value sesuai apa yang diminta
function filterTestimonials(Rating) {
    let testimonialHTML = ``
    const testimonialFiltered = Testimonial.filter((item) => {
        return item.Rating === Rating
    })

    if (testimonialFiltered.length === 0) {
        testimonialHTML = `<h3>Data Not Found</h3>`
    } else {
        testimonialFiltered.forEach((item) => {
            testimonialHTML += html(item)
        })
    }

    document.getElementById("testimonials").innerHTML = testimonialHTML
}