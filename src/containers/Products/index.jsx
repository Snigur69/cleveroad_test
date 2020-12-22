import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useHistory } from "react-router";
import ProductCard from "../../components/ProductCard";

import { getProducts } from "../../services/api";
import { productsTransform } from "./helper";

const Products = ({ productsTrigger, openModal, removeProduct }) => {
    const history = useHistory();
    const [products, setProducts] = useState();

    useEffect(() => {
        getProducts(history.location.pathname.slice(1))
            .then((response) => {
                setProducts(productsTransform(response));
            })
            .catch((error) => {
                throw new Error(error);
            });
    }, [productsTrigger]);

    return (
        <div className={styles.category_page}>
            <h1>Каталог</h1>
            <h2>{history.location.pathname.slice(1)}</h2>
            <div className={styles.products_wrap}>
                {products &&
                    products.map((el, index) => {
                        return (
                            <ProductCard
                                openModal={openModal}
                                removeProduct={removeProduct}
                                key={index}
                                {...el}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default Products;
