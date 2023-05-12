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


//강의목록에서 강의 추가 : '시간표에 추가' 버튼 onclick or js파일에서 바로 button onclick 되게
const addSubjectFromList = (id) => {
  console.log("강의 추가");
  const subject = tempSubjects.find(subject => subject.id === id);
  addSubjectToTimetable(subject);
}