export const storage = {
    get (name) {
        return window.localStorage.getItem(name);
    },
    set (name , value) {
        return window.localStorage.setItem(name , value);
    },
    remove (name) {
        return window.localStorage.removeItem(name);
    },
    clear () {
        return window.localStorage.clear();
    }
};
