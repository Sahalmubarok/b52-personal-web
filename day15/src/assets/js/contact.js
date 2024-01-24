function submitContact() {
    const inputName = document.getElementById("inputName").value
    const inputEmail = document.getElementById("inputEmail").value
    const inputNumber = document.getElementById("inputNumber").value
    const inputSubject = document.getElementById("inputSubject").value
    const inputMessage = document.getElementById("inputMessage").value

    // Kondisi untuk mengecek dataContact
    if (inputName == "") {
        alert('Nama anda harus diisi')
    } else if (inputEmail == "") {
        alert('Email anda harus diisi')
    } else if (inputNumber == "") {
        alert('Nomor anda harus diisi')
    } else if (inputSubject == "") {
        alert('Subject anda harus diisi')
    } else if (inputMessage == "") {
        alert('Message anda harus diisi')
    } else {
        // harus tervalidasi dulu
        console.log(`Name : ${inputName}\nEmail: ${inputEmail}\nPhone: ${inputNumber}\nSubject: ${inputSubject}\nMessage: ${inputMessage}`)

        let kirimContact = document.createElement('a')
        kirimContact.href = `mailto:${inputEmail}?subject=${inputSubject}&body=${inputMessage}`
        kirimContact.click()

    }
}