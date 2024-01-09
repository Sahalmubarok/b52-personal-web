
function submitData() {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value    

    // alert(`${name} \n ${email} \n ${phone} \n ${subject} \n ${message}`)

    if (name == "") {
       return alert("name harus diisi!")
    } else if (email == "") {
       return alert("email harus diisi!") 
    } else if (phone == "") {
       return alert("phone harus diisi!")
    } else if (subject == "") {
       return alert("subject harus diisi!")
    } else if (message == "") {
       return alert("message harus diisi!")
    }

    console.log(name)
    console.log(email)
    console.log(phone)
    console.log(subject)
    console.log(message)

    //programtically link 
    let a = document.createElement('a')
    a.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`
    a.click()
}

