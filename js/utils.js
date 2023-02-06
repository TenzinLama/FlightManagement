class Util {
    static addObjToArrIfExists(arr, obj, key) {
        // will add object to array if object with key does not exist in arr. Will remove it otherwise
        const res = arr.filter(t => t[key] !== obj[key]);
        if(arr.length === res.length) {
            res.push(obj);
        }
        return res;
    }

    static generateId() {
        return String(Math.floor(Math.random() * 9999));
    }
}
