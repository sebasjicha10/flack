// Redirect user if it hasn't previously provide a username
if (!localStorage.getItem('username')) {
    window.location.href = "/signin"
}


// Global variables
const username = localStorage.getItem('username')
let room = ""


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

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // Display incoming messages
    socket.on('message', data => {
        const p = document.createElement('p')
        const span_user = document.createElement('span') 
        const span_time = document.createElement('span') 
        const br = document.createElement('br')
        span_user.innerHTML = data.username
        span_time.innerHTML = data.time
        p.innerHTML = span_user.outerHTML + br.outerHTML + data.msg + br.outerHTML + span_time.outerHTML
        document.querySelector("#display-messages-section").append(p)
    })

    // Send message
    document.querySelector("#send_message").onclick = () => {
        time = new Date().toLocaleTimeString()
        socket.send({ "msg": document.querySelector("#message").value, "username": username, "room": room, "time": time })
        // Clear input area
        document.querySelector("#message").value = ""
    }

    // Room creation
    document.querySelector("#add_room").onclick = () => {
        const new_room = document.querySelector("#new_room").value
        socket.emit("create", {"new_room": new_room})
    }

    // Room selection
    document.querySelectorAll(".room").forEach(p => {
        p.onclick = () => {
            let newRoom = p.innerHTML
            if (newRoom == room) {
                msg = `You are already in ${room} room.`
                printSysMsg(msg)
            } else {
                leaveRoom(room)
                joinRoom(newRoom)
                room = newRoom
            }
        }
    })

    // Add room to the DOM
    socket.on("channel added", data => {
        const new_room = data
        const p = document.createElement('p')
        p.innerHTML = new_room
        p.className = "room"
        p.onclick = () => {
            let newRoom = p.innerHTML
            if (newRoom == room) {
                msg = `You are already in ${room} room.`
                printSysMsg(msg)
            } else {
                leaveRoom(room)
                joinRoom(newRoom)
                room = newRoom
            }
        }
        document.querySelector("#room_list").append(p)
    })

    // Leave room
    const leaveRoom = room => {
        socket.emit("leave", {"username": username, "room": room})
    }

    // Join room
    const joinRoom = room => {
        socket.emit("join", {"username": username, "room": room})
        // Clear message area
        document.querySelector("#display-messages-section").innerHTML = ""
        // Autofucs on text area
        document.querySelector("#message").focus()
        // Change Room name
        document.querySelector("#room_name").innerHTML = room
    }

    // Print system message
    const printSysMsg = msg => {
        const p = document.createElement('p')
        p.innerHTML = msg
        document.querySelector("#display-messages-section").append(p)
    }
})

