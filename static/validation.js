document.addEventListener('DOMContentLoaded', () => {

    // Submit messages with Enter Key
    let newMessageInput = document.querySelector("#message")
    newMessageInput.addEventListener("keyup", event => {
        event.preventDefault()
        if (event.keyCode === 13) 
            document.querySelector("#send_message").click()
    })

    // Submit new Rooms with Enter Key
    newRoomInput = document.querySelector("#new_room")
    newRoomInput.addEventListener("keyup", event => {
        event.preventDefault()
        if (event.keyCode === 13) 
            document.querySelector("#add_room").click()
    })

})