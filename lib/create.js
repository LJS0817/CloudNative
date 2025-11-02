const { context } = require('./include');
const { customAlphabet } = require('nanoid');

const path = require('path');
const db = require(path.resolve(__dirname, '../../common-assets/db.js'))

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const nanoid = customAlphabet(ALPHABET, 6);

async function createUniqueRoomCode() {
    let roomCode = '';
    let isUnique = false;
    let attempts = 0; // 혹시 모를 무한 루프 방지
    
    // DB 중복 검사 (최대 10회 시도)
    while (!isUnique && attempts < 10) {
        roomCode = nanoid(); // (예: 'aB1!d9', 'R*k-8T')

        // 3. DB에서 이 코드가 이미 사용 중인지 확인
        // db 모듈에 exists 함수가 없다면 selectOne 등으로 대체
        const codeExists = await db.select('room', 'id', 'roomcode = ?', [roomCode]);

        if (codeExists.length < 1) {
            isUnique = true; // 중복이 없으므로 통과
        }
        attempts++;
    }
    
    if (!isUnique) {
        // 10번 시도에도 실패했다면 (거의 불가능) 에러 발생
        throw new Error('고유한 룸 코드를 생성하지 못했습니다.');
    }

    return roomCode;
}

module.exports = {
    home : async (req, res) => {
        const code = await createUniqueRoomCode();
        res.render('menu', context('create', {roomcode:code}, req.session.me.name), (e, content) => {
            res.end(content);
        });
    },
    create: async (req, res) => {
        let post = req.body;
        const pwd = post.passwordActivate == 'd' ? '' : post.roomPassword;
        const rst = await db.insert('room', ['roomcode', 'name', 'password'], [post.roomCode, post.roomName, pwd]);
        console.log(rst.insertId);
        
    }
};