import { Field, Form, Formik, useField, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const DInput = ({label, ...props}) =>{
    const [field, meta] = useField(props)
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
        </>
    )
}

const DCheckbox = ({children, ...props}) =>{
    const [field, meta] = useField({...props, type: 'checkbox'})
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...field} {...props}/>
                {children}
            </label>
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
        </>
    )
}


const DForm = () => {

    return (
        <Formik
            initialValues={{
            name: '',
            email: '',
            amount: '',
            currency: '',
            text: '',
            terms: false
        }}
        validationSchema={Yup.object({
            name: Yup.string()
                .min(2, 'Минимум 2 символа')
                .required('Обязательное поле'),
            email: Yup.string()
                .email('Неккоректный адрес почты')
                .required('Обязательное поле'),
            amount: Yup.number()
                .required('Сумма обязательна')
                .min(5, 'Не менее 5'),
            currency: Yup.string().required('Выберите валюту'),
            text: Yup.string()
                .min(10, 'Не менее 10 символов'),
            terms: Yup.boolean()
                .required('Необходимо согласие')
                .oneOf([true], "Необходимо согласие")
        })}
        onSubmit={values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Донат</h2>
                <DInput
                    id="name"
                    name="name"
                    type="text"
                    label="Ваше имя"
                />
                <DInput
                    id="email"
                    name="email"
                    type="email"
                    label="Ваша почта"
                    autoComplete="off"
                />
                <DInput
                    id="amount"
                    name="amount"
                    type="number"
                    label="Сумма"
                />

                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                    >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage component="div" className="error" name="currency"/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage component="div" className="error" name="text"/>
                <DCheckbox name="terms">
                    Соглашаетесь с политикой конфиденциальности?
                </DCheckbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default DForm;