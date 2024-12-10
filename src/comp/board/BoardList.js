import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { boardList } from '../api/board';

export default function BoardList() {
    const [boards, setBoards] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [search, setSearch] = useState('1');
    const navigate = useNavigate();

    useEffect(() => {
        startBoardList();
    }, []);

    function startBoardList(seachItem) {
        boardList(seachItem)
            .then(res => {
      
                if(res.status === 200){
                setBoards(res.data);
            }
            });
    }

    function seachBtn() {
        let param = new Object();

        if (search === '1') {
            param.title = keyword;
        } else {
            param.author = keyword;
        }

        startBoardList(param);
    }

    return (
        <div className="board-list-container">
            <style>
                {`
                    .board-list-container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f4f4f9;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    h1 {
                        text-align: center;
                        color: #333;
                    }

                    select, input[type="text"] {
                        width: 200px;
                        padding: 8px;
                        margin-right: 10px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 1em;
                    }

                    input[type="button"] {
                        padding: 10px 15px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 1.1em;
                        margin-top: 10px;
                    }

                    input[type="button"]:hover {
                        background-color: #45a049;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }

                    table th, table td {
                        padding: 12px;
                        text-align: center;
                        border-bottom: 1px solid #ddd;
                    }

                    table th {
                        background-color: #f2f2f2;
                        color: #333;
                    }

                    table tr:hover {
                        background-color: #f1f1f1;
                        cursor: pointer;
                    }

                    .button-container {
                        display: flex;
                        justify-content: flex-start;
                        margin-top: 20px;
                    }
                `}
            </style>
            <h1>게시판 리스트</h1>
            <div className="search-container">
                <select onChange={e => setSearch(e.target.value)}>
                    <option value="1">제목</option>
                    <option value="2">작성자</option>
                </select>
                <input
                    type="text"
                    placeholder="검색"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
                <input
                    type="button"
                    value="검색"
                    onClick={seachBtn}
                />
            </div>
            <div className="button-container">
                <input
                    type="button"
                    value="글쓰기"
                    onClick={() => navigate('/boardRegist')}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>추천</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map((board) => (
                        <tr key={board.id} onClick={() => {
                            localStorage.setItem('boardIdx', board.id);
                            navigate(`/boardFind`);
                        }}>
                            <td>{board.id}</td>
                            <td>{board.title}</td>
                            <td>{board.author}</td>
                            <td>{new Date(board.created).toLocaleString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}</td>
                            <td>{board.good}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
