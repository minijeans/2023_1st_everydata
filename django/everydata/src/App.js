import React from "react";
import {Routes, Route, Link} from 'react-router-dom'
import Main from "./pages/Main";
import './App.css';
import './css/main.css';
import './css/nav.css';
import './css/footer.css';

function App() {
  return (
    <div className="App">
      <nav>
        <ul id="nav-menu">
          <li><Link to="/manageCredit">학점 관리</Link></li>
          <li><Link to="/">대학정보</Link></li>
          <li>
            <Link>강의</Link>
            <ul id="nav-menu_sub">
              <li><Link to="/searchTimeTable">강의목록</Link></li>
              <li><Link to="/recommendProcess">강의 추천</Link></li>
            </ul>
          </li>
        </ul>
        <div id="nav-logo">
          <img id="nav-logo_img" src="img/logo-green.png" alt="메인로고" height="30"/>
          <Link to="/">
            <span>EVERY</span><span className="nav-logo_data">DATA</span>
          </Link>
        </div>
        <button id="nav-logout_button" type="button" onclick="">로그아웃</button>
      </nav>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/manageCredit" element={<manageCredit/>}/>
        <Route path="/searchTimeTable" element={<searchTimeTable/>}/>
        <Route path="/recommendProcess" element={<recommendProcess/>}/>
      </Routes>
      <footer>
        <div id="footer-left">
          <div>2023 - 1 소프트웨어설계PBL : EVERYDATA</div>
          <div>팀 오합지졸 - 남서린 | 민희진 | 이지민 | 훌랑</div>
          <div>Copyright 2023. 오합지졸 All rights reserved.</div>
        </div>
        <div id="footer-right">
          <img src="img/logo-white.png" width="80"/>
        </div>
      </footer>
    </div>
  );
}

export default App;
