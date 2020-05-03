// Redirect user if it hasn't previously provide a username
if (!localStorage.getItem('username')) 
    window.location.href = "/signin"


// Global variables
const username = localStorage.getItem('username')
let current_room = localStorage.getItem('current_room') || ""


document.addEventListener('DOMContentLoaded', () => {

    // Attach username to page
    document.querySelectorAll('.username').forEach(element => {
        element.innerHTML = username
    })

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // Connect to last room opened
    socket.on('connect', function() {
        if (current_room.length > 0)
            joinRoom(current_room) 
    });

    // Display incoming messages
    socket.on('message', data => sendMessage(data))

    // Send message
    document.querySelector("#send_message").onclick = () => {
        time = new Date().toLocaleTimeString()
        const promptedMessage = document.querySelector("#message")
        socket.send({ "msg": promptedMessage.value, "username": username, "room": current_room, "time": time })
        // Clear input area
        promptedMessage.value = ""
    }

    // Room creation
    document.querySelector("#add_room").onclick = () => {
        const given_room = document.querySelector("#new_room").value
        socket.emit("create", given_room)
        // Clear input area
        document.querySelector("#new_room").value = ""
    }

    // Handles the onClick of the Rooms List
    const handleRoomClick = p => {
        p.onclick = () => {
            let newRoom = p.innerHTML
            if (newRoom == current_room) {
                msg = `You are already in ${current_room} room.`
                printSysMsg(msg)
            } else {
                leaveRoom(current_room)
                joinRoom(newRoom)
                current_room = newRoom
            }
        }
    }

    // Room selection
    document.querySelectorAll(".room").forEach(p => handleRoomClick(p))

    // Add room to the DOM
    socket.on("room added", new_room => {
        const p = document.createElement('p')
        p.innerHTML = new_room
        p.className = "room"
        handleRoomClick(p)
        document.querySelector("#room_list").append(p)
    })

    // Join user after room creation
    socket.on("room creator", room => joinRoom(room))

    // Handles the printing of messages when they come from server-side
    const sendMessage = data => {
        const p = document.createElement('p')
        const span_user = document.createElement('span') 
        const span_time = document.createElement('span') 
        const br = document.createElement('br')
        span_user.innerHTML = data.username
        span_time.innerHTML = data.time
        p.innerHTML = span_user.outerHTML + br.outerHTML + data.msg + br.outerHTML + span_time.outerHTML
        document.querySelector("#display-messages-section").append(p)
    }

    // Print all messages registered in the room 
    socket.on("saved messages", data => {
        data.forEach(message => sendMessage(message))
    })

    // Leave room
    const leaveRoom = room => {
        socket.emit("leave", {"username": username, "room": room})
    }

    // Join room
    const joinRoom = room => {

        // Fetch messages
        socket.emit("fetch messages", room)

        socket.emit("join", {"username": username, "room": room})

        // Set localStorage room 
        localStorage.setItem('current_room', room)

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

