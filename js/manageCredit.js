
// 샘플 데이터를 대신 사용할 객체
const db = {
    completedCourses: [1, 2, 4, 5, 7],
    creditsByArea: {
      1: 3,
      2: 2,
      3: 0,
      4: 3,
      5: 2,
      6: 0,
      7: 3,
      8: 0,
    },
  };
  
  const completedCourses = db.completedCourses;
  const creditsByArea = db.creditsByArea;
  
  // 졸업 요건 충족 여부를 결정합니다.
  const completedAreas = completedCourses.reduce((areas, course) => {
    const area = Math.floor(course / 10);
    areas.add(area);
    return areas;
  }, new Set());
  
  const completedCreditsByArea = Object.keys(creditsByArea).reduce(
    (areas, area) => {
      if (completedAreas.has(Number(area))) {
        areas += creditsByArea[area];
      }
      return areas;
    },
    0
  );
  
  const completionMsg =
    completedCourses.length >= 5 && completedCreditsByArea >= 10
      ? "졸업 요건을 충족합니다."
      : "졸업 요건을 충족하지 않습니다.";
  
  // completedCourses 배열을 사용하여 텍스트를 생성
  const kindsText = completedCourses
    .map((area) => {
      return `${area}영역`;
    })
    .join(", ");
  
  // HTML 요소에 텍스트를 할당
  document.getElementById("div-completed_balance").textContent = completionMsg;
  document.getElementById("div-completed_balance_kinds").textContent = kindsText;
  document.getElementById("div-completed_balance_safe").textContent = completedCreditsByArea >= 10 ? " (안전영역 만족)" : "";
  