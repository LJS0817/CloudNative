const sidebtn = document.getElementById('hamburger');
const side = document.getElementById('sidebar');
let sideState = false;

sidebtn.onclick = (e) => {
    e.preventDefault();
    sideState = !sideState;
    if(sideState) side.classList.add('opened');
    else side.classList.remove('opened');
    console.log(sideState);
}