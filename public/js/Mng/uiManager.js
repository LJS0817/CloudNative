export default class UIMananger {
    constructor(uiParent) {
        this.ui = uiParent;
        this.enterCallback = () => { console.log('UIMNG') };

        this.changeInputWidth()
        this.ui.children[2].addEventListener('input', (e) => { this.changeInputWidth() });
        // this.ui.children[2].onkeypress = (e) => {
        //     this.ui.children[3].style['width'] = this.ui.children[2].getBoundingClientRect().width + 'px';
        // }
    }

    changeInputWidth() {
        if(document.activeElement !== this.ui.children[2]) this.ui.children[2].focus();
        // if(this.ui.children[2].)
        this.ui.children[3].style['width'] = this.ui.children[2].getBoundingClientRect().width + 'px';
    }

    UpdateUIText(idx, str) {
        this.ui.children[idx].innerText = str
    }

    onEnterEvent() {
        this.ui.children[2].value = '';
        this.changeInputWidth()
        this.enterCallback()
    }

    addClassList(str) {
        this.ui.classList.add(str)
    }

    removeClassList(str) {
        this.ui.classList.remove(str)
    }
}