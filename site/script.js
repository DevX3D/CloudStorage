function signup() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    if (username && email && password) {
        window.location.href = "login.html";
    } else {
        showMessage("Please fill in all fields");
    }
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if (username && password) {
        window.location.href = "index.html";
    } else {
        showMessage("Please fill in all fields");
    }
}

function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}
