//이지민 작성

window.onload = async function checkLogin(){
    let payload = localStorage.getItem("payload")
    let parsed_payload = await JSON.parse(payload)

    const username = document.getElementById("username")
    const logout_button = document.getElementById("logout")

    if(parsed_payload){
        console.log('2')
        //메인 페이지로 이동 추가
        username.innerText = parsed_payload.username
    }else{
        console.log('3')
        console.log(login_button)
        //로그인 페이지로 이동 추가
    }
}