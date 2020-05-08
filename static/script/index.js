import validation from "./validation.js"
import nightMode from "./night-mode.js"


// Redirect user if it hasn't previously provide a username
if (!localStorage.getItem('username')) 
    window.location.href = "/signin"


// Global variables
const USERNAME = localStorage.getItem('username')
let CURRENT_ROOM = localStorage.getItem('current_room') || ""


document.addEventListener('DOMContentLoaded', () => {

    // Messages and Room input Validation + Handle pressing Enter
    validation()

    // Handle Night Mode
    nightMode()

    // Attach username to page
    document.querySelectorAll('.username').forEach(element => {
        element.innerHTML = USERNAME
    })

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // Connect to last room opened
    socket.on('connect', function() {
        if (CURRENT_ROOM.length > 0)
            joinRoom(CURRENT_ROOM) 
    })

    // Display incoming messages
    socket.on('message', data => sendMessage(data))

    // Send message
    document.querySelector("#send_message").onclick = () => {
        const time = new Date().toLocaleTimeString()
        const promptedMessage = document.querySelector("#message")
        socket.send({ "msg": promptedMessage.value, "username": USERNAME, "room": CURRENT_ROOM, "time": time })
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
            if (newRoom == CURRENT_ROOM) {
                const msg = `You are already in ${CURRENT_ROOM} room.`
                printSysMsg(msg)
            } else {
                leaveRoom(CURRENT_ROOM)
                joinRoom(newRoom)
            }
        }
    }

    // Room selection
    document.querySelectorAll(".room").forEach(p => {
        handleRoomClick(p)
    })

    // Add room to the DOM
    socket.on("room added", new_room => {
        const p = document.createElement('p')
        p.innerHTML = new_room
        p.className = "room"
        handleRoomClick(p)
        document.querySelector("#room_list").prepend(p)
    })

    // Join user after room creation
    socket.on("room creator", room => {
        leaveRoom(CURRENT_ROOM)
        joinRoom(room)
    })
    
    // Handles the printing of messages when they come from server-side
    const sendMessage = data => {
        const box = document.createElement('div')
        const p = document.createElement('p')
        const messsa_area = document.querySelector("#messages_area")
        const br = document.createElement('br') 
        const span_user = document.createElement('span') 
        const span_time = document.createElement('span') 
        const span_message = document.createElement('span') 

        box.appendChild(p)

        if (data.username ===  USERNAME) {
            box.classList.add("own_box")
            p.classList.add("own_message")
            span_time.classList.add("own_time")
            span_message.classList.add("own_text")
            span_user.classList.add("own_name")
        } else if (data.username == undefined) {
            box.classList.add("join_leave_box")
            p.classList.add("join_leave_message")
        } else {
            box.classList.add("others_box")
            p.classList.add("others_message")
            span_time.classList.add("others_time")
            span_message.classList.add("others_text")
            span_user.classList.add("others_name")
        }

        span_user.innerHTML = data.username
        span_time.innerHTML = data.time
        span_message.innerHTML = data.msg

        if (data.username == undefined) {
            p.innerHTML = span_message.outerHTML
        } else {
            p.innerHTML = span_user.outerHTML + span_time.outerHTML + br.outerHTML + span_message.outerHTML
        }

        document.querySelector("#display-messages-section").appendChild(box)
        // Show from bottom to top
        messsa_area.scrollTop = messsa_area.scrollHeight;
    }

    // Print all messages registered in the room 
    socket.on("saved messages", data => {
        data.forEach(message => sendMessage(message))
    })

    // Leave room
    const leaveRoom = room => {
        socket.emit("leave", {"username": USERNAME, "room": room})
    }

    // Join room
    const joinRoom = room => {

        // Fetch messages
        socket.emit("fetch messages", room)

        socket.emit("join", {"username": USERNAME, "room": room})

        // Set localStorage room 
        CURRENT_ROOM = room
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
        p.classList.add("alreadyIn_message")
        document.querySelector("#display-messages-section").append(p)
    }

})

