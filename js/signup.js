//이지민 작성

const signup_data = {
    id : document.getElementById("id"),
    password : document.getElementById("password").value,
    repassword : document.getElementById("repassword").value,
    username : document.getElementById("username").value,
    academic_number : document.getElementById("academic_number").value,
    academic_status : document.getElementById("status").value,
    curriculum_year : document.getElementById("curriculum_year").value,
    grade : document.getElementById("grade").value,
    major : document.getElementById("major").value,
    double_major : document.getElementById("double_major").value,
    minor : document.getElementById("minor").value
}


const id_inputcheck =()=>{
    const id_check = /^[a-z]+[a-z0-9]{5,19}$/g;
}
const password_inputcheck =()=>{
    const password_check = /^.*(?=^.{5,19}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,*,(,),=,+,_,.,|]).*$/;
}