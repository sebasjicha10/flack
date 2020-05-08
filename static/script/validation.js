const validation = () => {

    // Submit messages with Enter Key 
    const newMessageInput = document.querySelector("#message")
    newMessageInput.addEventListener("keyup", event => {
        event.preventDefault()
        if (event.keyCode === 13) 
            document.querySelector("#send_message").click()
    })

    // Submit new Rooms with Enter Key + Validation (<25 chars)
    const newRoomInput = document.querySelector("#new_room")
    const newRoomButton = document.querySelector("#add_room")

    newRoomInput.addEventListener("keyup", event => {
        event.preventDefault()
        const givenRoomName = newRoomInput.value.trim()
        givenRoomName.length < 25 ?
            newRoomButton.disabled = false :
            newRoomButton.disabled = true

        if (event.keyCode === 13) 
            document.querySelector("#add_room").click()  
    })

}


export default validation
  