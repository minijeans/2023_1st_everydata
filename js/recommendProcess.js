// 제출 버튼 요소 가져오기
const submitBtn = document.getElementById("input-recommend_submit");

// 제출 버튼 클릭 이벤트 리스너 추가
submitBtn.addEventListener("click", function(event) {
  event.preventDefault(); // 기본 동작 방지 (페이지 새로고침)

  // 1. 공강 요일 선택
  const dayInputs = document.querySelectorAll("input[name='day']");
  let selectedDay = null;
  dayInputs.forEach(function(input) {
    if (input.checked) {
      selectedDay = input.value;
    }
  });

  // 2. 강의 추천으로 채우고 싶은 학점 입력
  const fillCreditInput = document.getElementById("div-fill_credit");
  const fillCredit = fillCreditInput.value;

  // 3. 선호하는 과목의 영역 선택
  const balanceClassInputs = document.querySelectorAll("input[name='balanceClass']:checked");
  const coreClassInputs = document.querySelectorAll("input[name='CoreClass']:checked");
  const rootClassInputs = document.querySelectorAll("input[name='RootClass']:checked");

  // 선택된 영역 값을 리스트로 만들기
  const balanceClassValues = [];
  balanceClassInputs.forEach(function(input) {
    balanceClassValues.push(input.value);
  });

  const coreClassValues = [];
  coreClassInputs.forEach(function(input) {
    coreClassValues.push(input.value);
  });

  const rootClassValues = [];
  rootClassInputs.forEach(function(input) {
    rootClassValues.push(input.value);
  });

  // 전송할 데이터 객체 생성
  const formData = {
    selectedDay: selectedDay,
    fillCredit: fillCredit,
    balanceClass: balanceClassValues,
    coreClass: coreClassValues,
    rootClass: rootClassValues
  };

  // 서버로 데이터 전송
  fetch("/api/formdata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    // 서버로부터 응답을 받은 후 실행할 코드 작성
  })
  .catch(function(error) {
    console.error("Error:", error);
  });
});

document.getElementById("input-recommend_submit").addEventListener("click", function() {
  var selectedDay = document.querySelector('input[name="day"]:checked');
  var fillCredit = document.getElementById("div-fill_credit").value;
  var selectedClasses = document.querySelectorAll('input[name="balanceClass"]:checked, input[name="CoreClass"]:checked, input[name="RootClass"]:checked');
  
  if (!selectedDay || fillCredit === "" || selectedClasses.length === 0) {
    var alertMessage = "";
    if (!selectedDay) alertMessage += "1번 ";
    if (fillCredit === "") alertMessage += "2번 ";
    if (selectedClasses.length === 0) alertMessage += "3번 ";
    alert(alertMessage.trim() + " 문항을 입력해주세요.");
  } else {
    location.href = "recommendResult.html";
  }
});

document.getElementById('input-recommend_submit').onclick = function() {
  // 필수 입력 항목이 모두 입력되었는지 확인
  if (document.querySelector('input[name="day"]:checked') && document.getElementById('div-fill_credit').value && document.querySelector('input[name="balanceClass"]:checked')) {
    // 필수 입력 항목이 모두 입력된 경우, 강의 추천 결과 페이지로 이동
    location.href='recommendResult.html';
  } else {
    // 필수 입력 항목 중 입력되지 않은 항목이 있는 경우, alert 메시지 띄우기
    if (!selectedDay || fillCredit === "" || selectedClasses.length === 0) {
      var alertMessage = "";
      if (!selectedDay) alertMessage += "1번 ";
      if (fillCredit === "") alertMessage += "2번 ";
      if (selectedClasses.length === 0) alertMessage += "3번 ";
      alert(alertMessage.trim() + " 문항을 입력해주세요.");
    }
    alert('입력되지 않은 문항이 있습니다. 모든 항목을 입력해주세요.');
  }
};

