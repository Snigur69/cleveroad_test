import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import {useSelector} from 'react-redux';

import {getDaysDiff} from './helper';

const ProductCard = ({id, image, name, description, price, discount, discountEnd, removeProduct, openModal}) => {
    const [dateDiff, setDateDiff] = useState(0);
    const user = useSelector(state => state.user)

    useEffect(() => {
        setDateDiff(getDaysDiff(discountEnd));
    }, [discountEnd])


    return(
        <div className={styles.product_card}>
            <img src={image} alt=""/>
            <p className={styles.title}>{name}</p>
            <p className={styles.description}>{description}</p>
            {(dateDiff > 0) ? (
                <>
                    <p className={styles.price + ' ' + styles.old_price}>{price} UAH</p>
                    <p className={styles.price + ' ' + styles.discount}>{price - Math.round(price * (discount / 100))} UAH</p>
                    <div className={styles.discountEnd_wrap}>
                        <p className={styles.discountEnd}>{dateDiff}</p>
                    </div>
                </>
            ) : (
                    <p className={styles.price}>{price} UAH</p>
            )}
            {
                user && (
                    <div className={styles.product_controls}>
                        <button data-id={id} onClick={openModal} variant="contained" className={styles.edit}>Редактировать</button>
                        <button data-id={id} onClick={removeProduct} className={styles.remove}>Удалить</button>
                    </div>
                )
            }
           
            
        </div>
    )
}
export default ProductCard;