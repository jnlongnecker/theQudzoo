function capitalize(string) {
    let ret = '';
    for (let i = 0; i < string.length; i++) {
        ret += i == 0 ? string[i].toUpperCase() : string[i].toLowerCase();
    }
    return ret;
}

export { capitalize };