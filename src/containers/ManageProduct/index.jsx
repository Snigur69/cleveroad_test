import React, { useState, useEffect, useRef } from "react";
import Portal from "../../components/Portal";
import { Formik } from "formik";
import { object, string, number } from "yup";

import { getProductById } from "../../services/api";
import { getCurrentDate } from "./helper";
import storage from "../../services/firebase";

import Button from "@material-ui/core/Button";
import styles from "./styles.module.css";

import close from "../../assets/img/close.png";

const ManageProduct = ({ closeModal, id, submitForm, type }) => {
    const [currentProduct, setCurrentProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imageStatus, setImageStatus] = useState("");
    const [imageStatusFlag, setImageStatusFlag] = useState("normal");
    const [customSubmitting, setCustomSubmitting] = useState(false);
    const hiddenRef = useRef(null);

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then((response) => {
                    setCurrentProduct(response);
                    setImageUrl(response.image);
                    hiddenRef.current.focus();
                    hiddenRef.current.blur();
                })
                .catch((error) => {
                    throw new Error(error);
                });
        } else {
            setCurrentProduct({
                name: "",
                description: "",
                image: "",
                price: "",
                discount: "",
                discountEnd: "",
            });
        }
    }, []);

    const loadImage = (e) => {
        if (e.target.files[0]) {
            setCustomSubmitting(true);
            const img = e.target.files[0];
            const uploadTask = storage.ref(`images/${img.name}`).put(img);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setImageUrl("");
                    setImageStatus("Файл загружается на сервер...");
                    setImageStatusFlag("normal");
                },
                (error) => {
                    setImageStatus("Ошибка! Файл не был загружен на сервер!");
                    setImageStatusFlag("error");
                },
                () => {
                    storage
                        .ref("images")
                        .child(img.name)
                        .getDownloadURL()
                        .then((url) => {
                            setImageUrl(url);
                            setImageStatus("Файл успешно загружен!");
                            setImageStatusFlag("success");
                            hiddenRef.current.focus();
                            hiddenRef.current.blur();
                            setCustomSubmitting(false);
                        });
                }
            );
        } else {
            setImageStatus("");
            setImageUrl("");
        }
    };

    return (
        currentProduct && (
            <Portal>
                <div className={styles.manage_product}>
                    <img
                        onClick={closeModal}
                        className={styles.close}
                        src={close}
                        alt=""
                    />
                    {type === "ADD" ? (
                        <p className={styles.modal_title}>Добавить товар</p>
                    ) : (
                        <p className={styles.modal_title}>
                            Редактировать товар
                        </p>
                    )}
                    <Formik
                        initialValues={{
                            name: currentProduct.name,
                            description: currentProduct.description,
                            image: imageUrl,
                            price: currentProduct.price,
                            discount: currentProduct.discount,
                            discountEnd: currentProduct.discountEnd,
                        }}
                        validationSchema={object().shape({
                            name: string()
                                .min(20, "Минимум 20 символов")
                                .max(60, "Максимум 60 символов")
                                .required("Поле обязательное!"),
                            description: string().max(
                                200,
                                "Максимум 200 символов"
                            ),
                            image: string().required("Поле обязательное!"),
                            price: number()
                                .moreThan(0, "Положительное число")
                                .max(
                                    99999999.99,
                                    "Превышено максимальное значение"
                                )
                                .required("Поле обязательное!"),
                            discount: number()
                                .min(10, "Минимальное значение - 10")
                                .max(90, "Максимальное значение - 90"),
                        })}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={async (values) => {
                            await submitForm(values, id)
                                .then((response) => {
                                    if (response === 200) {
                                        closeModal();
                                    }
                                })
                                .catch((error) => {
                                    throw new Error(error);
                                });
                        }}
                    >
                        {({
                            values,
                            errors,
                            isSubmitting,
                            handleChange,
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
                                    <label htmlFor="description">
                                        Описание
                                    </label>
                                    <input
                                        disabled={isSubmitting}
                                        className={
                                            errors.description &&
                                            styles.error_input
                                        }
                                        name="description"
                                        placeholder="Описание"
                                        value={values.description}
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
                                    <label
                                        className={styles.file_wrap}
                                        htmlFor={styles.visible_input}
                                    >
                                        <input
                                            id={styles.visible_input}
                                            onChange={loadImage}
                                            type="file"
                                            disabled={isSubmitting}
                                        />
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            component="span"
                                        >
                                            Загрузить изображение
                                        </Button>
                                    </label>
                                    <input
                                        ref={hiddenRef}
                                        name="image"
                                        placeholder="Изображение"
                                        id={styles.hidden_image}
                                        value={imageUrl}
                                        onBlur={handleChange}
                                        error={errors.image}
                                        onChange={handleChange}
                                    />
                                    <p className={styles[imageStatusFlag]}>
                                        {imageStatus}
                                    </p>
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
                                            errors.discount &&
                                            styles.error_input
                                        }
                                        type="number"
                                        name="discount"
                                        placeholder="Скидка"
                                        value={values.discount}
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
                                    <label htmlFor="discountEnd">
                                        Дата окончания скидки
                                    </label>
                                    <input
                                        disabled={isSubmitting}
                                        className={
                                            errors.discountEnd &&
                                            styles.error_input
                                        }
                                        name="discountEnd"
                                        placeholder="Дата окончания скидки"
                                        value={values.discountEnd}
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
                                    {type === "ADD" ? (
                                        <button
                                            className={styles.submit}
                                            disabled={
                                                isSubmitting || customSubmitting
                                            }
                                            type="submit"
                                        >
                                            Добавить
                                        </button>
                                    ) : (
                                        <button
                                            className={styles.submit}
                                            disabled={
                                                isSubmitting || customSubmitting
                                            }
                                            type="submit"
                                        >
                                            Редактировать
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </Portal>
        )
    );
};

export default ManageProduct;
