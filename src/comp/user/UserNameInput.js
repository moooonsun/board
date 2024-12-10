import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserNameInput() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = () => {
    if (userName) {
    
      localStorage.setItem('userName', userName);

      navigate('/boardList');  
    } else {
      alert('이름을 입력해주세요.');
    }
  };

  return (
    <div className="user-name-input">
      <h2>사용자 이름 입력</h2>
      <input 
        type="text" 
        value={userName} 
        onChange={handleNameChange} 
        placeholder="이름을 입력하세요"
      />
      <button onClick={handleSubmit}>입력</button>
    </div>
  );
}

export default UserNameInput;
