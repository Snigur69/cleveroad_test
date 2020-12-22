import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import firebase from "firebase/app";
import "firebase/auth";

import "./App.css";

import Header from "./components/Header";
import Auth from "./containers/Auth";
import Products from "./containers/Products";
import ManageProduct from "./containers/ManageProduct";

import { setUser } from "./containers/Auth/actons";
import { deleteProduct, pushProduct, editProductById } from "./services/api";
import { removeUserFromLocalStorage } from "./services/auth";

const App = () => {
    const [productsTrigger, setProductsTrigger] = useState(false);
    const [modal, setModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        let user = localStorage.getItem("cleveroad_user");
        if (user) {
            dispatch(setUser(user));
        }
    }, []);

    const openModal = (e) => {
        if (e.target.dataset.id) {
            setCurrentProduct(e.target.dataset.id);
        }
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setCurrentProduct("");
        setProductsTrigger(!productsTrigger);
    };

    const removeProduct = (e) => {
        deleteProduct(e.target.dataset.id);
        setProductsTrigger(!productsTrigger);
    };

    const logOut = (e) => {
        e.preventDefault();
        dispatch(setUser(null));
        firebase.auth().signOut();
        removeUserFromLocalStorage();
    };

    return (
        <div className="StoreApp">
            <Router>
                <Header openModal={openModal} logOut={logOut} />
                <Switch>
                    <Route path="/login">
                        <Auth />
                    </Route>
                    <Route path="/">
                        <Products
                            productsTrigger={productsTrigger}
                            openModal={openModal}
                            removeProduct={removeProduct}
                        />
                    </Route>
                </Switch>
            </Router>
            {modal &&
                (currentProduct ? (
                    <ManageProduct
                        submitForm={editProductById}
                        id={currentProduct}
                        closeModal={closeModal}
                        type="EDIT"
                    />
                ) : (
                    <ManageProduct
                        submitForm={pushProduct}
                        closeModal={closeModal}
                        type="ADD"
                    />
                ))}
        </div>
    );
};

export default App;
