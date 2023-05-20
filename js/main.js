//이지민 작성

//DB
const tempSubjects = [
  { id: 1, name: '프로그래밍언어론', professor: '홍길동', category: '전공필수', time: '월1, 월2, 수3', room: '030-0304' },
  //{ id: 2, name: '소프트웨어설계PBL', professor: '홍길동', category: '전공필수', time: '월2, 월3', room: '030-0304' },
  { id: 3, name: '데이터베이스', professor: '홍길동', category: '전공필수', time: '금11, 금12', room: '030-0304' },
  { id: 4, name: '데이터과학', professor: '홍길동', category: '전공필수', time: '토3, 토4, 토5, 토6', room: '030-0304' },
  // { id: 5, name: '컴퓨터네트워크', professor: '홍길동', category: '전공필수', time: '화6, 화7, 수3', room: '030-0304' }
];

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

//강의목록 팝업창 : 메인 '+' 버튼 onclick (샘플)
const openSubjectList = () => {
  const url = 'sample.html';
  // const url = 'searchTimeTable.html';
  window.open(url, 'subject-list-popup', 'width=1200,height=800');
};



// 시간표 업데이트 함수
const updateTimetable = (subjects) => {
  // 시간표 초기화
  initializeTimetable();

  // 강의를 시간표에 추가
  subjects.forEach((subject) => {
    addSubjectToTimetable(subject);
  });
};


const MAX_TIMETABLE_HOURS =  9; // 최대 시간표 교시 수

// 시간표 초기화 및 기본 행 생성
const initializeTimetable = () => {
  const timetable = document.getElementById("main-timetable");

  // 기존 행 삭제
  while (timetable.firstChild) {
    timetable.firstChild.remove();
  }

  // 머리글 행 생성
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
    <th></th>
    <th>월</th>
    <th>화</th>
    <th>수</th>
    <th>목</th>
    <th>금</th>
    ${hasSaturdaySubject(tempSubjects) ? '<th>토</th>' : ''}
  `;
  timetable.appendChild(headerRow);

  // 기본 행 생성
  const days = ["월", "화", "수", "목", "금"];
  if (hasSaturdaySubject(tempSubjects)) {
    days.push("토");
    timetable.classList.add("has-saturday");
  }

  const maxSubjectHour = findMaxSubjectHour(tempSubjects); // tempSubjects를 전달
  const timetableHours = maxSubjectHour > MAX_TIMETABLE_HOURS ? maxSubjectHour : MAX_TIMETABLE_HOURS;

  console.log(timetableHours);

  for (let i = 1; i <= timetableHours; i++) {
    const row = document.createElement("tr");
    const th = document.createElement("th");
    const time = (8 + i) % 12 || 12; // 9, 10, 11, 12, 1, 2, ... 5
    th.textContent = time;
    row.appendChild(th);

    for (const day of days) {
      const td = document.createElement("td");
      td.dataset.day = day;
      td.dataset.time = i.toString();
      row.appendChild(td);
    }

    timetable.appendChild(row);
  }
};

// 토요일 강의 여부 확인
const hasSaturdaySubject = (subjects) => {
  for (const subject of subjects) {
    const dayTimePairs = subject.time.split(", ");
    for (const pair of dayTimePairs) {
      const [day, _] = pair.split(/([^\uAC00-\uD7A3]+)/);
      if (day === '토') {
        return true;
      }
    }
  }
  
  return false;
};


// 가장 큰 교시 확인
const findMaxSubjectHour = (subjects) => {
  let maxSubjectHour = 0;
  
  for (const subject of subjects) {
    const dayTimePairs = subject.time.split(", ");
    for (const pair of dayTimePairs) {
      const [_, time] = pair.split(/([^\uAC00-\uD7A3]+)/);
      const numericTime = Number(time);
      if (numericTime > maxSubjectHour) {
        maxSubjectHour = numericTime;
      }
    }
  }
  return maxSubjectHour;
};

// 시간표에 강의를 추가하는 함수
const addSubjectToTimetable = (subject) => {
  const dayTimePairs = subject.time.split(", ");
  let mergedRows = 1; // 통합된 행 수
  let mergedRowStart = null; // 통합된 행 시작 인덱스

  for (let i = 0; i < dayTimePairs.length; i++) {
    const [day, time] = dayTimePairs[i].split(/([^\uAC00-\uD7A3]+)/);
    const cell = document.querySelector(`#main-timetable td[data-day="${day}"][data-time="${time}"]`);
    if (cell.children.length > 0) {
      return;
    }
    if (i > 0) {
      const prevSubject = dayTimePairs[i - 1];
      const [prevDay, prevTime] = prevSubject.split(/([^\uAC00-\uD7A3]+)/);

      if (day === prevDay && Number(time) === Number(prevTime) + 1) {
        mergedRows++;
        continue;
      }
    }

    const div = document.createElement("div");
    div.textContent = subject.name;

    // 통합된 행인 경우, 이전 행들 삭제 및 월1 셀의 ROWSPAN 설정
    if (mergedRows > 1) {
      const startRowIndex = mergedRowStart.parentNode.rowIndex;
      const rowspan = mergedRows;
      const prevRow = mergedRowStart.parentNode;

      for (let j = 1; j < mergedRows; j++) {
        const currentRow = prevRow.nextElementSibling;
        currentRow.cells[startRowIndex].remove();
      }

      mergedRowStart.setAttribute("rowspan", rowspan);
    }

    cell.appendChild(div);

    // 빈 행 삭제
    const currentRow = cell.parentNode;
    const nextRow = currentRow.nextElementSibling;
    if (nextRow && nextRow.childElementCount === 1 && nextRow.firstElementChild.textContent === "") {
      nextRow.remove();
    }

    // 통합된 행 초기화
    mergedRows = 1;
    mergedRowStart = cell;
  }
};



// 시간표 업데이트
updateTimetable(tempSubjects);

const removeSubjectFromTimetable = (subject) => {
  // 시간표에서 강의 삭제
  const dayTimePairs = subject.time.split(", ");
  for (const pair of dayTimePairs) {
    const [day, time] = pair.split(/([^\uAC00-\uD7A3]+)/);
    const cell = document.querySelector(`#main-timetable td[data-day="${day}"][data-time="${time}"]`);
    const div = cell.querySelector(`div[data-subject="${subject.name}"]`);
    if (div) {
      cell.removeChild(div);
    }
  }

  // 서버 강의 삭제 요청
  $.ajax({
    url: '/api/remove-subject',
    method: 'POST',
    data: { subjectId: subject.id },
    success: function (response) {
      // 서버 응답 처리
      console.log('강의 삭제 요청이 성공적으로 처리되었습니다.');
    },
    error: function (xhr, status, error) {
      // 서버 요청이 실패한 경우 에러 처리
      console.error('강의 삭제 요청이 실패하였습니다.', error);
    }
  });
};