import { useState, useEffect } from 'react';
import { boardFind, boardRemove, boardGood } from '../api/board';
import { useNavigate } from "react-router-dom";

export default function BoardFind() {
    const [find, setFind] = useState('');
    const navigate = useNavigate();
    const boardIdx = localStorage.getItem('boardIdx');
    const userName = localStorage.getItem('userName'); 

    useEffect(() => {
        start();
    }, []);

    function start() {
        const param = new Object();
        param.id = boardIdx;
        boardFind(param)
            .then(res => {
                setFind(res.data);
            });
    }

    function remove() {
        const obj = new Object();
        obj.id = boardIdx;
        boardRemove(obj)
            .then(() => {
                navigate('/boardList');
            });
    }

    function modify() {
        const obj = {
            'id': boardIdx,
            'title': find.title,
            'content': find.content,
            'author': find.author
        };
        localStorage.setItem('modify', JSON.stringify(obj));
        navigate('/boardModify');
    }

    function good() {
        const obj = new Object();
        obj.id = boardIdx;
        boardGood(obj)
            .then(() => {
                setFind(prevFind => ({
                    ...prevFind,
                    good: prevFind.good + 1
                }));
            });
    }

    return (
        <div className="board-find-container">
            <style>
                {`
                    .board-find-container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f4f4f4;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    h1 {
                        text-align: center;
                        color: #333;
                        margin-bottom: 20px;
                    }

                    h2 {
                        font-size: 1.8em;
                        color: #2c3e50;
                        margin-bottom: 10px;
                        text-align: left;
                    }

                    .board-header {
                        display: flex;
                        justify-content: flex-start;
                        margin-bottom: 10px;
                        border-bottom: 2px solid #ddd;
                        padding-bottom: 10px;
                    }

                    .board-header input {
                        margin-right: 10px;
                    }

                    .board-info {
                        font-size: 1em;
                        color: #777;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        gap: 20px;
                        border-bottom: 2px solid #ddd;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }

                    .content-section {
                        margin-top: 20px;
                        border-bottom: 2px solid #ddd;
                        padding-bottom: 20px;
                    }

                    .content-section p {
                        font-size: 1.1em;
                        line-height: 1.6;
                        color: #555;
                        text-align: left;
                    }

                    .buttons {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-top: 20px;
                    }

                    .buttons a,
                    .buttons input {
                        padding: 10px 15px;
                        font-size: 1em;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-right: 10px;
                    }

                    .buttons input {
                        background-color: #3498db;
                        color: white;
                    }

                    .buttons input:hover {
                        background-color: #2980b9;
                    }

                    .buttons a {
                        background-color: #2ecc71;
                        color: white;
                        text-decoration: none;
                        display: inline-block;
                    }

                    .buttons a:hover {
                        background-color: #27ae60;
                    }
                `}
            </style>

            <h1>게시글 상세</h1>

            {/* 수정, 삭제 버튼을 작성자와 로그인된 사용자 비교 */}
            <div className="board-header">
                {find.author === userName && (
                    <>
                        <input type="button" value="수정" onClick={modify} />
                        <input type="button" value="삭제" onClick={remove} />
                    </>
                )}
            </div>

            {/* 제목 왼쪽 정렬 */}
            <h2>제목: {find.title}</h2>

            {/* 작성자와 작성일을 같은 줄에 표시 */}
            <div className="board-info">
                <p><strong>작성자: </strong> {find.author}</p>
                <p><strong>작성일: </strong> {new Date(find.created).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })}</p>
            </div>

            {/* 내용 */}
            <div className="content-section">
                <p>내용: {find.content}</p>
            </div>

            {/* 좋아요 버튼 */}
            <div className="buttons">
                <a onClick={good}>👍 좋아요 {find.good}</a>
            </div>
        </div>
    );
}
