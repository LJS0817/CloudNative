import InputManager from './inputManager.js';
import MapManager from './mapManager.js';
import UIManager from './uiManager.js'
import SceneManager from './sceneManager.js';

import MenuScene from '../modules/scenes/menuScene.js';
import GameScene from '../modules/scenes/gameScene.js';

export default class GameManager {
    constructor(canvas, gameUI, socket) {
        this.mapMng = new MapManager()
        this.inputMng = new InputManager()
        this.socket = socket;
        this.index = -1;

        this.UIMng = new UIManager(gameUI);
        
        this.inputMng.attach(canvas, (e) => {
            if(e.key === 'Enter') {
                this.UIMng.onEnterEvent()
            }
            this.UIMng.changeInputWidth()
        });
        
        //private
        this.sceneMng = new SceneManager();
        this.sceneMng.addScene(new MenuScene());
        this.sceneMng.addScene(new GameScene());
        this.sceneMng.initScene(this.mapMng, this.UIMng, this.socket);

        this.socket.on('updatePlayers', (playersList) => {
            // (playersList는 서버의 getPlayersListForClient가 보낸 배열임 [app.js, line 73-88])
            const playerCount = playersList.length;

            // (★ 2. 현재 씬이 MenuScene(index 0)인지 확인)
            if (this.sceneMng.index === 0) {
                if (playerCount === 2) {
                    // (★ 3. 2명일 때: 맵 번호 입력 유도)
                    this.UIMng.UpdateUIText(0, 'ENTER MAP NUMBER (1-9)');
                    this.UIMng.removeClassList('waiting')
                } else {
                    // (★ 4. 1명일 때: 대기)
                    this.UIMng.UpdateUIText(0, 'WAITING FOR PLAYER...');
                    this.UIMng.addClassList('waiting')
                }
            }
        });

        this.socket.on('redraw', (arg) => {
            const map = arg.map;
            for(let i = 0; i < map.length; i++){
                this.mapMng.setMapIndex(i, map[i]);
            }
        });

        this.socket.on('you', (arg) => {
            this.index = arg.you
            this.sceneMng.setSelfId(arg.you)
        })

        this.socket.on('mapIndexing', (arg) => {
            console.log(arg);
            // console.log(this.index);
            // console.log(this.mapMng.getMap())
            // this.map[arg.index] = arg.user;
            // this.drawMap[arg.index].showBackgroundEffect(arg.user);
            switch (arg.flag) {
                case 'return': {
                    this.mapMng.setMapIndex(arg.index, -1);
                    if(this.index == arg.user) this.sceneMng.changeScene(0);
                    break;
                }
                case 'success': {
                    this.mapMng.setMapIndex(arg.index, arg.user + 2);
                    if(this.index == arg.user) this.sceneMng.changeScene(0);
                    break;
                }
                // case 'failed': {
                //     this.mapMng.setMapIndex(arg.index, -1);
                //     if(this.index == arg.user) this.sceneMng.changeScene(0);
                //     break;
                // }
                default: {
                    this.mapMng.setMapIndex(arg.index, arg.user);
                    if(this.index == arg.user) this.sceneMng.changeScene(1);
                }
            }

        })
    }

    update(dt) { this.sceneMng.getCurrentScene().update(dt); }
    draw(ctx) { this.sceneMng.getCurrentScene().draw(ctx); }
    resize(center, padding, size) { this.sceneMng.onResize(center, padding, size); }
}