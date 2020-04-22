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
