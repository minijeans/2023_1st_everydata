import React from "react";

function Main() {
    return(
        <main>
            <div className="main-container">
                <div className="main-section">
                    <div id="main-timetable_top">
                        <span>학기 시간표</span>
                        <button id="main-plus_button" onclick="">+</button>
                    </div>
                    <table id="main-timetable">
                        <tr>
                            <th> </th>
                            <th>월</th>
                            <th>화</th>
                            <th>수</th>
                            <th>목</th>
                            <th>금</th>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>11</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>12</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>1</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div className="main-right">
                    <div className="main-section">
                        <div id="main-profile_top">
                            <div id="profile-img_box">
                                <img id="profile-img" src="img/profile-gnu.png"/>
                            </div>
                            <span id="profile-name">이지민</span><span>님, 환영합니다!</span>
                        </div>
                        <div className="main-profile">
                            <div>이수학점</div>
                            <span>76</span><span>/</span><span>130</span>
                            <a href="./mypage.html">마이페이지 바로가기</a>
                        </div>
                        <table className="main-profile">
                            <tr>
                                <th><div>학과</div></th>
                                <td>컴퓨터과학과</td>
                                <th><div>상태</div></th>
                                <td>학부생/재학</td>
                            </tr>
                            <tr>
                                <th><div>학번</div></th>
                                <td>2023000000</td>
                                <th><div>학년</div></th>
                                <td>3</td>
                            </tr>
                        </table>
                    </div>
                    <div className="main-section">
                        <h2>바로가기</h2>
                        <div id="main-shortcut">
                            <div>
                                <a href="https://www.gnu.ac.kr/main/main.do" target="_blank">
                                    <div className="shortcut-circle"> 
                                        <i className="fa-solid fa-school fa-2x"></i>
                                    </div>
                                    <div className="shortcut-name">학교 홈페이지</div>
                                </a>
                                <a href="https://portal.gnu.ac.kr/portal/default/stuMain" target="_blank">
                                    <div className="shortcut-circle">
                                        <i class="fa-solid fa-laptop fa-2x"></i>
                                    </div>
                                    <div className="shortcut-name">통합서비스</div>
                                </a>
                            </div>
                            <div>
                                <a href="https://sugang.gnu.ac.kr/login" target="_blank">
                                    <div className="shortcut-circle">
                                        <i class="fa-solid fa-calendar-days fa-2x"></i>
                                    </div>
                                    <div className="shortcut-name">수강신청</div>
                                </a>
                                <a href="https://nerum.gnu.ac.kr/index.do" target="_blank">
                                    <div className="shortcut-circle">
                                        <i class="fa-solid fa-graduation-cap fa-2x"></i>
                                    </div>
                                    <div className="shortcut-name">학생역량시스템</div>
                                </a>
                            </div>
                            <div>
                                <a href="https://www.rec.ac.kr/gnu" target="_blank">
                                    <div className="shortcut-circle">
                                        <i class="fa-solid fa-book fa-2x"></i>
                                    </div>
                                    <div className="shortcut-name">LMS</div>
                                </a>
                                <a href="https://gelc.or.kr/main/MainView.dunet#main" target="_blank">
                                    <div className="shortcut-circle">
                                        <i class="fa-solid fa-chalkboard-user fa-2x"></i>
                                    </div>
                                    <div className="shortcut-name">교류용이러닝</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Main;