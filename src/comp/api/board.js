import api from '../ax/axiosSetting.js';

/**
 * 게시판 등록
 * @param {*} obj 
 * @returns 
 */
export const boardRegist = (obj) => {
    return api.post('/board/regist', JSON.stringify(obj));
};
/**
 * 게시글 수정
 * @param {*} obj 
 * @returns 
 */
export const boardModify = (obj) => {
    return api.post('/board/modify', JSON.stringify(obj));
}

/**
 * 게시판 리스트
 * @param {*} param 
 * @returns 
 */
export const boardList = (param) => {
    return api.get('/board/list', {
        params: param
    }
    );
}

/**
 * 게시글 상세보기
 * @param {*} param
 * @returns
 */
export const boardFind = (param) => {
    return api.get('/board/find', { params: param });
};

/**
 * 게시글 삭제
 * @param {*} obj
 * @returns
 */
export const boardRemove = (obj) => {
    return api.post('/board/remove', JSON.stringify(obj));
}

/**
 * 게시글 좋아요
 * @param {*} obj 
 * @returns 
 */
export const boardGood = (obj) => {
    return api.post('/board/good', JSON.stringify(obj));
}
