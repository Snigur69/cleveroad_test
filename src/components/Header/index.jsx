import React from 'react';
import styles from './style.module.css';

import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

const Header = ({openModal, logOut}) => {
    const user = useSelector(state => state.user);

    return (
        <div className={styles.header}>
            <Link to="/">Каталог</Link>
            {user ? (
                <>
                    <button onClick={openModal} className={styles.add_product}>Добавить товар</button>
                    <button onClick={logOut} >Выйти</button>
                </>
            ) : (
                <Link to="/login">Войти</Link>
            )}

        </div>
    )
}

export default Header;