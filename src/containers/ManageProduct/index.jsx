import React, {useState, useEffect} from 'react';
import Portal from '../../components/Portal';
import { Formik } from "formik";
import { object, string, number } from "yup";

import {getProductById} from '../../services/api';
import {getCurrentDate} from './helper';

import styles from './styles.module.css';

import close from '../../assets/img/close.png';

const ManageProduct = ({closeModal, id, submitForm, type}) => {
    const [currentProduct, setCurrentProduct] = useState(null)

    useEffect( () => {
            if(id) {
                getProductById(id).then((response) => {
                    setCurrentProduct(response);
                }).catch((error) => {
                    throw new Error(error);
                })
            } else {
                setCurrentProduct({
                    name: '',
                    description: '',
                    image: '',
                    price: '',
                    discount: '',
                    discountEnd: ''
                });
            }      
    }, [])


    
    return currentProduct && (
            <Portal>
                <div className={styles.manage_product}>
                    <img onClick={closeModal} className={styles.close} src={close} alt=""/>
                    {
                        (type === 'ADD') ? (
                            <p className={styles.modal_title}>Добавить товар</p>

                        ) : (
                            <p className={styles.modal_title}>Редактировать товар</p>
                        )
                    }
                    <Formik
                    initialValues={{
                        name: currentProduct.name,
                        description: currentProduct.description,
                        image: currentProduct.image,
                        price: currentProduct.price,
                        discount: currentProduct.discount,
                        discountEnd: currentProduct.discountEnd
                    }}
                    validationSchema={object().shape({
                        name: string()
                            .min(20, "Минимум 20 символов")
                            .max(60, "Максимум 60 символов")
                            .required("Поле обязательное!"),
                        description: string()
                            .max(200, "Максимум 200 символов"),
                        image: string()
                            .required("Поле обязательное!"),
                        price: number()
                            .moreThan(0, 'Положительное число')
                            .max(99999999.99, 'Превышено максимальное значение')
                            .required("Поле обязательное!"),
                        discount: number()
                            .min(10, 'Минимальное значение - 10')
                            .max(90, 'Максимальное значение - 90')
                    })}
                    onSubmit={async (values) => {
                        await submitForm(values, id).then((response) => {
                            if(response === 200) {
                                closeModal();
                            }
                        }).catch((error) => {
                            throw new Error(error);
                        })
                    }}
                >
                    {({
                        values,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.input_wrap}>
                                <label htmlFor="name">Название</label>
                                <input
                                    disabled={isSubmitting}
                                    className={
                                        errors.name && styles.error_input
                                    }
                                    name="name"
                                    placeholder="Название"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    error={errors.name}
                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <p className={styles.error}>
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className={styles.input_wrap}>
                            <label htmlFor="description">Описание</label>
                                <input
                                    disabled={isSubmitting}
                                    className={
                                        errors.description && styles.error_input
                                    }
                                    name="description"
                                    placeholder="Описание"
                                    value={values.description}
                                    onBlur={handleBlur}
                                    error={errors.description}
                                    onChange={handleChange}
                                />
                                {errors.description && (
                                    <p className={styles.error}>
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className={styles.input_wrap}>
                            <label htmlFor="image">Изображение</label>
                                <input
                                    disabled={isSubmitting}
                                    className={
                                        errors.image && styles.error_input
                                    }
                                    name="image"
                                    placeholder="Изображение"
                                    value={values.image}
                                    onBlur={handleBlur}
                                    error={errors.image}
                                    onChange={handleChange}
                                />
                                {errors.image && (
                                    <p className={styles.error}>
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <div className={styles.input_wrap}>
                            <label htmlFor="price">Цена</label>
                                <input
                                    disabled={isSubmitting}
                                    className={
                                        errors.price && styles.error_input
                                    }
                                    name="price"
                                    placeholder="Цена"
                                    value={values.price}
                                    onBlur={handleBlur}
                                    error={errors.price}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {errors.price && (
                                    <p className={styles.error}>
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            <div className={styles.input_wrap}>
                            <label htmlFor="discount">Скидка</label>
                                <input
                                    disabled={isSubmitting}
                                    className={
                                        errors.discount && styles.error_input
                                    }
                                    type="number"
                                    name="discount"
                                    placeholder="Скидка"
                                    value={values.discount}
                                    onBlur={handleBlur}
                                    error={errors.discount}
                                    onChange={handleChange}
                                />
                                {errors.discount && (
                                    <p className={styles.error}>
                                        {errors.discount}
                                    </p>
                                )}
                            </div>

                            <div className={styles.input_wrap}>
                            <label htmlFor="discountEnd">Дата окончания скидки</label>
                            <input
                                disabled={isSubmitting}
                                className={
                                    errors.discountEnd && styles.error_input
                                }
                                name="discountEnd"
                                placeholder="Дата окончания скидки"
                                value={values.discountEnd}
                                onBlur={handleBlur}
                                error={errors.discountEnd}
                                onChange={handleChange}
                                id="date"
                                type="date"
                                min={getCurrentDate()}
                            />
                               
                                {errors.discountEnd && (
                                    <p className={styles.error}>
                                        {errors.discountEnd}
                                    </p>
                                )}
                            </div>

                            <div className={styles.submit_wrap}>
                            {
                                (type === 'ADD') ? (
                                    <button className={styles.submit}
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        Добавить
                                    </button>

                                ) : (
                                    <button className={styles.submit}
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        Редактировать
                                    </button>
                                )
                            }
                            </div>
                        </form>
                    )}
                </Formik>
                </div>
                
            </Portal>
    )
}

export default ManageProduct;