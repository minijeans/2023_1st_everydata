//이지민 작성
//임의 DB
const tempSubjects = [
  {id: 1, name: "프로그래밍언어론", professor:"홍길동", category: "전공필수", time:"월1, 월2, 수3", room: "030-0304"},
  {id: 2, name: "소프트웨어설계PBL", professor:"홍길동", category: "전공필수", time:"월2, 월3", room: "030-0304"},
  {id: 3, name: "데이터베이스", professor:"홍길동", category: "전공필수", time:"금1, 금2", room: "030-0304"},
  {id: 4, name: "데이터과학", professor:"홍길동", category: "전공필수", time:"월11, 월12", room: "030-0304"},
  {id: 5, name: "컴퓨터네트워크", professor:"홍길동", category: "전공필수", time:"화6, 화7, 수3", room: "030-0304"}
]

//사용자 프로필
$.ajax({
  url: "/user",
  type: "GET",
  dataType: "json",
  success: function(data) {
    const name = data.name;
    const user_credit = data.user_credit;
    const total_credit = data.total_credit;
    const major = data.major;
    const status = data.status;
    const academic_number = data.academic_number;
    const grade = data.grade;

    document.getElementById("profile-name").innerHTML = name;
    document.getElementById("profile-user_credit").innerHTML = user_credit;
    document.getElementById("profile-total_credit").innerHTML = total_credit;
    document.getElementById("profile-major").innerHTML = major;
    document.getElementById("profile-status").innerHTML = status;
    document.getElementById("profile-academic_number").innerHTML = academic_number;
    document.getElementById("profile-grade").innerHTML = grade;
  },
  error: function(xhr, status, error){
    console.log(xhr);
    console.log(status);
    console.log(error);
  }
});

//시간표 요일/교시 인덱스 생성
const days = ["월", "화", "수", "목", "금", "토"];
const periods = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
const timeStringToIndex = {};

for (let i = 0; i < days.length; i++) {
  for (let j = 0; j < periods.length; j++) {
    const time = days[i] + periods[j];
    timeStringToIndex[time] = i * periods.length + j;
  }
}

//시간표 강의 목록
let subjects = [];

//시간표에 강의 추가
const addSubjectToTimetable = (subject) => {
  const day = subject.day;
  const time = subject.time;
  const duration = subject.duration;
  const cell = $(`#main-timetable td[data-day=${day}][data-time=${time}]`);

  if (cell.children().length > 0) {
    alert("해당시간에 이미 다른 강의가 있습니다.");
    return;
  };
  for (let i=0; i < duration; i++) {
    const targetCell = $(`#main-timetable td[data-day=${day}][data-time=${time + i}]`);
    targetCell.append(`<div>${subject.name}</div>`);
  };
  
  subjects.push(subject);
}

//강의목록 팝업창 : 메인 '+' 버튼 onclick (샘플)
const openSubjectList = () => {
  const url = 'sample.html';
  window.open(url, 'subject-list-popup', 'width=1200,height=800');
}

//강의목록 팝업창 : 메인 '+' 버튼 onclick
// const openSubjectList = () => {
//   const url = 'searchTimeTable.html';
//   window.open(url, 'subject-list-popup', 'width=1200,height=800');
// };

//강의목록에서 강의 추가 : '시간표에 추가' 버튼 onclick or js파일에서 바로 button onclick 되게
const addSubjectFromList = (id) => {
  alert("강의추가");
  const subject = tempSubjects.find(subject => subject.id === id);
  addSubjectToTimetable(subject);
}

//프로필 표시