// 개설 교양 목록 가져오기-------------------------------------------------
const tempSubjects = [
  {id: 1, name: "프로그래밍언어론", professor:"홍길동", category: "전공필수", subject_code: "1", time:"월1, 월2, 수3", room: "030-0304"},
  {id: 2, name: "소프트웨어설계PBL", professor:"홍길동", category: "전공필수", subject_code:"2", time:"월2, 월3", room: "030-0304"},
  {id: 3, name: "데이터베이스", professor:"홍길동", category: "전공필수", subject_code: "3", time:"금1, 금2", room: "030-0304"},
  {id: 4, name: "데이터과학", professor:"홍길동", category: "전공필수", subject_code: "4", time:"월11, 월12", room: "030-0304"},
  {id: 5, name: "컴퓨터네트워크", professor:"홍길동", category: "전공필수", subject_code: "5", time:"화6, 화7, 수3", room: "030-0304"},
  {id: 6, name: "환경과오염", professor: "김둘선", category: "균형교양(통합교양) 5영역(과학과 기술)", subject_code: "6", time: "월 4, 5", room: "024-0135"}
];

const table = document.getElementById("div-class_list_table");
const categorySelect = document.getElementById("table-ge_category");

// 강의 목록을 표시하는 함수
function displaySubjectList(subjects) {
  // 기존 테이블 내용 삭제
  while (table.firstChild) {
    table.firstChild.remove();
  }

  // 헤더 생성
  const thRow = document.createElement("tr");
  thRow.innerHTML = `
    <th><div>과목명</div></th>
    <th><div>교수명</div></th>
    <th><div>분류</div></th>
    <th><div>과목 코드</div></th>
    <th><div>시간</div></th>
    <th><div>강의실</div></th>
    <th><div>추가</div></th>
  `;
  table.appendChild(thRow);

  subjects.forEach(subject => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${subject.name}</td>
      <td>${subject.professor}</td>
      <td style="width: 120px;">${subject.category}</td>
      <td>${subject.subject_code}</td>
      <td>${subject.time}</td>
      <td>${subject.room}</td>
      <td><button type="button" onclick="addSubjectFromList(${subject.id})">시간표에 추가</button></td>
    `;
    table.appendChild(tr);
  });
}

// 카테고리 선택 이벤트 처리
categorySelect.addEventListener("change", function() {
  const selectedCategory = categorySelect.value;

  if (selectedCategory === "전체") {
    // 전체 강의 목록 표시
    displaySubjectList(tempSubjects);
  } else {
    // 선택한 카테고리에 해당하는 강의 목록 필터링하여 표시
    const filteredSubjects = tempSubjects.filter(subject => subject.category === selectedCategory);
    displaySubjectList(filteredSubjects);
  }
});

// 초기 페이지 로드 시 전체 강의 목록 표시
displaySubjectList(tempSubjects);
