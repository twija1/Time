export function* idGenerator(){
    let index = 1;
    while (true){
        yield index++
    }
}

export function updateElementsName(list, id, newName){
    return list.map((element) => element.id !== id ? element : {...element, name: newName})
}

export function updateElement(list, id, property, value){
    return list.map((element) => element.id !== id ? element : {...element, [property]: value})
}

export function timeToString(time){
    const timeElapsed = new Date(time);
    const minutes = timeElapsed.getMinutes().toString().padStart(2, '0');
    const seconds = timeElapsed.getSeconds().toString().padStart(2, '0');
    const milliseconds = timeElapsed.getMilliseconds().toString().slice(0, -1).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

export function showDate(){
    const today = new Date();
    return today.getDate() + "." + parseInt(today.getMonth()+1) + "." + today.getFullYear()
}

export function showGivenDate(date){
    return date.getDate() + "." + parseInt(date.getMonth()+1) + "." + date.getFullYear()
}

export function isLogin() {
    return !!localStorage.getItem('TOKEN_KEY') //localStorage.getItem('TOKEN_KEY') ? true : false
}

export function login({email, password}) {
    return fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            return err
        });
}

export function logout() {
    localStorage.removeItem('TOKEN_KEY');
    window.location.reload()
}

export function register({name, email, password}) {
    return fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            return err
        });
}

export function getUserTimeRecords() {
    const token = localStorage.getItem('TOKEN_KEY');
    return fetch("http://localhost:4000/timeRecords", {
        method: "GET",
        headers: {
            "authorization": "Bearer "+token
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            return err
        });
}

export function addTimeRecord({name, timeElapsed, startDate, endDate}) {
    const token = localStorage.getItem('TOKEN_KEY');
    return fetch("http://localhost:4000/timeRecords", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer "+token
        },
        body: JSON.stringify({
            name,
            timeElapsed,
            startDate,
            endDate
        })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            return err
        });
}

export function deleteTimeRecord({id}) {
    const token = localStorage.getItem('TOKEN_KEY');
    return fetch("http://localhost:4000/timeRecords/"+id, {
        method: "DELETE",
        headers: {
            "authorization": "Bearer "+token
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
}

export function editTimeRecord({id, name, timeElapsed, startDate, endDate}) {
    const token = localStorage.getItem('TOKEN_KEY');
    return fetch("http://localhost:4000/timeRecords/"+id, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer "+token
        },
        body: JSON.stringify({
            name,
            timeElapsed,
            startDate,
            endDate
        })
    })
        .then(response => {
            console.log(response.json())
            return response.json();
        })
        .catch(err => {
            return err;
        });
}