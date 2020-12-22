import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Registration from "../../components/Registration";
import SignIn from "../../components/SignIn";
import { setUser } from "./actons";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/messaging";
import { setUserToLocalStorage } from "../../services/auth";

const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const [loginError, setLoginError] = useState("");

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            history.push("/");
        }
    }, []);

    const registerToggle = () => {
        setIsRegister(!isRegister);
    };

    const handleRegister = async (email, password, name) => {
        try {
            setRegisterError("");
            const data = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async function (userCred) {
                    await userCred.user.updateProfile({
                        displayName: name,
                    });
                    return userCred;
                })
                .catch((error) => {
                    setRegisterError(error.message);
                });
            setUserToLocalStorage(data.user.uid);
            dispatch(setUser(data.user.uid));
            history.push("/");
        } catch (error) {
            setRegisterError(error.message);
        }
    };

    const handleSignIn = async (email, password) => {
        try {
            setLoginError("");
            const data = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
            setUserToLocalStorage(data.user.uid);
            dispatch(setUser(data.user.uid));
            history.push("/");
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return user ? (
        <></>
    ) : (
        <div>
            {isRegister ? (
                <Registration
                    registerError={registerError}
                    handleRegister={handleRegister}
                    setRegister={registerToggle}
                />
            ) : (
                <SignIn
                    loginError={loginError}
                    handleSignIn={handleSignIn}
                    setRegister={registerToggle}
                />
            )}
        </div>
    );
};

export default Auth;
