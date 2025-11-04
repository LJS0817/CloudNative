export default class UIMananger {
    constructor(uiParent) {
        this.ui = uiParent;
        this.enterCallback = () => { console.log('UIMNG') };

        this.inputText = this.ui.children[2];
        this.inputText.children[0].addEventListener('input', (e) => { this.changeInputWidth() });

        this.inGameIcon = this.ui.children[3];
        this.changeInputWidth()
    }

    changeInputWidth() {
        if(document.activeElement !== this.inputText.children[0]) this.inputText.children[0].focus();
        this.inputText.children[1].style['width'] = this.inputText.children[0].getBoundingClientRect().width + 'px';
    }

    UpdateUIText(idx, str) {
        this.ui.children[idx].innerText = str
    }

    onEnterEvent() {
        if(this.enterCallback(this.inputText.children[0].value))
            this.inputText.children[0].value = '';
        this.changeInputWidth()
    }

    addClassList(str) {
        this.ui.classList.add(str)
    }

    removeClassList(str) {
        this.ui.classList.remove(str)
    }

    Contains(str) {
        return this.ui.classList.contains(str);
    }
}