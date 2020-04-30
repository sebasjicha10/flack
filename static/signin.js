document.addEventListener('DOMContentLoaded', () => {

    // Make sure the user didn't previously sign in
    if (localStorage.getItem('username')) {
        window.location.href = "/"
    }

    document.querySelector('#siginForm').onsubmit = () => {
        const username = document.querySelector('#username').value

        // Validate 

        localStorage.setItem('username', username)

    }


})