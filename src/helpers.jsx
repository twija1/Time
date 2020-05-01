const TOKEN_KEY = 'jwt';

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
export function isLogin() {
    return localStorage.getItem(TOKEN_KEY)
}

export function login() {
    localStorage.setItem(TOKEN_KEY, 'TestLogin')
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY)
}