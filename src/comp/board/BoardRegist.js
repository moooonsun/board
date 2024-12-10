import { useState } from "react";
import { boardRegist } from "../api/board";
import { useNavigate } from "react-router-dom";

export default function BoardRegist() {
    const [제목, 제목변경] = useState('');
    const [내용, 내용변경] = useState('');
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName'); 

    function Regist() {
        const obj = {
            title: 제목,
            content: 내용,
            author: userName
        };

        boardRegist(obj).then(() => {
            
            navigate('/boardList');
        }).catch(() => {
            alert('실패');
        });
    }

    return (
        <div className="board-regist-container">
            <style>
                {`
                    .board-regist-container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f9f9f9;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    .title {
                        text-align: center;
                        color: #333;
                        margin-bottom: 20px;
                        font-size: 2em;
                    }

                    .input-container {
                        margin-bottom: 20px;
                    }

                    label {
                        display: block;
                        font-size: 1.1em;
                        color: #555;
                        margin-bottom: 8px;
                    }

                    input[type="text"], textarea {
                        width: 100%;
                        padding: 10px;
                        font-size: 1em;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        box-sizing: border-box;
                    }

                    textarea {
                        height: 150px;
                        resize: none;
                    }

                    button, .submit-btn {
                        background-color: #4CAF50;
                        color: white;
                        padding: 12px 20px;
                        border: none;
                        border-radius: 5px;
                        font-size: 1.1em;
                        cursor: pointer;
                        width: 100%;
                        margin-top: 10px;
                    }

                    button:hover, .submit-btn:hover {
                        background-color: #45a049;
                    }

                    input[type="button"]:disabled {
                        background-color: #ccc;
                        cursor: not-allowed;
                    }

                    input[type="button"] {
                        width: 100%;
                    }
                `}
            </style>
            <h1 className="title">게시글 작성</h1>
            <div className="input-container">
                <label htmlFor="title">제목</label>
                <input
                    id="title"
                    type="text"
                    value={제목}
                    onChange={e => 제목변경(e.target.value)}
                    placeholder="제목을 입력하세요"
                />
            </div>
            <div className="input-container">
                <label htmlFor="content">내용</label>
                <textarea
                    id="content"
                    value={내용}
                    onChange={e => 내용변경(e.target.value)}
                    placeholder="내용을 입력하세요"
                />
            </div>
            <div className="button-container">
                <input
                    type="button"
                    value="작성"
                    onClick={Regist}
                    className="submit-btn"
                />
            </div>
        </div>
    );
}
