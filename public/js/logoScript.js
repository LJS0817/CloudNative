const container = document.getElementById('container');
const userName = document.getElementById('userInput');
const create = document.querySelector('.createAccount');
const submit = document.getElementById('signSubmit');
const flag = document.getElementById('signFlag');
const form = document.getElementById("signForm");

let signin = true;

create.onclick = (e) => {
    e.preventDefault();
    signin = !signin;
    if (signin) {
        container.classList.remove('up');
        userName.classList.add('hidden');
        create.innerText = "Create Account"
        submit.value = "Sign in";
        flag.value = "i";
    }
    else {
        container.classList.add('up');
        userName.classList.remove('hidden');
        create.innerText = "Return to Sign in";
        submit.value = "Sign up";
        flag.value = "p";
    }
}

window.onload = () => {
    if (form.elements.flag.value == 'p') {
        container.classList.add('up');
        userName.classList.remove('hidden');
        create.innerText = "Return to Sign in";
        submit.value = "Sign up";
    }
}

form.onsubmit = (e) => {
    const id = form.elements.id.value;
    const pwd = form.elements.pwd.value;
    const name = form.elements.username.value;
    const flag = form.elements.flag.value;

    if (id.length < 5 || id.indexOf(' ') > -1 || pwd.length < 8 || (flag == 'p' && name.replaceAll(' ', '').length < 2)) e.preventDefault();
}

document.getElementById('id').onblur = (e) => {
    const str = form.elements.id.value;
    if(str.length < 5 || str.indexOf(' ') > -1) form.elements.id.parentElement.classList.add('failed');
    else form.elements.id.parentElement.classList.remove('failed');
}
document.getElementById('pwd').onblur = (e) => {
    const str = form.elements.pwd.value;
    if(str.length < 8) form.elements.pwd.parentElement.classList.add('failed');
    else form.elements.pwd.parentElement.classList.remove('failed');
}
document.getElementById('username').onblur = (e) => {
    const str = form.elements.username.value;
    if(str.replaceAll(' ', '').length < 2) form.elements.username.parentElement.classList.add('failed');
    else form.elements.username.parentElement.classList.remove('failed');
}