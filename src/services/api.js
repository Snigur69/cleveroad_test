import firebase from "firebase";

export const getProducts = async () => {
    try {
        return await firebase.database().ref('products').once('value').then((response) => {
            return response.val();
        }).catch((error) => {
            throw new Error(error)
        });

    } catch (error) {
        throw error;
    }
}

export const getProductById = async (id) => {
    try {
        return await firebase.database().ref(`products/${id}`).once('value').then((response) => {
            return response.val();
        }).catch((error) => {
            throw new Error(error)
        });

    } catch (error) {
        throw error;
    }
}

export const pushProduct = async (product) => {
    return await firebase.database().ref('products').push(product).then(function(){
        return 200;
    }).catch(function(error) {
        throw error;
    });
}


export const editProductById = async (product, id) => {
    return await firebase.database().ref(`products/${id}`).update(product).then(function(){
        return 200;
    }).catch(function(error) {
        throw error;
    });
}


export const deleteProduct = async (id) => {
    return await firebase.database().ref(`products/${id}`).remove().then(function(){
        return 200;
    }).catch(function(error) {
        throw error;
    });
}