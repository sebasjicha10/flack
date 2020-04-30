// Redirect user if it hasn't previously provide a username
if (!localStorage.getItem('username')) {
    window.location.href = "/signin"
}


document.addEventListener('DOMContentLoaded', () => {

    // Attach username to page
    document.querySelectorAll('.username').forEach(element => {
        element.innerHTML = username
    })


    // enter key submit message
    let msg = document.querySelector("#message")
    msg.addEventListener("keyup", event => {
        event.preventDefault()
        if (event.keyCode === 13) {
            document.querySelector("#send_message").click()
        }
    })
}