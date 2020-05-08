const nightMode = () => {

    // True = Day / Fase = Night
    let mode = true

    // Light colors
    const light_orange = "#E8A87C"
    const light_blue = "#D1F2F0"
    const light_grey = "#F8F8F8"

    // Dark colors
    const green = "#41B3A3"
    const red = "#E27D60"
    const dark_grey = "#364140"
    const grey = "#2B2A2A"

    const messages_day = () => {
        document.querySelectorAll(".others_name").forEach(msg => {
            msg.style.color = red
        })
        document.querySelectorAll(".others_message").forEach(msg => {
            msg.style.backgroundColor = "white"
        })
        document.querySelectorAll(".others_text").forEach(msg => {
            msg.style.color = "black"
        })
        document.querySelectorAll(".others_time").forEach(msg => {
            msg.style.color = dark_grey
        })
        document.querySelectorAll(".own_name").forEach(msg => {
            msg.style.color = green
        })
        document.querySelectorAll(".own_message").forEach(msg => {
            msg.style.backgroundColor = light_blue
        })
        document.querySelectorAll(".own_text").forEach(msg => {
            msg.style.color = "black"
        })
        document.querySelectorAll(".own_time").forEach(msg => {
            msg.style.color = dark_grey
        })
    }

    const messages_night = () => {
        document.querySelectorAll(".others_name").forEach(msg => {
            msg.style.color = light_orange
        })
        document.querySelectorAll(".others_message").forEach(msg => {
            msg.style.backgroundColor = "black"
        })
        document.querySelectorAll(".others_text").forEach(msg => {
            msg.style.color = "white"
        })
        document.querySelectorAll(".others_time").forEach(msg => {
            msg.style.color = light_blue
        })

        document.querySelectorAll(".own_name").forEach(msg => {
            msg.style.color = light_blue
        })
        document.querySelectorAll(".own_message").forEach(msg => {
            msg.style.backgroundColor = green
        })
        document.querySelectorAll(".own_text").forEach(msg => {
            msg.style.color = "white"
        })
        document.querySelectorAll(".own_time").forEach(msg => {
            msg.style.color = light_blue
        })
    }

    const day = () => {
        // 
        mode = true
        // Hanlde Toggle Switch
        document.querySelector("#moon").style.visibility = "hidden"
        document.querySelector("#sun").style.visibility = "visible"

        // Handle Colors
        document.querySelector("#header").style.backgroundColor = light_orange
        document.querySelector("#header_name").style.color = dark_grey
        document.querySelector("#rooms").style.backgroundColor = light_blue
        document.querySelectorAll(".borders").forEach(el => {
            el.style.borderColor = green
            el.style.backgroundColor = "white"
            el.style.color = "black"
        })
        document.querySelector("#chat").style.backgroundColor = "white"
        document.querySelector("#room_name").style.color = green
        document.querySelector("#messages_area").style.backgroundColor = light_grey
        document.querySelector("#send_plane").style.color = red
        document.querySelector("#plus_button").style.color = red
        document.querySelector("#send_message").style.backgroundColor = "white"
        document.querySelector("#add_room").style.backgroundColor = "white"
    }

    const night = () => {

        mode = false

        // Hanlde Toggle Switch
        document.querySelector("#moon").style.visibility = "visible"
        document.querySelector("#sun").style.visibility = "hidden"

        // Handle Colors
        document.querySelector("#header").style.backgroundColor = red
        document.querySelector("#header_name").style.color = light_blue
        document.querySelector("#rooms").style.backgroundColor = green
        document.querySelectorAll(".borders").forEach(el => {
            el.style.borderColor = light_blue
            el.style.backgroundColor = "black"
            el.style.color = "white"
        })
        document.querySelector("#chat").style.backgroundColor = "black"
        document.querySelector("#room_name").style.color = light_blue
        document.querySelector("#messages_area").style.backgroundColor = grey
        document.querySelector("#send_plane").style.color = light_orange
        document.querySelector("#plus_button").style.color = light_orange
    }

    const modeSwitch = document.querySelector("#switch")

    // Switch
    modeSwitch.onclick = () => {
       if (mode == true) {
           night()
           mode == !mode
       } else {
           day()
           mode == !mode
       }
    }

    // Default 
    day()
  
}


export default nightMode