//이지민 작성
//임의 DB
const tempCompleted = [
    {id: 1, semester_completed: "2023-1", category: "전공필수", name: "프로그래밍언어론",  credit: 3, score: "A+"},
    {id: 2, semester_completed: "2023-1", category: "전공필수", name: "프로그래밍언어론",  credit: 3, score: "A+"},
    {id: 3, semester_completed: "2023-1", category: "전공필수", name: "프로그래밍언어론",  credit: 3, score: "A+"},
    {id: 4, semester_completed: "2023-1", category: "전공필수", name: "프로그래밍언어론",  credit: 3, score: "A+"},
    {id: 5, semester_completed: "2023-1", category: "전공필수", name: "프로그래밍언어론",  credit: 3, score: "A+"}
]

const completed_table = document.getElementById("subjects-completed");
tempCompleted.forEach(subjects => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${subjects.semester_completed}</td>
    <td>${subjects.category}</td>
    <td>${subjects.name}</td>
    <td>${subjects.credit}</td>
    <td>${subjects.score}</td>
  `;
  completed_table.appendChild(tr);
});

const tempScore = [
    {id: 1, semester: "1-1", total_score: 4.5, major_score: 4.5},
    {id: 2, semester: "1-2", total_score: 4.2, major_score: 4.0},
    {id: 3, semester: "2-1", total_score: 4.0, major_score: 4.3},
    {id: 4, semester: "2-2", total_score: 3.5, major_score: 3.85},
    {id: 5, semester: "3-1"},
    {id: 6, semester: "3-2"},
    {id: 7, semester: "4-1"},
    {id: 8, semester: "4-2"}
]

// const score_table = document.getElementById("score_graph");
// tempScore.forEach(subjects => {
//   const tr = document.createElement("tr");
//   tr.innerHTML = `
//     <td>${subjects.semester}</td>
//     <td>${subjects.total_score}</td>
//     <td>${subjects.major_score}</td>
//   `;
//   score_table.appendChild(tr);
// });

// document.addEventListener('DOMContentLoaded', function() {
//     new CharacterData(document.getElementById("score_chart"), v_config);
// })
let labels = [];
let totals = [];
let majors = [];
for (let smst of tempScore){
    labels.push(smst.semester);
    totals.push(smst.total_score);
    majors.push(smst.major_score);
}

const ctx = document.getElementById("myChart").getContext('2d');
const myChart = new Chart(ctx, {
    type:'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: '전체',
                data: totals,
                borderColor: '#40BBCA',
                backgroundColor: '#d3f0f0',
                borderWidth: 1
            },
            {
                label: '전공',
                data: majors,
                borderColor: '#A5A5A5',
                backgroundColor: '#D9D9D9',
                borderWidth: 1
            }
        ]
    },
    options: {
        maintainAspectRatio :false,
        // legend: {
        //     position: 'bottom'
        // },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
});

//사용자 프로필 : 메인 기준, 마이페이지용 확인
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