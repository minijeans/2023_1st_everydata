// 임의의 데이터베이스
const data = [
  { area: 1, credit: 2, completed: true },
  { area: 2, credit: 3, completed: true },
  { area: 3, credit: 2, completed: true },
  { area: 4, credit: 1, completed: true },
  { area: 5, credit: 1, completed: true },
  { area: 6, credit: 2, completed: false },
  { area: 7, credit: 2, completed: false },
  { area: 8, credit: 1, completed: false }
];

// 졸업요건 충족했는지 여부를 판단하는 함수
function calculateCompletedCreditsByArea() {
  const completedCredits = Array(8).fill(0);

  data.forEach(item => {
    if (item.completed) {
      completedCredits[item.area - 1] += item.credit;
    }
  });

  const completedAreas = [];
  for (let i = 0; i < completedCredits.length; i++) {
    if (completedCredits[i] >= 2) {
      completedAreas.push(i + 1);
    }
  }

  if (completedAreas.length >= 5) {
    const graduationRequirement = `[균형교양]은 ${completedAreas.join(',')} 영역을 이수했습니다. 졸업요건을 충족합니다.`;
    document.getElementById('graduation-requirement').textContent = graduationRequirement;
  } else {
    const graduationRequirement = `[균형교양]은 ${completedAreas.join(',')} 영역을 이수했습니다. 졸업요건을 충족하지 않습니다.`;
    document.getElementById('graduation-requirement').textContent = graduationRequirement;
  }

  return completedCredits;
}

calculateCompletedCreditsByArea();

// 임의의 데이터베이스(남서린 이수내역확인표)
// 소요
const coreCapacityNeed = 10;
const balanceIntegrationNeed = 10;
const foundationNeed = 9;
const generalNeed = 6;
const majorEssentialNeed = 18;
const majorElectiveNeed = 21;
const minorEssentialNeed = 21;
const minorElectiveNeed = 15;
const teachingNeed = 0;
const remaining1Need = 0;
const remaining2Need = 0;

// 취득
const coreCapacityAcquire = 10;
const balanceIntegrationAcquire = 16;
const foundationAcquire = 12;
const generalAcquire = 9;
const majorEssentialAcquire = 12;
const majorElectiveAcquire = 15;
const minorEssentialAcquire = 6;
const minorElectiveAcquire = 3;
const teachingAcquire = 0;
const remaining1Acquire = 0;
const remaining2Acquire = 0;

// 잔여
// 취득학점이 소요학점 이상일 경우 0(단순히 빼기하면 취득이 소요보다 클때 마이너스 값이 나옴)
// 취득학점이 소요학점 미만일 경우 소요학점-취득학점 출력
let coreCapacityRemaining = coreCapacityNeed - coreCapacityAcquire;
if (coreCapacityAcquire >= coreCapacityNeed) {
  coreCapacityRemaining = 0;
} else {
  coreCapacityRemaining = coreCapacityNeed - coreCapacityAcquire;
}

let balanceIntegrationRemaining = balanceIntegrationNeed - balanceIntegrationAcquire;
if (balanceIntegrationAcquire >= balanceIntegrationNeed){
  balanceIntegrationRemaining = 0;
} else {
  balanceIntegrationRemaining = balanceIntegrationNeed - balanceIntegrationAcquire;
}

let foundationRemaining = foundationNeed - foundationAcquire;
if (foundationAcquire >= foundationNeed){
  foundationRemaining = 0;
} else {
  foundationRemaining = foundationNeed - foundationAcquire;
}

let generalRemaining = generalNeed - generalAcquire;
if (generalAcquire>=generalNeed){
  generalRemaining=0;
} else {
  generalRemaining=generalNeed-generalAcquire;
}

let majorEssentialRemaining = majorEssentialNeed - majorEssentialAcquire;
if(majorEssentialAcquire>=majorEssentialNeed){
  majorEssentialRemaining=0;
} else {
  majorEssentialRemaining = majorEssentialNeed-majorEssentialAcquire;
}

let majorElectiveRemaining = majorElectiveNeed - majorElectiveAcquire;
if (majorElectiveAcquire>=majorElectiveNeed){
  majorElectiveRemaining=0;
} else{
  majorElectiveRemaining=majorElectiveNeed-majorElectiveAcquire;
}

let minorEssentialRemaining = minorEssentialNeed - minorEssentialAcquire;
if (minorEssentialAcquire>=minorEssentialNeed){
  minorElectiveRemaining = 0;
} else {
  minorEssentialRemaining = minorEssentialNeed - minorEssentialAcquire;
}

let minorElectiveRemaining = minorElectiveNeed - minorElectiveAcquire;
if (minorElectiveAcquire>=minorElectiveNeed){
  minorElectiveRemaining = 0;
} else {
  minorElectiveRemaining = minorElectiveNeed- minorElectiveAcquire;
}

let teachingRemaining = teachingNeed - teachingAcquire;
if (teachingAcquire<=teachingNeed){
  teachingRemaining = 0;
} else{
  teachingRemaining = teachingNeed-teachingAcquire;
}

let remaining1Remaining = remaining1Need - remaining1Acquire;
if (remaining1Acquire>=remaining1Need){
  remaining1Remaining=0;
} else{
  remaining1Remaining=remaining1Need-remaining1Acquire;
}

let remaining2Remaining = remaining2Need - remaining2Acquire;
if (remaining2Acquire>=remaining2Need){
  remaining2Remaining=0;
} else{
  remaining2Remaining=remaining2Need-remaining2Acquire;
}



// 각 td 엘리먼트에 값 넣기
document.getElementById("core-capacity-need").innerHTML = coreCapacityNeed;
document.getElementById("balance-integration-need").innerHTML = balanceIntegrationNeed;
document.getElementById("foundation-need").innerHTML = foundationNeed;
document.getElementById("general-need").innerHTML = generalNeed;
document.getElementById("major-essential-need").innerHTML = majorEssentialNeed;
document.getElementById("major-elective-need").innerHTML = majorElectiveNeed;
document.getElementById("minor-essential-need").innerHTML = minorEssentialNeed;
document.getElementById("minor-elective-need").innerHTML = minorElectiveNeed;
document.getElementById("teaching-need").innerHTML = teachingNeed;
document.getElementById("remaining1-need").innerHTML = remaining1Need;
document.getElementById("remaining2-need").innerHTML = remaining2Need;

document.getElementById("core-capacity-acquire").innerHTML = coreCapacityAcquire;
document.getElementById("balance-integration-acquire").innerHTML = balanceIntegrationAcquire;
document.getElementById("foundation-acquire").innerHTML = foundationAcquire;
document.getElementById("general-acquire").innerHTML = generalAcquire;
document.getElementById("major-essential-acquire").innerHTML = majorEssentialAcquire;
document.getElementById("major-elective-acquire").innerHTML = majorElectiveAcquire;
document.getElementById("minor-essential-acquire").innerHTML = minorEssentialAcquire;
document.getElementById("minor-elective-acquire").innerHTML = minorElectiveAcquire;
document.getElementById("teaching-acquire").innerHTML = teachingAcquire;
document.getElementById("remaining1-acquire").innerHTML = remaining1Acquire;
document.getElementById("remaining2-acquire").innerHTML = remaining2Acquire;

document.getElementById("core-capacity-remaining").innerHTML = coreCapacityRemaining;
document.getElementById("balance-integration-remaining").innerHTML = balanceIntegrationRemaining;
document.getElementById("foundation-remaining").innerHTML = foundationRemaining;
document.getElementById("general-remaining").innerHTML = generalRemaining;
document.getElementById("major-essential-remaining").innerHTML = majorEssentialRemaining;
document.getElementById("major-elective-remaining").innerHTML = majorElectiveRemaining;
document.getElementById("minor-essential-remaining").innerHTML = minorEssentialRemaining;
document.getElementById("minor-elective-remaining").innerHTML = minorElectiveRemaining;
document.getElementById("teaching-remaining").innerHTML = teachingRemaining;
document.getElementById("remaining1-remaining").innerHTML = remaining1Remaining;



// 현재 날짜 기반으로 년도와 학기 출력
var today = new Date();
var year = today.getFullYear();
var semester = today.getMonth() < 6 ? 1 : 2;
var message = year + '년 ' + semester + '학기에 개설된 전공';

document.getElementById('p-semester_date').innerHTML = message;

//학기별 개설 전공을 데이터베이스(mysql에서 가져오기)
// 테이블 요소 선택
const table = document.getElementById('div-search_major');

// 테이블 헤더 추가
const headerRow = table.insertRow(); // 테이블에다가 새로운 행 추가하기
const header1 = headerRow.insertCell(0); // 행에 새로운 셀 추가(각각 grade, category, credit, subject_name을 넣을거임)
const header2 = headerRow.insertCell(1);
const header3 = headerRow.insertCell(2);
const header4 = headerRow.insertCell(3);
header1.innerHTML = '학년'; // 각 셀에 텍스트 추가
header2.innerHTML = '이수구분';
header3.innerHTML = '학점';
header4.innerHTML = '교과목명';

// 데이터 추가
for (let i = 0; i < data.length; i++) {
  const grade = data[i].grade; // 현재 데이터의 학년 정보
  const category = data[i].category; // 현재 데이터의 이수구분 정보
  const credit = data[i].credit; // 현재 데이터의 학점 정보
  const subject_name = data[i].subject_name; // 현재 데이터의 교과목명 정보

  // 새로운 행 추가
  const row = table.insertRow();

  // 각 셀에 데이터 추가
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  cell1.innerHTML = grade;
  cell2.innerHTML = category;
  cell3.innerHTML = credit;
  cell4.innerHTML = subject_name;
}


