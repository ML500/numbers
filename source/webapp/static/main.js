function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
let csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

async function makeRequest(url, method='GET', body ={}) {
    if (csrfSafeMethod(method)) {
        let response = await fetch(url, {method},);
        if (response.ok) {  // нормальный ответ
            return await response.text();
        } else {            // ошибка
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    } else {
        let header = {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        };
        let response = await fetch(url, {method, body: JSON.stringify(body), headers: header,},);
        if (response.ok) {  // нормальный ответ
            return await response.text();
        } else if(response.status===400){
            return await response.text();
        }
        else {            // ошибка
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}

window.onload = async function(){
    let answer = document.getElementById("answer")
    let add = document.getElementById("add");
    add.onclick = async function (event) {

        let a = document.getElementById("A").value;
        let b = document.getElementById("B").value;


        event.preventDefault();
        answer.innerText = ""
        let data = await makeRequest("http://localhost:8000/api/v1/add/","POST",{"A":Number(a),"B":Number(b)});
        // let child = document.createElement('div')
        // answer.append(child)
        data = JSON.parse(data)
        answer.style.textAlign = 'center'
        answer.style.fontSize = '50px'
        if (data["answer"]){
            answer.innerText = data["answer"]
            answer.style.color = 'green'
        }else {
            answer.innerText = data["error"]
            answer.style.color = 'red'
        }
        console.log(data)

    }

    let substract = document.getElementById("substract");
    substract.onclick = async function (event) {

        let a = document.getElementById("A").value;
        let b = document.getElementById("B").value;

        event.preventDefault();
        answer.innerText = ""
        let data = await makeRequest("http://localhost:8000/api/v1/substract/","POST",{"A":Number(a),"B":Number(b)});
        data = JSON.parse(data)
        answer.style.textAlign = 'center'
        answer.style.fontSize = '50px'
        if (data["answer"]){
            answer.innerText = data["answer"]
            answer.style.color = 'green'
        }else {
            answer.innerText = data["error"]
            answer.style.color = 'red'
        }
        console.log(data)
    }

    let multiply = document.getElementById("multiply");
    multiply.onclick = async function (event) {

        let a = document.getElementById("A").value;
        let b = document.getElementById("B").value;


        event.preventDefault();
        answer.innerText = ""
        let data = await makeRequest("http://localhost:8000/api/v1/multiply/","POST",{"A":Number(a),"B":Number(b)});
        // let child = document.createElement('div')
        // answer.append(child)
        data = JSON.parse(data)
        answer.style.textAlign = 'center'
        answer.style.fontSize = '50px'
        if (data["answer"]){
            answer.innerText = data["answer"]
            answer.style.color = 'green'
        }else {
            answer.innerText = data["error"]
            answer.style.color = 'red'
        }
        console.log(data)
    }
    let divide = document.getElementById("divide");
    divide.onclick = async function (event) {

        let a = document.getElementById("A").value;
        let b = document.getElementById("B").value;


        event.preventDefault();
        answer.innerText = ""
        let data = await makeRequest("http://localhost:8000/api/v1/divide/","POST",{"A":Number(a),"B":Number(b)});
        // let child = document.createElement('div')
        // answer.append(child)
        data = JSON.parse(data)
        answer.style.textAlign = 'center'
        answer.style.fontSize = '50px'
        if (data["answer"]){
            answer.innerText = data["answer"]
            answer.style.color = 'green'
        }else {
            answer.innerText = data["error"]
            answer.style.color = 'red'
        }
        console.log(data)
    }
}