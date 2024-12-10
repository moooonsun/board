import { useEffect, useState } from "react";
import { boardModify } from "../api/board";
import { useNavigate } from "react-router-dom";

export default function BoardModify() {
    const modify = JSON.parse(localStorage.getItem('modify'));
    const [제목, 제목변경] = useState(modify.title);
    const [내용, 내용변경] = useState(modify.content);

    const navigate = useNavigate();

    function Regist() {
        const obj = new Object();
        obj.id = modify.id;
        obj.title = 제목;
        obj.content = 내용;
        obj.author = modify.author;

        boardModify(obj)
            .then(res => {
                if(res.status === 200){
                navigate('/boardList')
                }
            })
    }

    return (
        <div className="board-modify-container">
            <style>
                {`
                    .board-modify-container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f9f9f9;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    h1 {
                        text-align: center;
                        color: #333;
                    }

                    input[type="text"], textarea {
                        width: 100%;
                        padding: 12px;
                        margin: 10px 0;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 1em;
                        box-sizing: border-box;
                    }

                    textarea {
                        height: 200px; /* 기본 높이 설정 */
                        resize: vertical; /* 세로로만 크기 조정 가능 */
                    }

                    input[type="button"] {
                        padding: 12px 15px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 1.1em;
                        width: 100%;
                    }

                    input[type="button"]:hover {
                        background-color: #45a049;
                    }

                    .button-container {
                        display: flex;
                        justify-content: center;
                    }

                    .input-container {
                        margin-bottom: 20px;
                    }
                `}
            </style>
            <h1>게시글 수정</h1>
            <div className="input-container">
                <label htmlFor="제목">제목</label>
                <input
                    id="제목"
                    type="text"
                    value={제목}
                    onChange={e => 제목변경(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="내용">내용</label>
                <textarea
                    id="내용"
                    value={내용}
                    onChange={e => 내용변경(e.target.value)}
                />
            </div>
            <div className="button-container">
                <input
                    type="button"
                    value="수정"
                    onClick={Regist}
                />
            </div>
        </div>
    );
}
