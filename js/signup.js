//이지민 작성
const backend_base_url = ""
const frontend_base_url = ""

async function handleSignup(){
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
    
    const response = await fetch(`${backend_base_url}/users/`,{
        headers:{
            'Content-type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(signup_data)
    }
    )

    response_json = await response.json()

    if (response.status == 200){
        window.location.replace(`${frontend_base_url}/index.html`);
    }else{
        alert(response.status)
    }
}

async function handleLogin(){
    console.log("handle login")

    const login_data = {
        id : document.getElementById("id"),
        password : document.getElementById("password").value
    }
    
    const response = await fetch(`${backend_base_url}/users/api/token/`,{
        headers:{
            'Content-type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(login_data)
    }
    )

    response_json = await response.json()
    console.log(response_json.access)

    if (response.status == 200){
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh)

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        window.location.replace(`${frontend_base_url}/`);
    }else{
        alert(response.status)
    }
}

async function handleLogout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃되었습니다.")
    location.reload()
}

const id_inputcheck =()=>{
    const id_check = /^[a-z]+[a-z0-9]{5,19}$/g;
}
const password_inputcheck =()=>{
    const password_check = /^.*(?=^.{5,19}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,*,(,),=,+,_,.,|]).*$/;
}