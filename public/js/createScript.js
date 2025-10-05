const pwdToggle = document.getElementById('toggle-btn')
let enablePwd = false;

function togglePassword() {
    enablePwd = !enablePwd;
    if(enablePwd) { 
        pwdToggle.parentElement.classList.add('enabled')
        pwdToggle.innerText = "ENABLED"
    } else {
        pwdToggle.parentElement.classList.remove('enabled')
        pwdToggle.innerText = "DISABLED"
    }
}