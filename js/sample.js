//이지민 작성


//임의 DB
const tempSubjects = [
  {id: 1, name: "프로그래밍언어론", professor:"홍길동", category: "전공필수", time:"월1, 월2, 수3", room: "030-0304"},
  {id: 2, name: "소프트웨어설계PBL", professor:"홍길동", category: "전공필수", time:"월2, 월3", room: "030-0304"},
  {id: 3, name: "데이터베이스", professor:"홍길동", category: "전공필수", time:"금1, 금2", room: "030-0304"},
  {id: 4, name: "데이터과학", professor:"홍길동", category: "전공필수", time:"월11, 월12", room: "030-0304"},
  {id: 5, name: "컴퓨터네트워크", professor:"홍길동", category: "전공필수", time:"화6, 화7, 수3", room: "030-0304"}
]


const table = document.getElementById("div-class_list_table");
tempSubjects.forEach(subjects => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${subjects.name}</td>
    <td>${subjects.professor}</td>
    <td>${subjects.category}</td>
    <td>${subjects.time}</td>
    <td>${subjects.room}</td>
    <td><button type="button" onclick="addSubjectFromList(${subjects.id})">시간표에 추가</button></td>
  `;
  table.appendChild(tr);
});

//시간표 강의 목록
let subjects = [];
//시간표에 강의 추가
function addSubjectToTimetable(subject) {
  console.log("시간표에 강의 추가");
  
  const dayTimePairs = subject.time.split(",");
  console.log(document.getElementById("main-timetable")); //이부분에서 계속 null 나옴.. html이 두개라 그런가 싶기도 한데 어케 고쳐야될지 모르겠어요..ㅠ
  const mainTimetable = document.querySelector("#main-timetable");
  if (mainTimetable) {
    for (const pair of dayTimePairs) {
      const [day, time] = pair.split("");
      console.log(day, time);
      console.log(document.querySelector("#main-timetable"));
      const cell = document.querySelector(`#main-timetable td[data-day="${day}"][data-time="${time}"]`);
      console.log(cell);
      if (cell.children.length > 0) {
        alert("해당시간에 이미 다른 강의가 있습니다.");
        return;
      };
      const div = document.createElement("div");
      div.textContent = subject.name;
      cell.appendChild(div);
    }
    subjects.push(subject);
    console.log(subjects);
  }
};

// 강의 추가 요청을 서버에 전송하는 함수
const addSubjectToServer = (subject) => {
  // 서버 URL
  const url = '/api/addSubject';

  // AJAX 요청
  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(subject),
    success: function (response) {
      // 
      console.log('강의 추가 요청이 성공적으로 전송되었습니다.');
    },
    error: function (xhr, status, error) {
      console.error('강의 추가 요청이 실패하였습니다.');
    }
  });
};

//강의목록에서 강의 추가 : '시간표에 추가' 버튼 onclick or js파일에서 바로 button onclick 되게
const addSubjectFromList = (id) => {
  console.log('강의 추가');
  const subject = tempSubjects.find(subject => subject.id === id);
  if (subject) {
    addSubjectToSever(subject);
  } else {
    console.log('해당 강의를 찾을 수 없습니다.');
  }
};

if (cell.children.length > 0) {
  alert("해당시간에 이미 다른 강의가 있습니다."); //시간표에 추가 중간에 넣어야함
  return;
};