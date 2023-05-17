// 강의 추천 결과를 화면에 표시하는 함수
function displayResults(results) {
  const resultContainer = document.getElementById("result-container");
  
  // 결과 컨테이너를 비웁니다.
  resultContainer.innerHTML = "";
  
  // 추천 결과에 따라 각각의 요소를 생성해서 컨테이너에 추가합니다.
  results.forEach(function(result) {
    const title = result.title;
    const description = result.description;
    const link = result.link;
    
    // 결과를 보여주는 HTML 요소를 생성합니다.
    const resultElement = document.createElement("div");
    const titleElement = document.createElement("h3");
    const descriptionElement = document.createElement("p");
    const linkElement = document.createElement("a");
    
    titleElement.innerText = title;
    descriptionElement.innerText = description;
    linkElement.href = link;
    linkElement.innerText = "Go to course page";
    
    resultElement.appendChild(titleElement);
    resultElement.appendChild(descriptionElement);
    resultElement.appendChild(linkElement);
    
    resultContainer.appendChild(resultElement);
  });
}

// 강의 추천을 실행하는 함수
function recommendCourses() {
  // 사용자가 입력한 카테고리를 가져옴
  const category = getCategory();
  
  // AJAX 요청을 보내서 강의 추천 결과를 가져오기
  $.ajax({
    url: "/recommend-courses",
    type: "POST",
    data: { category: category },
    dataType: "json",
    success: function(data) {
      // 강의 추천 결과를 화면에 표시합니다.
      displayResults(data.results);
    },
    error: function(xhr, status, error) {
      console.log(xhr);
      console.log(status);
      console.log(error);
    }
  });
}
// 다시 추천 받기 눌렀을 때--------------------------------------------
// "다시 추천 받기" 버튼 요소 가져오기
const reRecommendBtn = document.getElementById("section-re_recommend");


// "다시 추천 받기" 버튼 클릭 이벤트 처리
reRecommendBtn.addEventListener("click", function(event) {
  event.preventDefault(); // 기본 동작(페이지 새로고침) 방지

  // Python 파일 경로
  const pythonFile = "../python/skatjfls_recommend.py";

  // Python 파일 호출 코드 작성 (예시: AJAX 사용)
  const xhr = new XMLHttpRequest();
  xhr.open("GET", pythonFile, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText); // Python 파일에서 반환된 응답 출력
    }
  };
  xhr.send();
});


// @@@@@얘도 마찬가지로 오류 발생하는데 보안 이슈라 가상환경 구축이 완료되어야할 것 같아요@@@@@@@@@@@@@@@@@@@@@@@@