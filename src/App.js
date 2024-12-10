
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import List from './comp/board/BoardList'
import Regist from './comp/board/BoardRegist'
import Find from './comp/board/BoardFind'
import Modify from './comp/board/BoardModify'
import UserNameInput from './comp/user/UserNameInput'; 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <About />
        <Routes>
          <Route path={"/"} element={<UserNameInput />} /> 
          <Route path={"/boardList"} element={<List />} />
          <Route path={"/boardRegist"} element={<Regist />} />
          <Route path={"/boardFind"} element={<Find />} />
          <Route path={"/boardModify"} element={<Modify />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
function About() {
  return (
    <div>
      <Link to="/">Start</Link> <br/>
      <Link to="/boardList">List</Link>
    </div>
  )
}


export default App;
