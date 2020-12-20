export const productsTransform = (products) => {
    let arr = [];
    for(let key in products) {
        let tempObj = {
            id: key,
            ...products[key]
        }
        arr.push(tempObj);
    }
    return arr;
}