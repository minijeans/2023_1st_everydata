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
  {id: 5, name: "컴퓨터네트워크", professor:"홍길동", category: "전공필수", subject_code: "5", time:"화6, 화7, 수3", room: "030-0304"}
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
//검색창 돋보기 눌러도 제출
// 검색 버튼 요소를 가져오기
const searchButton = document.querySelector('#form-search_button');

// 검색 버튼에 클릭 이벤트 등록
searchButton.addEventListener('click', function() {
  // 검색창 입력값을 가져옴
  const searchText = document.querySelector('#form-search_text').value;
  
  // 검색결과를 출력하는 함수 호출
  searchTimetable(searchText);
});



//카테고리----------------------------------------------------------
// 해당 테이블에서 선택된 조건들을 저장할 객체
const selectedOptions = {
  semester: null,
  geCategory: null,
  days: [],
  hours: [],
};

// semester select element와 ge category select element에 대한 이벤트 리스너 등록
document.getElementById('table-semester').addEventListener('change', (event) => {
  selectedOptions.semester = event.target.value;
  console.log(selectedOptions); // 선택된 조건 확인 (개발 시 디버깅용)
});

document.getElementById('table-ge_category').addEventListener('change', (event) => {
  selectedOptions.geCategory = event.target.value;
  console.log(selectedOptions); // 선택된 조건 확인 (개발 시 디버깅용)
});

// day checkboxes에 대한 이벤트 리스너 등록
const dayCheckboxes = document.querySelectorAll('.table-select_day');
dayCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    const day = event.target.value;
    if (event.target.checked) {
      selectedOptions.days.push(day);
    } else {
      const index = selectedOptions.days.indexOf(day);
      if (index > -1) {
        selectedOptions.days.splice(index, 1);
      }
    }
    console.log(selectedOptions); // 선택된 조건 확인 (개발 시 디버깅용)
  });
});

// hour checkboxes에 대한 이벤트 리스너 등록
const hourCheckboxes = document.querySelectorAll('.table-select_hour');
hourCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    const hour = parseInt(event.target.value, 10);
    if (event.target.checked) {
      selectedOptions.hours.push(hour);
    } else {
      const index = selectedOptions.hours.indexOf(hour);
      if (index > -1) {
        selectedOptions.hours.splice(index, 1);
      }
    }
    console.log(selectedOptions); // 선택된 조건 확인 (개발 시 디버깅용)
  });
});

// 검색 버튼 클릭 이벤트
document.getElementById('form-search_button').addEventListener('click', function () {
  // 검색 결과 초기화
  clearTable();

  // 선택한 년도와 영역 가져오기
  const selectedYear = document.getElementById('table-semester').value.split('-')[0];
  const selectedCategory = document.getElementById('table-ge_category').value;

  // 선택한 요일과 교시 가져오기
  const selectedDays = getSelectedCheckboxes(document.getElementsByName('table-select_day'));
  const selectedHours = getSelectedCheckboxes(document.getElementsByClassName('table-select_hour'));

  // 검색어 가져오기
  const searchText = document.getElementById('form-search_text').value;

  // 검색 결과 필터링
  const filteredResults = timeTable.filter(course => {
    // 년도와 영역이 일치하지 않으면 건너뜀
    if (course.year != selectedYear || course.category != selectedCategory) return false;

    // 선택한 요일 중 수업이 없는 요일이 있으면 건너뜀
    const courseDays = course.day.split(',');
    for (const day of selectedDays) {
      if (!courseDays.includes(day)) return false;
    }

    // 선택한 교시 중 수업이 없는 교시가 있으면 건너뜀
    const courseHours = course.hour.split(',');
    for (const hour of selectedHours) {
      if (!courseHours.includes(hour)) return false;
    }

    // 검색어가 포함되어 있지 않으면 건너뜀
    if (!course.title.includes(searchText)) return false;

    // 모든 조건을 만족하면 true 반환
    return true;
  });

  // 검색 결과 출력
  printTable(filteredResults);
});
