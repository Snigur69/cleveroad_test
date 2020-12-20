import React from 'react';
import styles from './styles.module.css';
import {Formik} from "formik";
import {object, string} from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Registration = ({setRegister, handleRegister, registerError}) => {
    return(
        <div className={styles.wrap}>

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                }}
                validationSchema={object().shape({
                    email: string()
                        .email('Неправильно введен email')
                        .required("Поле обязательное!"),
                    name: string(),
                    password: string()
                        .min(5, 'Минимум 5 символов')
                        .required("Поле обязательное!"),

                })}
                onSubmit={(values) => {
                    handleRegister(values.email, values.password, values.name)
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
                        <h1>Зарегистрироваться</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField id="outlined-basic" label="Name" variant="outlined"
                                       type="name"
                                       name="name"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.name}
                            />
                        </div>
                        <p className={styles.error}>{errors.name && touched.name && errors.name}</p>
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
                                Зарегистрироваться
                            </Button>
                        </div>
                        {registerError  && <p className={styles.error}>{registerError}</p> }
                    </form>
                        <Button onClick={setRegister} variant="outlined" color="secondary" >У меня есть аккаунт</Button>

                    </div>
                )}
            </Formik>
        </div>
    )
}

export default Registration;