// 요일 선택 하나만 클릭되게 하는 함수------------------------------------------------
function NoMultiChk(chk){
  var obj = document.getElementsByName("table-select_day");
   for(var i=0; i<obj.length; i++){
     if(obj[i] != chk){
       obj[i].checked = false;
     }
   }
}

// 개설 교양 목록 가져오기-------------------------------------------------
const tempSubjects = [
  {id: 1, name: "프로그래밍언어론", professor:"홍길동", category: "전공필수", subject_code: "1", time:"월1, 월2, 수3", room: "030-0304"},
  {id: 2, name: "소프트웨어설계PBL", professor:"홍길동", category: "전공필수", subject_code:"2", time:"월2, 월3", room: "030-0304"},
  {id: 3, name: "데이터베이스", professor:"홍길동", category: "전공필수", subject_code: "3", time:"금1, 금2", room: "030-0304"},
  {id: 4, name: "데이터과학", professor:"홍길동", category: "전공필수", subject_code: "4", time:"월11, 월12", room: "030-0304"},
  {id: 5, name: "컴퓨터네트워크", professor:"홍길동", category: "전공필수", subject_code: "5", time:"화6, 화7, 수3", room: "030-0304"},
  {id: 6, name: "환경과오염", professor: "김둘선", category: "균형교양(통합교양) 5영역(과학과 기술)", subject_code: "6", time: "월 4, 5", room: "024-0135"}
]

const table = document.getElementById("div-class_list_table");
tempSubjects.forEach(subjects => {
const tr = document.createElement("tr");
tr.innerHTML = `
  <td>${subjects.name}</td>
  <td>${subjects.professor}</td>
  <td style="width: 120px;">${subjects.category}</td>
  <td>${subjects.subject_code}</td>
  <td>${subjects.time}</td>
  <td>${subjects.room}</td>
  <td><button type="button" onclick="addSubjectFromList(${subjects.id})">시간표에 추가</button></td>
`;
table.appendChild(tr);
});

//검색창 엔터 누르면 제출되게------------------------------------------------------
function press(f){
  if(f.keyCode == 13){ //javascript에서는 13이 enter키를 의미함
      formname.submit(); //formname에 사용자가 지정한 form의 name입력
  }
}
//검색창 돋보기 눌러도 제출-------------------------
// 검색 버튼 요소를 가져오기
const searchButton = document.querySelector('#form-search_button');

// 검색 버튼에 클릭 이벤트 등록
searchButton.addEventListener('click', function() {
  // 검색창 입력값을 가져옴
  const searchText = document.querySelector('#form-search_text').value;
  
  // 검색결과를 출력하는 함수 호출
  searchTimetable(searchText);
});

//현재날짜 기반------------------
// 현재 날짜 기반으로 년도와 학기 출력
var today = new Date();
var year = today.getFullYear();
var semester = today.getMonth() < 6 ? 1 : 2;
var message = year + '년 ' + semester + '학기';

document.getElementById('p-semester_date').innerHTML = message;



//카테고리----------------------------------------------------------
// 카테고리 선택 이벤트 처리
const categorySelect = document.getElementById("table-ge_category"); //검색하고자 하는 과목의 영역(교양이면 통교, 핵교, 2영역 등, 전공은 전선전필 등등)
categorySelect.addEventListener("change", function() {
  const selectedCategory = categorySelect.value;
  
  // 선택한 카테고리 값을 Python 파일로 전달하는 함수 호출
  callPythonFunction(selectedCategory);
});

// 요일과 교시 선택 이벤트 처리
const dayCheckboxes = document.querySelectorAll(".table-select_day");  //과목 요일
const hourCheckboxes = document.querySelectorAll(".table-select_hour"); //과목 교시

// 선택한 내용을 객체로 만들어 Python 파일로 전달하는 함수 호출
function sendDataToPython() {
  const selectedDays = Array.from(dayCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  const selectedHours = Array.from(hourCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  const data = {
    days: selectedDays,
    hours: selectedHours
  };
  
  // data 객체를 Python 파일로 전달하는 함수 호출. data 안에는 선택한 요일과 선택한 시간이 들어있음
  callPythonFunction(data);
}

// Python 파일 호출 함수
function callPythonFunction(data) {
  const pythonFile = "../python/skatjfls_recommend.py"; // Python 파일 경로. 아무거나 넣은거라 수정해야함@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  // Python 파일 호출 코드 작성 (예시: AJAX 사용)
  const xhr = new XMLHttpRequest();
  xhr.open("POST", pythonFile, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText); // Python 파일에서 반환된 응답 출력
      }
  };
  xhr.send(JSON.stringify(data));
}
