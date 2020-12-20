import React from 'react';
import { Formik } from "formik";
import { object, string } from "yup";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.css';

const SignIn = ({setRegister, handleSignIn, loginError}) => {
    return(
        <div className={styles.wrap}>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={object().shape({
                    email: string()
                        .email('Неправильно введен email')
                        .required("Поле обязательное!"),
                    password: string()
                        .min(5, 'Минимум 5 символов')
                        .required("Поле обязательное!"),

                })}
                onSubmit={(values) => {
                    handleSignIn(values.email, values.password)
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                      <div className={styles.form_wrap}>
                        <h1>Войти</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <TextField id="outlined-basic" label="Email" variant="outlined"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </div>
                            <p className={styles.error}>{errors.email && touched.email && errors.email}</p>
                            <div>
                                <TextField id="outlined-basic" label="Password" variant="outlined"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </div>
                            <p className={styles.error}>{errors.password && touched.password && errors.password}</p>
                            <div>
                                <Button variant="contained" color="primary" type="submit">
                                   Войти
                                </Button>
                            </div>
                            {loginError && <p className={styles.error}>{loginError}</p>}

                        </form>
                          <Button onClick={setRegister} variant="outlined" color="secondary" >Зарегистрироваться</Button>

                      </div>
                )}
            </Formik>
        </div>
    )
}

export default SignIn;