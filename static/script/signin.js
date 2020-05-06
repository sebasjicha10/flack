document.addEventListener("DOMContentLoaded", () => {

    // Make sure the user didn't previously sign in
    if (localStorage.getItem("username")) 
        window.location.href = "/"
    
    // Handle Name Validation (Must be between 1 and 25 chars)
    const signInButton = document.querySelector("#singinSubmitButton")
    const nameInput = document.querySelector("#username")
    signInButton.disabled = true;

    nameInput.onkeyup = () => {
        const givenName = nameInput.value.trim()
        const charLimit = document.querySelector("#char-limit")
        givenName.length > 0 && givenName.length < 25 ? 
            signInButton.disabled = false :
            signInButton.disabled = true
        
        givenName.length > 25 ?
            charLimit.style.visibility = "initial" :
            charLimit.style.visibility = "hidden" 

    };

    // Handle Submission
    document.querySelector("#siginForm").onsubmit = () => {
        const finalName = nameInput.value.trim()
        localStorage.setItem("username", finalName)
    }

})